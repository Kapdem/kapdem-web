"use client";

import React, { useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import DonateUsbyIban from "./General/DonateUsbyIban";

interface DonatePageProps {
  dict: any;
}

export default function DonatePage({ dict }: DonatePageProps) {
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [agree, setAgree] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const donationAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handleDonate = () => {
    if (agree && name && email && category) {
      alert(
        dict?.toast?.common?.donateRedirect ||
          "Bağışınız için teşekkür ederiz. Güvenli ödeme sayfasına yönlendiriliyorsunuz..."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white mt-28">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-[#0e2c54] via-[#0e2c54] to-[#0e2c54] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Logo ve Başlık */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-6 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <Image
                      src={"/images/onlylogo.png"}
                      alt="KAPDEM Logo"
                      width={64}
                      height={64}
                      className="w-16 h-16"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                    KAPDEM
                  </h1>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full"></div>
                </div>
              </div>
              <p className="text-xl text-blue-100 mb-4 leading-relaxed">
                {dict?.donatePage?.subtitle ||
                  "Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi"}
              </p>
              <div className="text-blue-200 text-sm max-w-lg">
                <p
                  className={`leading-relaxed transition-all duration-300 ${
                    isExpanded ? "" : "line-clamp-4"
                  }`}
                >
                  {dict?.donatePage?.description ||
                    "KAPDEM, Türkiye'de kamu politikaları, devlet yönetimi ve toplumsal gelişim alanlarında bilgi üreten, çözüm odaklı öneriler geliştiren bağımsız bir düşünce kuruluşudur. Amacımız; kamu yararını, adalet duygusunu ve toplumsal refahı güçlendiren politikaların oluşumuna katkı sunmaktır."}{" "}
                  {isExpanded && (
                    <span>
                      {dict?.donatePage?.expandedDescription ||
                        "Her çalışma, Türkiye'de kamu politikalarının daha katılımcı, şeffaf ve etkili biçimde şekillenmesine yönelik bir adım olarak tasarlanır. Yürüttüğümüz araştırmalar, idari reformlardan toplumsal sorunların çözümüne, demokratik yönetişimden sürdürülebilir kalkınmaya kadar geniş bir yelpazede kamusal fayda üretmeyi hedefler. KAPDEM'e yapacağınız her destek, yalnızca bir katkı değil; bilgiye, bilimselliğe ve toplumsal gelişime yapılan bir yatırımdır. Bağışlarınız, yeni araştırmaların hayata geçmesini, genç araştırmacıların desteklenmesini ve kamu politikalarının daha adil, kapsayıcı ve sürdürülebilir hale gelmesini sağlar. Bağımsız, tarafsız ve gönüllülük esasına dayalı yapımızla; bilimin, aklın ve kamusal sorumluluğun rehberliğinde yürüttüğümüz bu yolculukta siz de yanımızda olun."}
                    </span>
                  )}
                </p>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1 mt-2 text-blue-300 hover:text-blue-200 transition-colors duration-200 text-xs font-medium"
                >
                  {isExpanded ? (
                    <>
                      {dict?.donatePage?.showLess || "Daha az göster"}
                      <ChevronUp className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      {dict?.donatePage?.showMore || "Devamını oku"}
                      <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-2 gap-4 ">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 ">
                <div className="text-3xl font-bold text-white mb-2">
                  <CountUp start={0} end={150} duration={2} />+
                </div>
                <div className="text-blue-200 text-sm">
                  {dict?.donatePage?.stats?.reports || "Yayınlanan Rapor"}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  <CountUp start={0} end={25} duration={2} />
                </div>
                <div className="text-blue-200 text-sm">
                  {dict?.donatePage?.stats?.researchers || "Aktif Araştırmacı"}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  <CountUp start={0} end={8} duration={2} />
                </div>
                <div className="text-blue-200 text-sm">
                  {dict?.donatePage?.stats?.experience || "Yıllık Deneyim"}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  <CountUp start={0} end={50} duration={2} />+
                </div>
                <div className="text-blue-200 text-sm">
                  {dict?.donatePage?.stats?.partnerships || "Kurum Ortaklığı"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}

          <div className="lg:col-span-2">
            <DonateUsbyIban dict={dict} />
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {dict?.donatePage?.formTitle || "Bağış Yapın"}
                </h2>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {dict?.donatePage?.amountLabel || "Bağış Miktarı"}
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {donationAmounts.map((amt) => (
                      <button
                        key={amt}
                        className={`p-3 rounded-lg border transition-colors ${
                          selectedAmount === amt
                            ? "bg-[#0e2c54] text-white border-[#0e2c54]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                        }`}
                        onClick={() => setSelectedAmount(amt)}
                      >
                        <div className="font-semibold">
                          ₺{amt.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict?.donatePage?.otherAmount || "Diğer Miktar"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₺
                      </span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={selectedAmount}
                        onChange={(e) =>
                          setSelectedAmount(Number(e.target.value))
                        }
                        min={100}
                        step={50}
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {dict?.donatePage?.nameLabel || "Ad Soyad / Kurum Adı"}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder={
                          dict?.donatePage?.namePlaceholder ||
                          "Ad Soyad veya Kurum Adı"
                        }
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {dict?.donatePage?.emailLabel || "E-posta Adresi"}
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder={
                          dict?.donatePage?.emailPlaceholder ||
                          "ornek@email.com"
                        }
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict?.donatePage?.categoryLabel || "Destek Alanı"}
                    </label>
                    <select
                      className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">
                        {dict?.donatePage?.categoryPlaceholder || "Seçiniz"}
                      </option>
                      <option value="Policy">
                        {dict?.donatePage?.categories?.policy ||
                          "Kamu Politikası"}
                      </option>
                      <option value="Governance">
                        {dict?.donatePage?.categories?.governance ||
                          "Devlet Yönetimi"}
                      </option>
                      <option value="Development">
                        {dict?.donatePage?.categories?.development ||
                          "Toplumsal Gelişim"}
                      </option>
                      <option value="Education">
                        {dict?.donatePage?.categories?.education || "Eğitim"}
                      </option>
                      <option value="Innovation">
                        {dict?.donatePage?.categories?.innovation ||
                          "İnovasyon"}
                      </option>
                      <option value="General">
                        {dict?.donatePage?.categories?.general ||
                          "Genel Destek"}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Agreement */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded border border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-600 text-sm">
                      <Link
                        href="#"
                        className="text-[#0e2c54] hover:text-[#0e2c54] underline"
                      >
                        {dict?.donatePage?.agreementLink1 || "Bağış koşulları"}
                      </Link>{" "}
                      {dict?.donatePage?.agreementAnd || "ve"}{" "}
                      <Link
                        href="#"
                        className="text-[#0e2c54] hover:text-[#0e2c54] underline"
                      >
                        {dict?.donatePage?.agreementLink2 ||
                          "gizlilik politikası"}
                      </Link>
                      &apos;nı{" "}
                      {dict?.donatePage?.agreementText || "kabul ediyorum."}
                    </span>
                  </label>
                </div>

                {/* Summary and Donate Button */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">
                      {dict?.donatePage?.summaryLabel || "Bağış Miktarı:"}
                    </span>
                    <span className="text-xl font-bold text-[#0e2c54]">
                      ₺{selectedAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                    agree && name && email && category
                      ? "bg-[#0e2c54] text-white hover:bg-[#0e2c54]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!agree || !name || !email || !category}
                  onClick={handleDonate}
                >
                  {dict?.donatePage?.donateButton || "Bağışla"}
                </button>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {dict?.donatePage?.whyDonateTitle ||
                  "Neden KAPDEM'e Bağış Yapmalısınız?"}
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                {dict?.donatePage?.whyDonateReasons ? (
                  dict.donatePage.whyDonateReasons.map(
                    (reason: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>
                          {reason.title && <strong>{reason.title}</strong>}{" "}
                          {reason.description}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>Toplum İçin:</strong> KAPDEM, kamu yararını,
                        toplumsal gelişimi ve adalet duygusunu güçlendirmeyi
                        amaçlayan bağımsız bir düşünce kuruluşudur.
                        Bağışlarınız, bu hedeflere ulaşmamıza doğrudan katkı
                        sağlar.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>Bilimsel ve Kalıcı Etki:</strong> Her destek,
                        kamu politikalarının daha etkili, katılımcı ve
                        sürdürülebilir biçimde şekillenmesine yönelik araştırma
                        ve analiz çalışmalarına dönüşür.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>Bağımsızlık ve Tarafsızlık:</strong> KAPDEM,
                        hiçbir siyasi yapı veya çıkar grubuyla organik bağ
                        kurmadan; sadece toplum, bilgi ve kamu yararı için
                        çalışır. Siz de bağımsız ve tarafsız düşünceye ve kamu
                        yararına katkı sağlayın!
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        Siz de bağımsız ve tarafsız düşünceye ve kamu yararına
                        katkı sağlayın!
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {dict?.donatePage?.workAreasTitle || "Çalışma Alanlarımız"}
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                {dict?.donatePage?.workAreasContent ? (
                  dict.donatePage.workAreasContent.map(
                    (content: string, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p>{content}</p>
                      </div>
                    )
                  )
                ) : (
                  <>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p>
                        KAPDEM, kamu politikaları, devlet yönetimi ve toplumsal
                        gelişim alanlarında yürüttüğü bilimsel araştırmalar ve
                        düşünsel üretim faaliyetleriyle, Türkiye'de politika
                        geliştirme süreçlerine katkı sunan bağımsız bir düşünce
                        kuruluşudur. Çalışmalarının merkezinde; kamu yararını
                        gözeten, kanıta dayalı ve sürdürülebilir politika
                        önerileri geliştirmek yer alır.
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p>
                        Kurum, kamu politikalarının tasarımı, uygulanması,
                        değerlendirilmesi ve geliştirilmesi süreçlerini bütüncül
                        bir bakış açısıyla ele alır. Devlet yönetiminde
                        etkinliği, hesap verebilirliği ve katılımcılığı
                        artıracak yapısal reform alanlarında çözüm odaklı
                        araştırmalar yürütür. Bu çerçevede, yönetim modelleri,
                        idari reformlar, yönetişim mekanizmaları, karar alma
                        süreçleri ve kamu performans sistemleri üzerine
                        odaklanır.
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p>
                        KAPDEM, aynı zamanda toplumsal gelişimi destekleyen
                        projeler geliştirir. Sosyal sorunlara çözüm üretmeyi,
                        eşitlik, kapsayıcılık, eğitim, istihdam ve demokratik
                        katılım gibi alanlarda fark yaratmayı hedefler. Kamu
                        politikalarının yalnızca idari değil, toplumsal
                        etkilerini de analiz eder; bu doğrultuda bütüncül
                        yaklaşımlar önerir.
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p>
                        Yayın ve araştırma faaliyetleri; kamu politikaları,
                        yönetim tasarımı ve reformu, küresel politika ve
                        uluslararası ilişkiler, ekonomi ve kalkınma, teknoloji
                        ve inovasyon, göç, savunma ve güvenlik gibi geniş bir
                        yelpazeyi kapsar. Bu alanlarda hazırlanan raporlar,
                        değerlendirmeler, politika notları ve analizler, kamu
                        kurumlarına, akademiye, sivil topluma ve topluma açık
                        bir bilgi paylaşım ağı oluşturur.
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p>
                        KAPDEM, bilgiye dayalı analizleri, tarafsız duruşu ve
                        kamusal sorumluluğu ile kamu politikalarının daha adil,
                        katılımcı ve sürdürülebilir biçimde şekillenmesine katkı
                        sağlamayı sürdürmektedir.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
