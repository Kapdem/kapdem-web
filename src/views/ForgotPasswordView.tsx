"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomPageHeader from "@/components/CustomPageHeader";
import { ForgotPassword } from "@/lib/auth/action";

export default function ForgotPasswordView({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) {
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(dict?.forgotPassword?.emailInvalid || "Geçerli bir e-posta girin")
      .required(dict?.forgotPassword?.emailRequired || "E-posta gereklidir"),
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    setError("");
    try {
      const response = await ForgotPassword(values.email);
      if (response.success) {
        setSubmitted(true);
      } else {
        setError(
          response.message ||
            dict?.forgotPassword?.errorMessage ||
            "Bir hata oluştu. Lütfen tekrar deneyin."
        );
      }
    } catch (e) {
      setError(
        dict?.forgotPassword?.errorMessage ||
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
          title={dict?.forgotPassword?.title || "Şifremi Unuttum"}
          subtitle={
            dict?.forgotPassword?.subtitle ||
            "E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim."
          }
          className="!mt-4"
          buttonText={dict?.forgotPassword?.buttonText || "Giriş Yap"}
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
              <div className="flex flex-col items-center justify-center py-12 ">
                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-lg animate-bounce">
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
                      d="M3 8l7.89 5.26a3 3 0 003.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">
                  {dict?.forgotPassword?.successTitle || "E-posta Gönderildi!"}
                </h2>
                <div className="text-gray-700 mb-2">
                  {dict?.forgotPassword?.successMessage ||
                    "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."}
                </div>
                <div className="text-xs text-gray-400">
                  {dict?.forgotPassword?.successNote ||
                    "Gelen kutunuzu ve spam klasörünüzü kontrol edin."}
                </div>
              </div>
            ) : (
              <Formik
                initialValues={{ email: "" }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-8">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block text-base font-semibold text-blue-700 mb-2"
                      >
                        {dict?.forgotPassword?.emailLabel || "E-posta Adresi"}
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder={
                          dict?.forgotPassword?.emailPlaceholder ||
                          "E-posta adresinizi girin"
                        }
                        className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-blue-50 placeholder-blue-300 transition shadow-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1 absolute left-0"
                      />
                    </div>
                    {error && (
                      <div className="text-red-500 text-xs mb-2 text-center">
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
                          {dict?.forgotPassword?.sending || "Gönderiliyor..."}
                        </span>
                      ) : (
                        dict?.forgotPassword?.submitButton ||
                        "Şifre Sıfırlama Linki Gönder"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
