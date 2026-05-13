"use client";
import React from "react";
import { Lock, X } from "lucide-react";
import Link from "next/link";

export default function LoginRequiredModal({
  open,
  onClose,
  messageType = "login",
}) {
  if (!open) return null;

  const isAccessDenied = messageType === "access";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-[#002c54]to-[#002c54]/80">
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#e0e7ff"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle cx="100" cy="80" r="2" fill="#c7d2fe" opacity="0.6" />
              <circle cx="300" cy="150" r="3" fill="#a5b4fc" opacity="0.4" />
              <circle cx="200" cy="200" r="1.5" fill="#818cf8" opacity="0.5" />
              <circle cx="350" cy="50" r="2.5" fill="#6366f1" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 zp-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl z-30"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Content */}
        <div className="relative z-10 p-8 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#002c54] to-[#002c54]/80 rounded-full flex items-center justify-center shadow-lg">
              <Lock size={28} className="text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {isAccessDenied ? "Ücretli İçerik" : "Giriş Yapmalısınız"}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            {isAccessDenied
              ? "Bu içeriği PDF olarak indirmek için ücretli üyelik gereklidir. Lütfen üvellik planınızı yükseltin."
              : "PDF dosyasını indirmek için lütfen hesabınıza giriş yapın. Bu işlem sadece birkaç saniye sürer."}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            {isAccessDenied ? (
              <Link
                href="/membership"
                className="w-full block px-6 py-3 bg-gradient-to-r from-[#002c54] to-[#002c54]/80 text-white rounded-xl font-medium hover:from-[#002c54] hover:to-[#002c54]/80 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
              >
                Üyelik Planları
              </Link>
            ) : (
              <Link
                href="/login"
                className="w-full block px-6 py-3 bg-gradient-to-r from-[#002c54] to-[#002c54]/80 text-white rounded-xl font-medium hover:from-[#002c54] hover:to-[#002c54]/80 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
              >
                Giriş Yap
              </Link>
            )}

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
            >
              Daha Sonra
            </button>
          </div>

          {/* Additional Info */}
          {!isAccessDenied && (
            <Link
              href="/register"
              className="text-xs text-gray-500 mt-6 block hover:underline"
            >
              Henüz hesabınız yok mu?
              <span className="text-[#002c54] ml-1 font-medium">
                Hemen kayıt olun
              </span>
            </Link>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#002c54] to-[#002c54]/80 rounded-full opacity-10"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-[#002c54] rounded-full opacity-10"></div>
      </div>
    </div>
  );
}
