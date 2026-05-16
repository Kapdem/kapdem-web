"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { VerifyEmail } from "@/lib/auth/action";

type Status = "pending" | "success" | "error";

export default function VerifyEmailView({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) {
  const [status, setStatus] = useState<Status>("pending");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage(
        dict?.verifyEmail?.missingToken ||
          (lang === "tr"
            ? "Geçersiz veya eksik doğrulama linki."
            : "Invalid or missing verification link."),
      );
      return;
    }

    let cancelled = false;
    (async () => {
      const res = await VerifyEmail(token);
      if (cancelled) return;
      if (res.success) {
        setStatus("success");
        setMessage(
          res.message ||
            dict?.verifyEmail?.successMessage ||
            (lang === "tr"
              ? "E-posta adresiniz başarıyla doğrulandı! Giriş sayfasına yönlendiriliyorsunuz..."
              : "Your email has been verified! Redirecting to login..."),
        );
        setTimeout(() => {
          router.push(`/${lang}/login`);
        }, 3000);
      } else {
        setStatus("error");
        setMessage(
          res.message ||
            dict?.verifyEmail?.errorMessage ||
            (lang === "tr"
              ? "Doğrulama başarısız. Link geçersiz veya süresi dolmuş olabilir."
              : "Verification failed. The link may be invalid or expired."),
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams, dict, lang, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-blue-100">
        <div className="w-full flex justify-center mb-6">
          <Image
            src="/images/kapdem.jpeg"
            alt="KAPDEM"
            width={1920}
            height={1080}
            className="object-contain drop-shadow-xl w-[400px] h-12"
            priority
          />
        </div>

        {status === "pending" && (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              {dict?.verifyEmail?.pendingTitle ||
                (lang === "tr"
                  ? "E-posta Doğrulanıyor..."
                  : "Verifying your email...")}
            </h2>
            <p className="text-gray-600 text-sm">
              {dict?.verifyEmail?.pendingMessage ||
                (lang === "tr"
                  ? "Lütfen bekleyin."
                  : "Please wait.")}
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-lg animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">
              {dict?.verifyEmail?.successTitle ||
                (lang === "tr"
                  ? "E-postanız Doğrulandı!"
                  : "Email Verified!")}
            </h2>
            <p className="text-gray-700 text-center mb-4">{message}</p>
            <a
              href={`/${lang}/login`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {dict?.verifyEmail?.goToLogin ||
                (lang === "tr" ? "Giriş Yap" : "Go to Login")}
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-red-100 text-red-600 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-700 mb-2 text-center">
              {dict?.verifyEmail?.errorTitle ||
                (lang === "tr"
                  ? "Doğrulama Başarısız"
                  : "Verification Failed")}
            </h2>
            <p className="text-gray-700 text-center mb-4">{message}</p>
            <a
              href={`/${lang}/login`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {dict?.verifyEmail?.goToLogin ||
                (lang === "tr" ? "Giriş Sayfası" : "Login Page")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
