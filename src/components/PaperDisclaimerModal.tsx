"use client";
import React from "react";
import { X, FileText, Shield, AlertTriangle } from "lucide-react";

interface PaperDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict?: any;
}

export default function PaperDisclaimerModal({
  isOpen,
  onClose,
  dict,
}: PaperDisclaimerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
      <div className="relative bg-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-all duration-200 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {dict?.paperDisclaimerModal?.title || "Yazı Gönderme Kuralları"}
            </h2>
            <p className="text-slate-400 text-sm">
              {dict?.paperDisclaimerModal?.subtitle ||
                "Lütfen yazınızı göndermeden önce bu kuralları dikkatlice okuyun"}
            </p>
          </div>

          {/* Rules Content */}
          <div className="space-y-6">
            {/* Genel Kurallar */}
            <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-white">
                  {dict?.paperDisclaimerModal?.generalRules?.title ||
                    "Genel Kurallar"}
                </h3>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm leading-relaxed ml-8">
                {(
                  dict?.paperDisclaimerModal?.generalRules?.items || [
                    "Gönderdiğiniz yazı özgün olmalıdır",
                    "Telif hakkı ihlali içeren içerikler kabul edilmez",
                    "Hakaret, küfür veya nefret söylemi içeren yazılar reddedilir",
                    "Bilimsel ve nesnel bir dil kullanmanız beklenir",
                    "Yazınızın konusu KAPDEM'in ilgi alanları ile ilgili olmalıdır",
                  ]
                ).map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* İçerik Standartları */}
            <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-white">
                  {dict?.paperDisclaimerModal?.contentStandards?.title ||
                    "İçerik Standartları"}
                </h3>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm leading-relaxed ml-8">
                {(
                  dict?.paperDisclaimerModal?.contentStandards?.items || [
                    "Yazı en az 800 kelime olmalıdır",
                    "Özet kısmı 200-300 kelime arasında olmalıdır",
                    "Kaynaklarınız belirtilmelidir",
                    "İmla ve gramer kurallarına uygun olmalıdır",
                    "Akademik yazım kurallarına uygunluk tercih edilir",
                  ]
                ).map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Yayın Süreci */}
            <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-white">
                  {dict?.paperDisclaimerModal?.publishProcess?.title ||
                    "Yayın Süreci"}
                </h3>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm leading-relaxed ml-8">
                {(
                  dict?.paperDisclaimerModal?.publishProcess?.items || [
                    "Gönderdiğiniz yazılar editörlerimiz tarafından incelenir",
                    "İnceleme süreci 1-2 hafta sürebilir",
                    "Kabul edilen yazılar yayınlanır ve size bilgi verilir",
                    "Reddedilen yazılar için geri bildirim sağlanır",
                    "Yayınlanan yazılar için telif ücreti ödenmez",
                  ]
                ).map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Uyarı */}
            <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {dict?.paperDisclaimerModal?.warning?.title ||
                      "Önemli Uyarı"}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {dict?.paperDisclaimerModal?.warning?.message ||
                      "Bu kurallara uymayan yazılar sistem tarafından otomatik olarak reddedilir. Lütfen yazınızı göndermeden önce tüm kuralları kontrol edin."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-600 transition-all duration-200"
              >
                {dict?.paperDisclaimerModal?.buttons?.understood || "Anladım"}
              </button>
              <button
                onClick={() => {
                  onClose();
                  // Scroll to form
                  document
                    .getElementById("send-paper-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                {dict?.paperDisclaimerModal?.buttons?.fillForm ||
                  "Formu Doldur"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
