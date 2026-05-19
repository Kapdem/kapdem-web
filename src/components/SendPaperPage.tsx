"use client";
import React, { useState } from "react";
import {
  FileText,
  Send,
  Shield,
  Mail,
  PenTool,
  BookOpen,
  Users,
} from "lucide-react";
import PaperDisclaimerModal from "./PaperDisclaimerModal";
import SendPaperForm from "./SendPaperForm";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createPublicSubmitPost } from "../lib/action";
import Link from "next/link";

interface SendPaperPageProps {
  dict: any;
}

export default function SendPaperPage({ dict }: SendPaperPageProps) {
  const validationSchema = Yup.object({
    firstName: Yup.string().required(
      dict?.sendPaper?.validation?.firstNameRequired || "Ad gerekli"
    ),
    lastName: Yup.string().required(
      dict?.sendPaper?.validation?.lastNameRequired || "Soyad gerekli"
    ),
    phone: Yup.string(),
    institution: Yup.string(),
    title: Yup.string()
      .min(
        10,
        dict?.sendPaper?.validation?.titleMinLength ||
          "Başlık en az 10 karakter olmalıdır"
      )
      .required(
        dict?.sendPaper?.validation?.titleRequired || "Yazı başlığı gerekli"
      ),
    category: Yup.string(),
    email: Yup.string()
      .email(dict?.sendPaper?.validation?.emailInvalid || "Geçersiz e-posta")
      .required(
        dict?.sendPaper?.validation?.emailRequired || "E-posta gerekli"
      ),
    summary: Yup.string()
      .min(
        50,
        dict?.sendPaper?.validation?.summaryMinLength ||
          "Yazı özeti en az 50 karakter olmalıdır"
      )
      .max(
        1000,
        dict?.sendPaper?.validation?.summaryMaxLength ||
          "Yazı özeti en fazla 1000 karakter olabilir"
      )
      .required(
        dict?.sendPaper?.validation?.summaryRequired || "Yazı özeti gerekli"
      ),
    content: Yup.string()
      .min(
        100,
        dict?.sendPaper?.validation?.contentMinLength ||
          "İçerik en az 100 karakter olmalıdır"
      )
      .max(
        10000,
        dict?.sendPaper?.validation?.contentMaxLength ||
          "İçerik en fazla 10000 karakter olabilir"
      )
      .required(
        dict?.sendPaper?.validation?.contentRequired ||
          "İçerik alanı zorunludur"
      ),
    // Yup v1'de şemalar varsayılan olarak null kabul etmez; kapak görseli
    // opsiyonel olduğu ve başlangıç değeri null olduğu için .nullable() şart.
    photo: Yup.mixed().nullable().notRequired(),
    biografi: Yup.string(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    institution: "",
    title: "",
    category: "",
    email: "",
    summary: "",
    content: "",
    photo: null,
    biografi: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    // content alanı validasyonunu submit öncesi kontrol et
    if (
      typeof values.content !== "string" ||
      values.content.length < 100 ||
      values.content.length > 10000
    ) {
      toast.error(
        dict?.sendPaper?.validation?.contentValidationError ||
          "İçerik en az 100, en fazla 10.000 karakter olmalı ve boş olmamalı."
      );
      setIsSubmitting(false);
      setSubmitting(false);
      return;
    }
    try {
      const submitData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || "",
        institution: values.institution || "",
        title: values.title,
        category: values.category || "",
        email: values.email,
        summary: values.summary,
        content: values.content,
        photo: values.photo,
        biografi: values.biografi || "",
      };

      const result = await createPublicSubmitPost(submitData);

      if (
        (result && result.id && result.status) ||
        (result && result.statusCode === 200)
      ) {
        toast.success(
          dict?.toast?.sendPaper?.success ||
            result.message ||
            "Yazınız başarıyla gönderildi! İnceleme sürecinden sonra yayınlanacak."
        );
        resetForm();
        setShowWelcomeModal(true); // Başarı sonrası hoş geldin modalını göster
      } else {
        toast.error(
          dict?.toast?.sendPaper?.error ||
            (result && result.message) ||
            "Yazı gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(
        dict?.toast?.sendPaper?.error ||
          "Yazı gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 mt-28">
      {/* Hoş Geldiniz Modalı */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
          <div className="relative bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden border border-slate-700">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="relative z-10 p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                {dict?.sendPaper?.welcomeModal?.title ||
                  "Yazınızı Bizimle Paylaşın"}
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                {dict?.sendPaper?.welcomeModal?.description ||
                  "Fikirlerinizi, deneyimlerinizi ve görüşlerinizi KAPDEM topluluğuyla paylaşın. Yazınız yayınlandığında binlerce okuyucuya ulaşacak ve önemli tartışmalara yol açacak."}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowWelcomeModal(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {dict?.sendPaper?.welcomeModal?.startButton ||
                    "Yazımı Göndermeye Başla"}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full px-6 py-3 bg-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-600 transition-all duration-200"
                >
                  {dict?.sendPaper?.welcomeModal?.rulesButton ||
                    "Yazı Gönderme Kuralları"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ana İçerik */}
      <div className="pt-28 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full mb-6 border border-slate-700/50">
              <Send className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 text-sm font-medium">
                {dict?.sendPaper?.header?.badge || "Yazı Gönderimi"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {dict?.sendPaper?.header?.title || "Fikirlerinizi Paylaşın"}
            </h1>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {dict?.sendPaper?.header?.description ||
                "Deneyimlerinizi, analizlerinizi ve görüşlerinizi KAPDEM ailesiyle paylaşın. Yazınız topluluğumuza değer katacak ve önemli tartışmalara yol açacak."}
            </p>
          </div>

          {/* Özellikler Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center hover:border-slate-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {dict?.sendPaper?.features?.wideCrowd?.title || "Geniş Kitle"}
              </h3>
              <p className="text-slate-400 text-sm">
                {dict?.sendPaper?.features?.wideCrowd?.description ||
                  "Yazınız binlerce okuyucuya ulaşacak"}
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center hover:border-slate-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {dict?.sendPaper?.features?.professional?.title ||
                  "Profesyonel Yayın"}
              </h3>
              <p className="text-slate-400 text-sm">
                {dict?.sendPaper?.features?.professional?.description ||
                  "Yazınız profesyonel şekilde yayınlanacak"}
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center hover:border-slate-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {dict?.sendPaper?.features?.secure?.title || "Güvenli Platform"}
              </h3>
              <p className="text-slate-400 text-sm">
                {dict?.sendPaper?.features?.secure?.description ||
                  "Gizliliğiniz korunur, kurallarımız vardır"}
              </p>
            </div>
          </div>

          {/* Form Bölümü */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {dict?.sendPaper?.form?.title || "Yazı Gönderme Formu"}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {dict?.sendPaper?.form?.subtitle ||
                        "Tüm alanları dikkatlice doldurun"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <SendPaperForm
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  dict={dict}
                />
              </div>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300 text-sm">
                {dict?.sendPaper?.footer?.questionsLabel || "Sorularınız için:"}
                <Link
                  href="mailto:info@kapdem.org"
                  className="text-blue-400 hover:text-blue-300 ml-1 font-medium"
                >
                  {dict?.sendPaper?.footer?.email || "info@kapdem.org"}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Paper Disclaimer Modal */}
      <PaperDisclaimerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dict={dict}
      />
    </div>
  );
}
