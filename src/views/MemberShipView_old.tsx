"use client";

import React from "react";
import Image from "next/image";
import { User, Building, Trophy, CheckCircle, Zap, Users } from "lucide-react";
import CountUp from "react-countup";

type Props = {
  dict: any;
  lang: string;
};

export default function MemberShipView({ dict, lang }: Props) {
  const t = dict.membershipPage;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0e2c54] via-[#0e2c54] to-[#1a365d] overflow-hidden mt-28">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Logo ve Başlık */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <Image
                      src="/images/onlylogo.png"
                      alt="KAPDEM Logo"
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
                    {t.heroTitle}
                  </h1>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full"></div>
                </div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                {t.heroSubtitle}
              </h2>
              <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                {t.heroDescription}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span>150+ {t.stats.researchReports}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span>25 {t.stats.expertResearchers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span>8 {t.stats.yearsExperience}</span>
                </div>
              </div>
            </div>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="text-4xl font-bold text-white mb-3">
                  <CountUp end={500} duration={2} />+
                </div>
                <div className="text-blue-200 text-sm">{t.stats.activeMembers}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="text-4xl font-bold text-white mb-3">
                  <CountUp end={50} duration={2} />+
                </div>
                <div className="text-blue-200 text-sm">{t.stats.corporatePartners}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="text-4xl font-bold text-white mb-3">
                  <CountUp end={100} duration={2} />+
                </div>
                <div className="text-blue-200 text-sm">{t.stats.publishedArticles}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="text-4xl font-bold text-white mb-3">24/7</div>
                <div className="text-blue-200 text-sm">{t.stats.support247}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Üyelik Paketleri */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Size En Uygun Üyelik Paketini Seçin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              KAPDEM üyeliği, kamu politikaları, devlet yönetimi ve toplumsal
              gelişim alanlarındaki güncel araştırma, analiz ve raporlarımıza
              öncelikli erişim imkânı sağlar. Üyeler, kurumun yürüttüğü
              çalışmaları yakından takip edebilir, özel dosya ve
              değerlendirmelere ulaşabilir, yalnızca üyelere açık oturumlar ve
              etkinlikler hakkında önceden bilgilendirilir. Ayrıca KAPDEM’in
              düzenlediği kapalı toplantılar, atölyeler ve özel yayın
              paylaşımlarında öncelik hakkına sahip olurlar. Üyelik, bilgiye
              dayalı politika üretimine erişim ve katkı için ayrıcalıklı bir
              platform sunar.
            </p>
          </div>

          {/* Free, Araştırmacı ve Kurum paketleri yan yana */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Free Paket */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8 h-full flex flex-col hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Temel
                  </h3>
                  <p className="text-gray-600 mb-6">
                    KAPDEM üyeleri, düşünce üretimi ve kamu politikası
                    çalışmalarına daha yakın olma ayrıcalığına sahiptir. Üyelik,
                    yalnızca erişim değil; bilgiye dayalı etkileşim ve paylaşım
                    imkânı sunar.
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-green-600">
                      ₺0
                    </span>
                    <span className="text-gray-500 text-lg">
                      /sonsuza kadar
                    </span>
                  </div>
                  <div className="text-sm text-green-600 mb-6 font-medium">
                    Hemen başlayın, kredi kartı gerektirmez
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Yalnızca üyelere açık özel yayın ve analiz içeriklerine
                      erişim
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      KAPDEM tarafından düzenlenen açık etkinliklerden,
                      panellerden ve atölyelerden öncelikli haberdar olma
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      KAPDEM bültenine ve güncel araştırma duyurularına erişim
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Üyelere özel olarak hazırlanan{" "}
                      <span className="font-bold">iki adet özel dosya</span>ya
                      erişim hakkı
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Yayınları ve araştırma raporlarını{" "}
                      <strong>PDF formatında indirme</strong>
                      imkânı
                    </span>
                  </li>
                </ul>

                <button className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors focus:ring-4 focus:ring-green-200">
                  Ücretsiz Başla
                </button>
              </div>
            </div>

            {/* Araştırmacı Paketi */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-8 h-full flex flex-col hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Araştırmacı
                  </h3>
                  <p className="text-gray-600 mb-6">
                    KAPDEM Araştırmacı Üyeliği, akademisyenler, uzmanlar,
                    araştırmacılar ve politika analistleri için geliştirilmiş
                    kapsamlı bir üyelik modelidir. Bu üyelik, derinlemesine
                    araştırmalara erişim, özel içeriklere katılım ve kurum içi
                    bilgi paylaşım ağında yer alma ayrıcalığı sunar.
                    Akademisyenler, uzmanlar ve politika araştırmacıları için
                    geliştirilmiş profesyonel üyelik modeli.
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ₺250
                    </span>
                    <span className="text-gray-500 text-lg">/ay</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-6">
                    edu.tr maili ile kayıt olanlara 100 ₺
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      KAPDEM bünyesindeki tüm yayınlara ve arşiv içeriklerine
                      tam erişim
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Güncel ve özel Araştırma Raporlarına öncelikli erişim
                      hakkı
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      KAPDEM tarafından düzenlenen tüm etkinliklere ve kapalı
                      oturumlara davet
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Üyelere özel hazırlanmış tüm Özel Dosyalara sınırsız
                      erişim
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Temel üyelik kapsamındaki tüm avantajlardan yararlanma
                      (bülten, forum, açık etkinlikler, PDF indirme vb.)
                    </span>
                  </li>
                </ul>

                <button className="w-full bg-[#0e2c54] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#0a1f3d] transition-colors focus:ring-4 focus:ring-blue-200">
                  Hemen Başla
                </button>
              </div>
            </div>

            {/* Kurum Paketi - En Popüler */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    EN POPÜLER
                  </span>
                </div>

                <div className="text-center mb-8 mt-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Kurumsal
                  </h3>
                  <p className="text-gray-600 mb-6">
                    KAPDEM Kurumsal Üyeliği, kamu kurumları, yerel yönetimler,
                    sivil toplum kuruluşları, düşünce merkezleri ve özel sektör
                    temsilcileri için geliştirilmiş, çok kullanıcılı ve
                    stratejik iş birliği temelli bir üyelik modelidir. Kurumsal
                    üyelik, kurumların politika geliştirme, analiz, stratejik
                    planlama ve yönetişim süreçlerine doğrudan katkı sağlayacak
                    bilgi, içerik ve etkileşim imkânı sunar.
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ₺2000
                    </span>
                    <span className="text-gray-500 text-lg">/ay</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Kamu kurumları, sivil toplum kuruluşları ve özel sektör
                      için çok kullanıcılı erişim ve stratejik iş birliği
                      modeli.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      KAPDEM’in tüm araştırma ve yayın arşivine sınırsız erişim
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      10 kullanıcıya kadar kurumsal erişim hakkı
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      KAPDEM tarafından düzenlenen özel etkinlikler, kapalı
                      oturumlar ve iş birliği toplantılarına davet
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      24 saat içinde yanıtlanan destek ve bilgi hizmeti
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Kurumsal logo ve tanıtım ile iş birliği sayfalarında
                      görünürlük
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Tüm araştırmacı ve temel üyelik avantajlarından tam
                      yararlanma
                    </span>
                  </li>
                </ul>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 focus:ring-4 focus:ring-blue-200">
                  Kurumsal Üyelik Başlat
                </button>
              </div>
            </div>
          </div>

          {/* Stratejik Ortak Paketi - En altta 3 sütun genişliğinde */}
          <div className="max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Trophy className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Stratejik Ortak
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Büyük ölçekli kurumlar ve özel araştırma projeleri için
                    premium çözüm
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ₺10.000
                    </span>
                    <span className="text-gray-500 text-lg">/yıl</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-6">
                    Özel fiyatlandırma seçenekleri mevcut
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Tüm kurum avantajları</strong> dahil
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Özel araştırma projeleri</strong> ve danışmanlık
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Sınırsız kullanıcı</strong> erişimi
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>7/24 VIP destek</strong> hattı
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Sınırsız yayın</strong> hakkı
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Özel etkinlik</strong> organizasyonu
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Özel danışman</strong> ataması
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Özel raporlama</strong> ve analiz
                      </span>
                    </li>
                  </ul>
                </div>

                <button className="w-full bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-900 transition-colors focus:ring-4 focus:ring-gray-200">
                  İletişime Geç
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ek Bilgiler ve SSS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Neden KAPDEM */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Neden KAPDEM Üyesi Olmalısınız?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Kanıtlanmış Uzmanlık
                    </h4>
                    <p className="text-gray-600">
                      8 yıllık deneyim ile kamu politikası alanında
                      Türkiye&apos;nin öncü kuruluşuyuz. 150+ araştırma raporu
                      ve 25 uzman araştırmacımızla güvenilir bilgi sunuyoruz.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Güncel ve Objektif Analizler
                    </h4>
                    <p className="text-gray-600">
                      Sürekli güncelenen içeriklerimiz ve objektif analizlerimiz
                      ile karar verme süreçlerinizi destekliyoruz.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Geniş Ağ ve İş Birliği
                    </h4>
                    <p className="text-gray-600">
                      500+ aktif üyemiz ve 50+ kurum ortağımız ile güçlü bir
                      profesyonel ağa erişim sağlayın.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SSS */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Sıkça Sorulan Sorular
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Üyelik iptali nasıl yapılır?
                  </h4>
                  <p className="text-gray-600">
                    Üyeliğinizi istediğiniz zaman iptal edebilirsiniz. İptal
                    işlemi için destek ekibimizle iletişime geçmeniz yeterlidir.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Ödeme seçenekleri nelerdir?
                  </h4>
                  <p className="text-gray-600">
                    Kredi kartı, banka kartı ve havale ile ödeme yapabilirsiniz.
                    Kurumsal üyelikler için özel ödeme planları da mevcuttur.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Deneme süresi var mı?
                  </h4>
                  <p className="text-gray-600">
                    Evet, tüm paketler için 7 günlük ücretsiz deneme süresi
                    sunuyoruz. Bu süre içinde tüm özellikleri test
                    edebilirsiniz.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Paket değişikliği yapabilir miyim?
                  </h4>
                  <p className="text-gray-600">
                    Evet, istediğiniz zaman paketinizi yükseltebilir veya
                    düşürebilirsiniz. Fark ücretleri orantılı olarak hesaplanır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0e2c54] to-[#1a365d]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Hemen Başlayın</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Türkiye&apos;nin önde gelen kamu politikası araştırma merkezine
            katılın. Uzman kadromuz ve kapsamlı araştırmalarımızla tanışın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#0e2c54] hover:bg-gray-300 px-8 py-4 rounded-xl font-semibold transition-colors">
              Hemen Başla
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#0e2c54] transition-colors">
              Daha Fazla Bilgi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
