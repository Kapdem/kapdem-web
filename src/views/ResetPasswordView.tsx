"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomPageHeader from "@/components/CustomPageHeader";
import { ResetPassword } from "@/lib/auth/action";

export default function ResetPasswordView({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) {
  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(
        6,
        dict?.resetPassword?.passwordMinLength ||
          "Şifre en az 6 karakter olmalıdır"
      )
      .required(
        dict?.resetPassword?.passwordRequired || "Yeni şifre gereklidir"
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        dict?.resetPassword?.passwordsMismatch || "Şifreler eşleşmiyor"
      )
      .required(
        dict?.resetPassword?.confirmRequired || "Şifre onayı gereklidir"
      ),
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError(
        dict?.resetPassword?.invalidToken || "Geçersiz şifre sıfırlama linki"
      );
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, dict]);

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (!token) {
      setError(dict?.resetPassword?.tokenNotFound || "Token bulunamadı");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await ResetPassword(token, values.newPassword);
      if (response.success) {
        setSubmitted(true);
        // 3 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          router.push(`/${lang}/login`);
        }, 3000);
      } else {
        setError(
          response.message ||
            dict?.resetPassword?.resetError ||
            "Şifre sıfırlama başarısız. Lütfen tekrar deneyin."
        );
      }
    } catch (e) {
      setError(
        dict?.resetPassword?.generalError ||
          "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <CustomPageHeader
          title={dict?.resetPassword?.title || "Şifre Sıfırla"}
          subtitle={
            dict?.resetPassword?.subtitle || "Yeni şifrenizi belirleyin"
          }
          className="!mt-4"
          buttonText={dict?.resetPassword?.buttonText || "Giriş Yap"}
          onButtonClick={() => router.push(`/${lang}/login`)}
        />
        <div className="flex items-center justify-center mb-12">
          <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 z-10 border border-blue-100 animate-fadeIn">
            <div className="w-full flex justify-center">
              <Image
                src="/images/kapdem.jpeg"
                alt="Kapdem Logo"
                width={1920}
                height={1080}
                className="object-contain drop-shadow-xl w-[600px] h-12 my-12"
                priority
              />
            </div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12">
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
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  {dict?.resetPassword?.successTitle ||
                    "Şifre Başarıyla Değiştirildi!"}
                </h2>
                <div className="text-gray-700 mb-2">
                  {dict?.resetPassword?.successMessage ||
                    "Şifreniz başarıyla güncellendi. Giriş sayfasına yönlendiriliyorsunuz..."}
                </div>
                <div className="text-xs text-gray-400 mt-4">
                  {dict?.resetPassword?.successRedirectNote ||
                    "Otomatik yönlendirme olmazsa"}{" "}
                  <a
                    href={`/${lang}/login`}
                    className="text-blue-600 underline"
                  >
                    {dict?.resetPassword?.clickHere || "buraya tıklayın"}
                  </a>
                </div>
              </div>
            ) : (
              <>
                {!token && (
                  <div className="text-center py-12">
                    <div className="text-red-500 text-lg font-semibold mb-4">
                      {dict?.resetPassword?.invalidTokenTitle ||
                        "Geçersiz Şifre Sıfırlama Linki"}
                    </div>
                    <p className="text-gray-600 mb-6">
                      {dict?.resetPassword?.invalidTokenMessage ||
                        "Lütfen şifre sıfırlama talebini tekrar oluşturun."}
                    </p>
                    <button
                      onClick={() => router.push(`/${lang}/forgot-password`)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      {dict?.resetPassword?.goToForgotPassword ||
                        "Şifremi Unuttum Sayfasına Git"}
                    </button>
                  </div>
                )}
                {token && (
                  <Formik
                    initialValues={{ newPassword: "", confirmPassword: "" }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-6">
                        <div className="relative">
                          <label
                            htmlFor="newPassword"
                            className="block text-base font-semibold text-blue-700 mb-2"
                          >
                            {dict?.resetPassword?.newPasswordLabel ||
                              "Yeni Şifre"}
                          </label>
                          <Field
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder={
                              dict?.resetPassword?.newPasswordPlaceholder ||
                              "Yeni şifrenizi girin"
                            }
                            className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-blue-50 placeholder-blue-300 transition shadow-sm"
                          />
                          <ErrorMessage
                            name="newPassword"
                            component="div"
                            className="text-red-500 text-xs mt-1 absolute left-0"
                          />
                        </div>

                        <div className="relative">
                          <label
                            htmlFor="confirmPassword"
                            className="block text-base font-semibold text-blue-700 mb-2"
                          >
                            {dict?.resetPassword?.confirmPasswordLabel ||
                              "Şifre Onayı"}
                          </label>
                          <Field
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder={
                              dict?.resetPassword?.confirmPasswordPlaceholder ||
                              "Şifrenizi tekrar girin"
                            }
                            className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-blue-50 placeholder-blue-300 transition shadow-sm"
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-red-500 text-xs mt-1 absolute left-0"
                          />
                        </div>

                        {error && (
                          <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting || loading}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-lg tracking-wide"
                        >
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-blue-300 rounded-full mr-2"></span>
                              {dict?.resetPassword?.processing ||
                                "İşleniyor..."}
                            </span>
                          ) : (
                            dict?.resetPassword?.submitButton ||
                            "Şifremi Sıfırla"
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
