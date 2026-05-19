"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

import CustomSlider from "../components/CustomSlider";
import { Login, ResendVerification } from "../lib/auth/action";
import { useAuth } from "../context/AuthContext";

export default function LoginView({ dict, lang }: { dict: any; lang: string }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { refreshAuthFromCookies } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNeedsVerification(false);

    try {
      const response = await Login(emailOrUsername, password);

      if (response.success) {
        toast.success(dict?.toast?.login?.success || "Giriş başarılı!");
        // Auth state'ini güncelle
        await refreshAuthFromCookies();
        window.location.href = "/";
        return;
      } else if (response.code === "EMAIL_NOT_CONFIRMED") {
        setNeedsVerification(true);
        toast.info(
          response.message ||
            dict?.toast?.login?.verifyEmail ||
            "Lütfen e-posta adresinizi doğrulayın."
        );
      } else {
        toast.error(
          dict?.toast?.login?.error ||
            "Giriş başarısız. Lütfen bilgilerinizi kontrol edin."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        dict?.toast?.common?.error || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    if (!emailOrUsername.trim()) {
      toast.error(
        dict?.loginPage?.enterAccountFirst ||
          "Lütfen önce e-posta veya kullanıcı adınızı girin."
      );
      return;
    }
    setIsResending(true);
    try {
      const res = await ResendVerification(emailOrUsername.trim());
      if (res.success) {
        toast.success(
          res.message ||
            "Doğrulama bağlantısı e-posta adresinize gönderildi."
        );
      } else {
        toast.error(res.message || "Doğrulama e-postası gönderilemedi.");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error(
        dict?.toast?.common?.error || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsResending(false);
    }
  };
  return (
    <div className="min-h-screen grid bg-zinc-900 grid-cols-1 md:grid-cols-2">
      {/* Left: Login Form */}
      <div className="flex flex-col justify-center px-8 md:px-20">
        <div className="max-w-lg w-full mx-auto space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div>
              <Image
                src="/images/kapdem-logo-2.png"
                alt="Kapdem Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">
              {dict?.loginPage?.loginacc || "Kurumsa Giriş Yap"}
            </h2>
          </div>

          {/* Form */}
          <div className="">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white mb-2"
                >
                  {dict?.loginPage?.emailorusername ||
                    "E-posta veya Kullanıcı Adı"}
                </label>
                <input
                  id="text"
                  type="text"
                  className="w-full border-2 border-gray-400 text-white rounded-lg px-4 py-3 transition-all duration-200"
                  placeholder={
                    dict?.loginPage?.placeholder ||
                    "ornek@kapdem.org / kullanıcı adınız"
                  }
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-white mb-2"
                >
                  {dict?.loginPage?.password || "Şifre"}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full border-2 text-white border-gray-400 rounded-lg px-4 py-3 pr-12 transition-all duration-200"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                    aria-label={
                      showPassword ? "Şifreyi gizle" : "Şifreyi göster"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href={`/${lang}/forgot-password`}
                  className="text-sm text-white hover:text-white/80 font-medium"
                >
                  {dict?.loginPage?.forgotPassword || "Şifrenizi mi unuttunuz?"}
                </Link>
                <Link
                  href={`/${lang}/register`}
                  className="text-sm text-white hover:text-white/80 font-medium"
                >
                  {dict?.loginPage?.register || " Hesap oluşturun"}
                </Link>
              </div>

              <button
                type="submit"
                className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? dict?.loginPage?.loading || "Giriş yapılıyor..."
                  : dict?.loginPage?.login || "Giriş Yap"}
              </button>

              {needsVerification && (
                <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-4 text-center space-y-3">
                  <p className="text-sm text-amber-200">
                    {dict?.loginPage?.verifyNotice ||
                      "Hesabınıza giriş yapabilmek için e-posta adresinizi doğrulamanız gerekiyor. Bağlantıyı bulamıyorsanız yeniden gönderebilirsiniz."}
                  </p>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className={`w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 ${
                      isResending ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isResending
                      ? dict?.loginPage?.resending || "Gönderiliyor..."
                      : dict?.loginPage?.resendVerification ||
                        "Doğrulama e-postasını yeniden gönder"}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-white/70 mt-6">
            <p>
              © {new Date().getFullYear()} KAPDEM.{" "}
              {dict?.loginPage?.allrightsreserved || "Tüm hakları saklıdır."}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="w-full h-screen hidden md:block">
        <div className="h-full flex items-center justify-center p-8">
          <div className="w-full h-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl border border-white/30 bg-white/10 backdrop-blur-sm">
            <CustomSlider dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
