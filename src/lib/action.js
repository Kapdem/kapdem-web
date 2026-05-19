"use server";

import { fetchInstance } from "../utils/fetch";
import { cookies } from "next/headers";

export const refresh = async () => {
  try {
    const res = await fetchInstance("/auth/refresh", { method: "POST" });
    return res;
  } catch {
    return null;
  }
};

export const logout = async () => {
  try {
    const res = await fetchInstance("/auth/logout", { method: "POST" });

    const cookieStorage = await cookies();
    cookieStorage.delete("Authentication", { path: "/" });

    return res;
  } catch {
    return null;
  }
};

export const contact = async (data) => {
  try {
    const res = await fetchInstance("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res;
  } catch {
    return null;
  }
};

export const createPublicSubmitPost = async (submitData) => {
  try {
    // Backend `/public-submit` endpoint'i multipart/form-data bekliyor
    // (FileInterceptor('photo')). Bu yüzden JSON değil FormData gönderiyoruz.
    const formData = new FormData();

    // Zorunlu alanlar
    formData.append("firstName", submitData.firstName ?? "");
    formData.append("lastName", submitData.lastName ?? "");
    formData.append("title", submitData.title ?? "");
    formData.append("email", submitData.email ?? "");
    formData.append("summary", submitData.summary ?? "");
    formData.append("content", submitData.content ?? "");

    // Opsiyonel alanlar — yalnızca dolu ise gönder.
    // Boş string gönderilirse backend validasyonu (ör. phone regex) reddeder.
    if (submitData.phone) formData.append("phone", submitData.phone);
    if (submitData.institution)
      formData.append("institution", submitData.institution);
    if (submitData.category) formData.append("category", submitData.category);
    if (submitData.biografi) formData.append("biografi", submitData.biografi);

    // Kapak görseli opsiyonel — yalnızca gerçek bir dosya varsa ekle.
    const photo = submitData.photo;
    const hasPhoto =
      photo &&
      typeof photo === "object" &&
      typeof photo.arrayBuffer === "function" &&
      photo.size > 0;
    if (hasPhoto) {
      formData.append("photo", photo, photo.name || "photo");
    }

    const response = await fetchInstance("/public-submit", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const upComingEvents = async () => {
  try {
    const res = await fetchInstance("/gelecek-etkinlikler", { method: "GET" });
    return res;
  } catch {
    return null;
  }
};

export const RegisterEvent = async (data) => {
  try {
    const res = await fetchInstance("/gelecek-etkinlikler/kayit", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res;
  } catch {
    return null;
  }
};

export const changePassword = async (data) => {
  try {
    const res = await fetchInstance("/users/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res;
  } catch (error) {
    console.error("Password change error:", error);
    return null;
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    if (!email || !email.trim()) {
      return {
        success: false,
        message: "E-posta adresi gerekli",
      };
    }

    const trimmedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return {
        success: false,
        message: "Geçerli bir e-posta adresi girin",
      };
    }

    const res = await fetchInstance("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email: trimmedEmail }),
    });

    // Backend'den gelen response'u kontrol et
    if (res && res.success === false) {
      return {
        success: false,
        message: res.message || "Abonelik sırasında bir hata oluştu",
      };
    }

    // Başarılı durumda
    return {
      success: true,
      message: "Bültene başarıyla abone oldunuz!",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return {
      success: false,
      message:
        "Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edin.",
    };
  }
};
