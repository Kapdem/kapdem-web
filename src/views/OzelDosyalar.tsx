"use client";
import React, { useState, useEffect } from "react";
import {
  FileText,
  Lock,
  Shield,
  Eye,
  Clock,
  User,
  Mail,
  AlertTriangle,
  FileCheck,
  Search,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginRequiredModal from "../components/LoginRequiredModal";
import { useRouter, usePathname } from "next/navigation";
type Props = {
  dict: any;
  lang: string;
};

interface Author {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

interface SpecialDocument {
  _id: string;
  title: string;
  category: string;
  content: { text: string };
  summary: string;
  publishDate: string;
  author: Author | string;
  coverImage?: string;
  isExclusive: boolean;
  priority: "high" | "medium" | "low";
  tags: string[];
}

export default function OzelDosyalar({
  res,
  dict,
  lang,
}: Props & { res: any }) {
  const { auth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showWarningModal, setShowWarningModal] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const specialDocuments: SpecialDocument[] = [...res];

  const categories = [
    { key: "all", label: dict?.specialFiles?.categories?.all || "Tümü" },
    {
      key: "Stratejik Araştırma",
      label:
        dict?.specialFiles?.categories?.strategicResearch ||
        "Stratejik Araştırma",
    },
    {
      key: "Kamu Politikaları",
      label:
        dict?.specialFiles?.categories?.publicPolicies || "Kamu Politikaları",
    },
    {
      key: "Güvenlik Araştırmaları",
      label:
        dict?.specialFiles?.categories?.securityResearch ||
        "Güvenlik Araştırmaları",
    },
    {
      key: "Sosyal Politika",
      label: dict?.specialFiles?.categories?.socialPolicy || "Sosyal Politika",
    },
    {
      key: "Ekonomi",
      label: dict?.specialFiles?.categories?.economy || "Ekonomi",
    },
    {
      key: "Çevre ve Sürdürülebilirlik",
      label:
        dict?.specialFiles?.categories?.environment ||
        "Çevre ve Sürdürülebilirlik",
    },
  ];

  const filteredDocuments = specialDocuments.filter((doc) => {
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.content.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handleDocumentAccess = (documentId: string) => {
    if (!auth) {
      setShowLoginModal(true);
    } else {
      router.push(`/${lang}/ozel-dosyalar/${documentId}`);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-3 h-3" />;
      case "medium":
        return <Clock className="w-3 h-3" />;
      case "low":
        return <FileCheck className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Giriş Uyarı Modalı */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
          <div className="relative bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-slate-700">
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
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                {dict?.specialFiles?.warningModal?.title ||
                  "Özel Dosyalar Bölümü"}
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                {dict?.specialFiles?.warningModal?.description ||
                  "Bu bölümde yer alan raporlar KAPDEM'in en özel ve detaylı çalışmalarıdır. Sadece özet kısımlarını görüntüleyebilirsiniz. Tam içerik için giriş yapmanız veya bizimle iletişime geçmeniz gerekmektedir."}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowWarningModal(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {dict?.specialFiles?.warningModal?.continueButton ||
                    "Anladım, Devam Et"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-all duration-200 text-sm"
                  >
                    {dict?.specialFiles?.warningModal?.loginButton ||
                      "Giriş Yap"}
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = "mailto:info@kapdem.org")
                    }
                    className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-all duration-200 text-sm"
                  >
                    {dict?.specialFiles?.warningModal?.contactButton ||
                      "İletişim"}
                  </button>
                </div>
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
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300 text-sm font-medium">
                {dict?.specialFiles?.header?.badge || "Özel Erişim Gerekli"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {dict?.specialFiles?.header?.title || "Özel Dosyalar"}
            </h1>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {dict?.specialFiles?.header?.description ||
                "KAPDEM'in en kapsamlı araştırma raporları ve stratejik analizleri. Derinlemesine incelemeler ve özel çalışmalar bu bölümde yer almaktadır."}
            </p>
          </div>

          {/* Filtreler */}
          <div className="mb-8 space-y-4">
            {/* Arama */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={
                  dict?.specialFiles?.search?.placeholder || "Raporlarda ara..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              />
            </div>

            {/* Kategori Filtreleri */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Belgeler Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <div
                key={doc._id}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full"
              >
                {/* Cover Image */}
                <div className="relative w-full h-48 overflow-hidden bg-slate-700/30 flex-shrink-0">
                  <img
                    src={doc.coverImage || "/images/onlylogo.png"}
                    alt={doc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>

                <div className="p-4 pb-0"></div>

                <div className="p-4 pt-0 flex-1 flex flex-col">
                  {/* Kategori */}
                  <div className="text-xs text-blue-400 font-medium mb-2">
                    {doc.category}
                  </div>

                  {/* Başlık */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200">
                    {doc.title}
                  </h3>

                  {/* Özet */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[4.5rem]">
                    {doc.content?.text || ""}
                  </p>

                  {/* Meta Bilgiler */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>
                        {typeof doc.author === "string"
                          ? doc.author
                          : `${doc.author.firstName} ${doc.author.lastName}`}
                      </span>
                    </div>
                  </div>

                  {/* Etiketler */}

                  {/* Aksiyon Butonları */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDocumentAccess(doc._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Eye className="w-4 h-4" />
                      <span>
                        {dict?.specialFiles?.viewFullText || "Tam Metni Gör"}
                      </span>
                    </button>
                  </div>

                  {/* Kilit İkonu */}
                  <div className="flex items-center justify-center mt-3 text-slate-500">
                    <Lock className="w-4 h-4 mr-1" />
                    <span className="text-xs">
                      {dict?.specialFiles?.loginRequired || "Giriş gerekli"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sonuç bulunamadı */}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">
                {dict?.specialFiles?.noResults?.title || "Belge Bulunamadı"}
              </h3>
              <p className="text-slate-500">
                {dict?.specialFiles?.noResults?.description ||
                  "Arama kriterlerinize uygun belge bulunmuyor."}
              </p>
            </div>
          )}

          {/* Alt Bilgi */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300 text-sm">
                {dict?.specialFiles?.footer?.moreInfo ||
                  "Daha fazla bilgi için:"}
                <a
                  href="mailto:info@kapdem.org"
                  className="text-blue-400 hover:text-blue-300 ml-1 font-medium"
                >
                  info@kapdem.org
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
