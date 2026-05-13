import { cookies } from "next/headers";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Header'ları hazırlayan yardımcı fonksiyon
const prepareHeaders = (headers, isFormData = false) => {
  const defaultHeaders = {
    Accept: "application/json",
  };

  // FormData değilse Content-Type ekle
  if (!isFormData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  return { ...defaultHeaders, ...headers };
};

export const fetchInstance = async (url, options = {}) => {
  // Başlangıç zamanını kaydet
  const startTime = performance.now();
  const isPostsSlugApi = url.includes("/posts/slug/");

  // GET istekleri ve public çağrılar için cookie okumayı atla (Caching için kritik)
  let authCookie = null;
  const isReadOnly = !options.method || options.method.toUpperCase() === "GET";

  // Eğer revalidate varsa veya GET ise cookie okuma (Static opt için)
  if (!isReadOnly || options.withAuth) {
    const cookieStorage = await cookies();
    authCookie = cookieStorage.get("Authentication");
  }

  const languageCookie = null; // Opsiyonel: Caching'i bozabilir, gerekirse dile göre cache-key eklenmeli

  const isFormData = options.body instanceof FormData;
  const isLargeUpload = isFormData && url.includes("uploadTrailerUrl");

  // Video dosyasını tespit et
  let isVideoUpload = false;
  if (isFormData && options.body) {
    // FormData içinde video dosyası var mı kontrol et
    if (options.body.has("content")) {
      const contentFile = options.body.get("content");
      if (
        contentFile &&
        contentFile.type &&
        contentFile.type.includes("video")
      ) {
        isVideoUpload = true;
      }
    }
  }

  // Büyük dosya yüklemelerinde daha uzun zaman aşımı süresi için özel ayarlar
  const fetchOptions = {
    ...options,
    credentials: "include",
  };

  const headers = prepareHeaders(
    {
      role: "EXPERT",
      ...options.headers,
      ...(authCookie && { Authorization: `Bearer ${authCookie.value}` }),
      // languageCookie caching'i zorlaştırdığı için geçici devre dışı veya dikkatli kullanılmalı
      // Büyük dosya yüklemeleri için özel başlıklar
      ...(isLargeUpload && { "X-Large-Upload": "true" }),
      ...(isVideoUpload && { "X-Video-Upload": "true", Priority: "high" }),
    },
    isFormData,
  );

  // GET istekleri sadece 1 kez denenir (retry gecikme yaratır).
  // Sadece mutation'larda (POST/PUT/DELETE) retry mantıklıdır.
  const maxAttempts = isReadOnly ? 1 : options.retries || 3;
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt += 1;

    // AbortController ile zaman aşımı yönetimi ekle (her denemede yeni controller)
    const controller = new AbortController();
    // Increase timeout for video uploads to 10 minutes (600000ms)
    const timeoutMs =
      options.timeout ||
      (isVideoUpload
        ? 600000 // 10 minutes for video uploads
        : isLargeUpload
          ? 300000
          : 60000); // 5 minutes for large uploads, 1 minute for normal

    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const fullUrl = `${NEXT_PUBLIC_BASE_URL}${url}`;
      const response = await fetch(fullUrl, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle 401 Unauthorized early
      if (response.status === 401) {
        return {
          success: false,
          message: "Authentication failed. Please log in again.",
          statusCode: 401,
        };
      }

      // If rate limited, honor Retry-After header and retry with exponential backoff
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        let waitMs = 500 * Math.pow(2, attempt - 1); // exponential backoff: 500ms, 1000ms, 2000ms...

        if (retryAfter) {
          const parsed = parseInt(retryAfter, 10);
          if (!isNaN(parsed)) {
            waitMs = parsed * 1000;
          } else {
            // try to parse as HTTP date
            const date = new Date(retryAfter);
            if (!Number.isNaN(date.getTime())) {
              const diff = date.getTime() - Date.now();
              if (diff > 0) waitMs = diff;
            }
          }
        }

        // If this was the last attempt, return a clear error payload
        if (attempt >= maxAttempts) {
          return {
            success: false,
            message: "Rate limit exceeded. Please try again later.",
            statusCode: 429,
          };
        }

        // wait then retry
        await new Promise((res) => setTimeout(res, waitMs));
        continue; // next attempt
      }

      // Yanıtın JSON olup olmadığını kontrol et
      const contentType = response.headers.get("content-type");
      if (
        !response.ok ||
        !contentType ||
        !contentType.includes("application/json")
      ) {
        const errorText = await response.text();
        console.error(
          `❌ API Hatası [${response.status}]:`,
          url,
          errorText.slice(0, 200),
        );
        return {
          success: false,
          message: `API hatası oluştu (Status: ${response.status})`,
          statusCode: response.status,
          rawError: errorText.slice(0, 500),
        };
      }

      // otherwise parse response
      const data = await response.json();

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      // Abort errors
      if (error && error.name === "AbortError") {
        console.error("İstek zaman aşımına uğradı:", url);
        return {
          success: false,
          message:
            "İstek zaman aşımına uğradı. Lütfen daha sonra tekrar deneyin.",
          statusCode: 408,
        };
      }

      // GET istekleri için ağ hatasında retry yapma — hızlı başarısız ol
      if (attempt < maxAttempts && !isReadOnly) {
        const backoff = 500 * Math.pow(2, attempt - 1);
        await new Promise((res) => setTimeout(res, backoff));
        continue;
      }

      console.error("Fetch hatası:", error);
      throw error;
    }
  }
};
