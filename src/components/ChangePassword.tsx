"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { changePassword } from "../lib/action";

export default function ChangePassword({ dict }: { dict: any }) {
  // Password change validation schema
  const PasswordChangeSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(
        8,
        dict?.changePassword?.validation?.minLength ||
          "Şifre en az 8 karakter olmalıdır"
      )
      .max(
        32,
        dict?.changePassword?.validation?.maxLength ||
          "Şifre en fazla 32 karakter olmalıdır"
      )
      .required(
        dict?.changePassword?.validation?.required?.current ||
          "Mevcut şifre gereklidir"
      ),
    newPassword: Yup.string()
      .min(
        5,
        dict?.changePassword?.validation?.minLength ||
          "Şifre en az 5 karakter olmalıdır"
      )
      .max(
        32,
        dict?.changePassword?.validation?.maxLength ||
          "Şifre en fazla 32 karakter olmalıdır"
      )
      .required(
        dict?.changePassword?.validation?.required?.new ||
          "Yeni şifre gereklidir"
      ),
    confirmPassword: Yup.string()
      .min(
        8,
        dict?.changePassword?.validation?.minLength ||
          "Şifre en az 8 karakter olmalıdır"
      )
      .max(
        32,
        dict?.changePassword?.validation?.maxLength ||
          "Şifre en fazla 32 karakter olmalıdır"
      )
      .oneOf(
        [Yup.ref("newPassword")],
        dict?.changePassword?.validation?.mismatch || "Şifreler eşleşmiyor"
      )
      .required(
        dict?.changePassword?.validation?.required?.confirm ||
          "Şifre tekrarı gereklidir"
      ),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle password change submit
  const handlePasswordChange = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setIsSubmitting(true);

    try {
      const response = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmPassword,
      });

      if (response && response.message === "Şifre başarıyla değiştirildi") {
        toast.success(
          dict?.toast?.password?.changeSuccess ||
            "Şifreniz başarıyla değiştirildi"
        );

        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.reload();
      } else {
        const errorMessage = Array.isArray(response?.message)
          ? response?.message[0]
          : response?.message ||
            "Şifre değiştirme başarısız oldu. Lütfen tekrar deneyin.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Şifre değiştirme hatası:", error);
      toast.error(
        dict?.toast?.common?.error || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        {dict?.changePassword?.title || "Şifre Değiştir"}
      </h2>

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={PasswordChangeSchema}
        onSubmit={handlePasswordChange}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Current Password Field */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {dict?.changePassword?.currentPassword || "Mevcut Şifre"}
              </label>
              <div className="relative">
                <Field
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  id="currentPassword"
                  className={`w-full px-4 py-3 border ${
                    errors.currentPassword && touched.currentPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#013b73] focus:border-transparent transition-all duration-200`}
                  placeholder={
                    dict?.changePassword?.currentPasswordPlaceholder ||
                    "Mevcut şifrenizi girin"
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="mt-2 text-sm text-red-600 font-medium"
              />
            </div>

            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {dict?.changePassword?.newPassword || "Yeni Şifre"}
              </label>
              <div className="relative">
                <Field
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  className={`w-full px-4 py-3 border ${
                    errors.newPassword && touched.newPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#013b73] focus:border-transparent transition-all duration-200`}
                  placeholder={
                    dict?.changePassword?.newPasswordPlaceholder ||
                    "Yeni şifrenizi girin"
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="mt-2 text-sm text-red-600 font-medium"
              />
              <p className="mt-2 text-xs text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                {dict?.changePassword?.passwordRequirements ||
                  "Şifreniz en az 8 karakter, bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter içermelidir."}
              </p>
            </div>

            {/* Confirm New Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {dict?.changePassword?.confirmPassword || "Yeni Şifre Tekrar"}
              </label>
              <div className="relative">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className={`w-full px-4 py-3 border ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#013b73] focus:border-transparent transition-all duration-200`}
                  placeholder={
                    dict?.changePassword?.confirmPasswordPlaceholder ||
                    "Yeni şifrenizi tekrar girin"
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="mt-2 text-sm text-red-600 font-medium"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? dict?.changePassword?.submitting || "İşleniyor..."
                  : dict?.changePassword?.submitButton || "Şifreyi Değiştir"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
