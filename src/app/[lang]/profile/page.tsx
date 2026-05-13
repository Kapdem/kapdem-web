import ChangePassword from "@/components/ChangePassword";
import { getProfile } from "@/lib/data";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import {
  FaEnvelope,
  FaCrown,
  FaCheck,
  FaUser,
  FaShield,
  FaGem,
  FaGear,
  FaPenToSquare,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaGraduationCap,
  FaCalendar,
  FaShare,
} from "react-icons/fa6";

const getRoleLabel = (role: string, dict: any) => {
  switch (role) {
    case "FREE":
      return dict?.profile?.roles?.free || "Ücretsiz Üye";
    case "PAID":
      return dict?.profile?.roles?.paid || "Ücretli Üye";
    case "PREMIUM":
      return dict?.profile?.roles?.premium || "Premium Üye";
    case "ADMIN":
      return dict?.profile?.roles?.admin || "Yönetici";
    default:
      return dict?.profile?.roles?.member || "Üye";
  }
};

export default async function ProfilePage({
  params,
}: {
  params: { lang: string };
}) {
  const response = await getProfile();
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);

  // Eğer kullanıcı verisi yoksa veya authentication başarısız olursa login sayfasına yönlendir
  if (!response || response.success === false || response.statusCode === 401) {
    redirect(`/${awaitedParams.lang}/login`);
  }

  const user = response;

  return (
    <div className="mt-28 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-r from-[#013b73] via-[#024a8a] to-[#0369a1] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
        </div>

        <div className="relative px-6 py-12 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white/90" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <FaCheck className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                    {user.title && `${user.title} `}
                    {user.firstName} {user.lastName}
                  </h1>
                  {user.username && (
                    <p className="text-blue-200 text-base sm:text-lg mb-2 font-medium opacity-90">
                      @{user.username}
                    </p>
                  )}
                  <p className="text-blue-100 text-lg sm:text-xl mb-1 font-medium">
                    {user.profession ||
                      dict?.profile?.welcome ||
                      "Hoş geldiniz"}
                  </p>
                  {user.institution && (
                    <p className="text-blue-200 text-base mb-4 opacity-90">
                      {user.institution}
                    </p>
                  )}

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    <div className="glass-dark px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
                      <div className="flex items-center gap-2 text-white">
                        <FaEnvelope className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    {user.isEmailConfirmed && (
                      <div className="glass-dark px-4 py-2 rounded-xl backdrop-blur-md bg-green-500/20 border border-green-400/30">
                        <div className="flex items-center gap-2 text-green-100">
                          <FaCheck className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {dict?.profile?.emailVerified || "E-posta Onaylı"}
                          </span>
                        </div>
                      </div>
                    )}

                    <div
                      className={`glass-dark px-4 py-2 rounded-xl backdrop-blur-md border ${
                        user.role === "PREMIUM"
                          ? "bg-purple-500/20 border-purple-400/30"
                          : user.role === "PAID"
                          ? "bg-orange-500/20 border-orange-400/30"
                          : "bg-gray-500/20 border-gray-400/30"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 ${
                          user.role === "PREMIUM"
                            ? "text-purple-100"
                            : user.role === "PAID"
                            ? "text-orange-100"
                            : "text-gray-100"
                        }`}
                      >
                        {user.role === "PREMIUM" && (
                          <FaGem className="w-4 h-4" />
                        )}
                        {user.role === "PAID" && (
                          <FaCrown className="w-4 h-4" />
                        )}
                        {(user.role === "FREE" || user.role === "ADMIN") && (
                          <FaShield className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {getRoleLabel(user.role, dict)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Tabs */}

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* User Information Section */}
          <div className="xl:col-span-2 space-y-8">
            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-lift">
              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#013b73] rounded-xl flex items-center justify-center">
                      <FaUser className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-xl font-bold text-gray-900">
                        {dict?.profile?.personalInfo || "Kişisel Bilgiler"}
                      </h3>
                      <Link
                        href="/profile/edit"
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                      >
                        <FaPenToSquare className="w-4 h-4" />
                        {dict?.profile?.edit || "Düzenle"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-600  tracking-wide">
                      {dict?.profile?.firstName || "Ad"}
                    </label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 text-gray-900 font-medium text-lg">
                      {user.firstName}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-600  tracking-wide">
                      {dict?.profile?.lastName || "Soyad"}
                    </label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 text-gray-900 font-medium text-lg">
                      {user.lastName}
                    </div>
                  </div>
                  {user.username && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-600  tracking-wide">
                        {dict?.profile?.username || "Kullanıcı Adı"}
                      </label>
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 text-gray-900 font-medium text-lg">
                        @{user.username}
                      </div>
                    </div>
                  )}
                  {user.title && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-600  tracking-wide">
                        {dict?.profile?.title || "Unvan"}
                      </label>
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 text-gray-900 font-medium text-lg">
                        {user.title}
                      </div>
                    </div>
                  )}
                  {user.profession && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-600  tracking-wide">
                        {dict?.profile?.profession || "Meslek"}
                      </label>
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 text-gray-900 font-medium text-lg">
                        {user.profession}
                      </div>
                    </div>
                  )}
                  {user.institution && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-600  tracking-wide">
                        {dict?.profile?.institution || "Kurum"}
                      </label>
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 text-gray-900 font-medium text-lg">
                        {user.institution}
                      </div>
                    </div>
                  )}
                  <div className="lg:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-600  tracking-wide">
                      {dict?.profile?.email || "E-posta Adresi"}
                    </label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 text-gray-900 font-medium text-lg flex items-center justify-between">
                      <span>{user.email}</span>
                      {user.isEmailConfirmed && (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                          <FaCheck className="w-3 h-3" />
                          {dict?.profile?.verified || "Onaylı"}
                        </span>
                      )}
                    </div>
                  </div>
                  {user.about && (
                    <div className="lg:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-gray-600  tracking-wide">
                        {dict?.profile?.about || "Hakkında"}
                      </label>
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 text-gray-900 font-medium text-lg">
                        {user.about}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Membership Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-lift">
              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      user.role === "PREMIUM"
                        ? "bg-gradient-to-r from-purple-500 to-purple-600"
                        : user.role === "PAID"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600"
                        : "bg-gradient-to-r from-gray-500 to-gray-600"
                    }`}
                  >
                    {user.role === "PREMIUM" && (
                      <FaGem className="w-5 h-5 text-white" />
                    )}
                    {user.role === "PAID" && (
                      <FaCrown className="w-5 h-5 text-white" />
                    )}
                    {(user.role === "FREE" || user.role === "ADMIN") && (
                      <FaShield className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {dict?.profile?.membershipInfo || "Üyelik Bilgileri"}
                  </h3>
                </div>
              </div>
              <div className="px-8 py-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div
                    className={`p-6 rounded-2xl flex-1 ${
                      user.role === "PREMIUM"
                        ? "bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
                        : user.role === "PAID"
                        ? "bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`p-3 rounded-xl ${
                          user.role === "PREMIUM"
                            ? "bg-purple-500 text-white"
                            : user.role === "PAID"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {user.role === "PREMIUM" && (
                          <FaGem className="w-6 h-6" />
                        )}
                        {user.role === "PAID" && (
                          <FaCrown className="w-6 h-6" />
                        )}
                        {(user.role === "FREE" || user.role === "ADMIN") && (
                          <FaShield className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h4
                          className={`text-xl font-bold ${
                            user.role === "PREMIUM"
                              ? "text-purple-900"
                              : user.role === "PAID"
                              ? "text-orange-900"
                              : "text-gray-900"
                          }`}
                        >
                          {getRoleLabel(user.role, dict)}
                        </h4>
                        <p
                          className={`text-sm font-medium ${
                            user.role === "PREMIUM"
                              ? "text-purple-700"
                              : user.role === "PAID"
                              ? "text-orange-700"
                              : "text-gray-700"
                          }`}
                        >
                          {user.role === "PAID" || user.role === "PREMIUM"
                            ? dict?.profile?.activeSubscription ||
                              "Aktif abonenliğiniz bulunmaktadır"
                            : dict?.profile?.usingFreePlan ||
                              "Ücretsiz plan kullanıyorsunuz"}
                        </p>
                      </div>
                    </div>

                    {/* Benefits or Description */}
                    <div
                      className={`text-sm ${
                        user.role === "PREMIUM"
                          ? "text-purple-600"
                          : user.role === "PAID"
                          ? "text-orange-600"
                          : "text-gray-600"
                      }`}
                    >
                      {user.role === "PREMIUM" &&
                        (dict?.profile?.allPremiumAccess ||
                          "Tüm premium içeriklere erişim")}
                      {user.role === "PAID" &&
                        (dict?.profile?.paidContentAccess ||
                          "Ücretli içeriklere erişim")}
                      {user.role === "FREE" &&
                        (dict?.profile?.basicContentAccess ||
                          "Temel içeriklere erişim")}
                      {user.role === "ADMIN" &&
                        (dict?.profile?.adminPrivileges ||
                          "Yönetici yetkilerine sahip")}
                    </div>
                  </div>

                  {user.role !== "PREMIUM" && (
                    <div className="flex flex-col gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r from-[#013b73] to-[#024a8a] hover:from-[#024a8a] hover:to-[#013b73] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#013b73]"
                      >
                        <FaGem className="w-4 h-4" />
                        {user.role === "FREE"
                          ? dict?.profile?.buySubscription ||
                            "Abonelik Satın Al"
                          : dict?.profile?.upgradeToPremium ||
                            "Premium'a Yükselt"}
                      </button>
                      <p className="text-xs text-gray-500 text-center max-w-32">
                        {dict?.profile?.accessMoreContent ||
                          "Daha fazla içeriğe erişim sağlayın"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            {user.socialMediaLinks &&
              Object.values(user.socialMediaLinks).some((link) => link) && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-lift">
                  <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <FaShare className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {dict?.profile?.socialMedia || "Sosyal Medya"}
                      </h3>
                    </div>
                  </div>
                  <div className="px-8 py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {user.socialMediaLinks.linkedin && (
                        <Link
                          href={user.socialMediaLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group"
                        >
                          <FaLinkedin className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-blue-800 font-medium text-sm">
                            LinkedIn
                          </span>
                        </Link>
                      )}
                      {user.socialMediaLinks.twitter && (
                        <Link
                          href={user.socialMediaLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-sky-100 rounded-xl border border-sky-200 hover:from-sky-100 hover:to-sky-200 transition-all duration-200 group"
                        >
                          <FaTwitter className="w-6 h-6 text-sky-600 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-sky-800 font-medium text-sm">
                            Twitter
                          </span>
                        </Link>
                      )}
                      {user.socialMediaLinks.instagram && (
                        <Link
                          href={user.socialMediaLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border border-pink-200 hover:from-pink-100 hover:to-pink-200 transition-all duration-200 group"
                        >
                          <FaInstagram className="w-6 h-6 text-pink-600 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-pink-800 font-medium text-sm">
                            Instagram
                          </span>
                        </Link>
                      )}
                      {user.socialMediaLinks.facebook && (
                        <Link
                          href={user.socialMediaLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl border border-blue-300 hover:from-blue-100 hover:to-indigo-200 transition-all duration-200 group"
                        >
                          <FaFacebook className="w-6 h-6 text-blue-700 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-blue-800 font-medium text-sm">
                            Facebook
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}

            {/* Education Section */}
            {user.education && user.education.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-lift">
                <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <FaGraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {dict?.profile?.educationInfo || "Eğitim Bilgileri"}
                    </h3>
                  </div>
                </div>
                <div className="px-8 py-8">
                  <div className="space-y-6">
                    {user.education.map((edu, index) => (
                      <div
                        key={edu._id || index}
                        className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-green-900 mb-1">
                              {edu.institution}
                            </h4>
                            <p className="text-green-700 font-medium mb-2">
                              {edu.degree} - {edu.field}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                            <FaCalendar className="w-3 h-3" />
                            <span>
                              {edu.startYear} -{" "}
                              {edu.isCompleted
                                ? edu.endYear
                                : dict?.profile?.ongoing || "Devam ediyor"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              edu.isCompleted
                                ? "bg-green-200 text-green-800"
                                : "bg-orange-200 text-orange-800"
                            }`}
                          >
                            {edu.isCompleted ? (
                              <>
                                <FaCheck className="w-3 h-3" />
                                {dict?.profile?.completed || "Tamamlandı"}
                              </>
                            ) : (
                              dict?.profile?.ongoing || "Devam ediyor"
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Change Password Section */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-lift">
              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <FaGear className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {dict?.profile?.security || "Güvenlik"}
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <ChangePassword dict={dict} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
