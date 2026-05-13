"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle, Mail, Phone, MapPin, Zap, Users } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { contact } from "../lib/action";

type Props = {
  dict: any;
};

export default function ContactPage({ dict }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await contact(form);
      if (res && (res.success || res.statusCode === 201)) {
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
        toast.success(
          dict?.toast?.contact?.success || "Teşekkürler, mesajınız iletildi."
        );
      } else if (res && res.message) {
        // Backend hata mesajları spesifik validasyon hataları için gösterilebilir
        // Ama genel mesajlar için dict kullan
        const errorMsg = Array.isArray(res.message)
          ? res.message.join("\n")
          : res.message;
        // Eğer backend mesajı validasyon hatasıysa göster, yoksa dict kullan
        if (errorMsg.includes("@") || errorMsg.includes("required")) {
          toast.error(errorMsg);
        } else {
          toast.error(
            dict?.toast?.contact?.error ||
              "Mesaj gönderilemedi. Lütfen tekrar deneyin."
          );
        }
      } else {
        toast.error(
          dict?.toast?.contact?.error ||
            "Mesaj gönderilemedi. Lütfen tekrar deneyin."
        );
      }
    } catch (error) {
      toast.error(
        dict?.toast?.common?.error || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0e2c54] via-[#0e2c54] to-[#1a365d] overflow-hidden mt-28">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center">
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
                  {dict?.contactPage?.title || "İletişim"}
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              {dict?.contactPage?.subtitle || "Bizimle iletişime geçin"}
            </h2>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed max-w-2xl">
              {dict?.contactPage?.description ||
                "Görüşleriniz bizim için değerli. Size yardımcı olmaktan mutluluk duyarız."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-600" />{" "}
                {dict?.contactPage?.contactInfo || "İletişim Bilgileri"}
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {dict?.contactPage?.email || "E-posta"}
                    </p>
                    <p className="text-gray-600 text-sm">info@kapdem.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="text-green-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {dict?.contactPage?.phone || "Telefon"}
                    </p>
                    <p className="text-gray-600 text-sm">+90 555 555 55 55</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <MapPin className="text-red-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {dict?.contactPage?.address || "Adres"}
                    </p>
                    <p className="text-gray-600 text-sm">Ankara, Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-2xl shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-3">
                {dict?.contactPage?.whyContact || "Neden Bize Ulaşmalısınız?"}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {dict?.contactPage?.quickReply || "Hızlı ve güvenilir yanıt"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {dict?.contactPage?.expertSupport || "Uzman destek ekibi"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {dict?.contactPage?.responseTime ||
                    "24 saat içinde geri dönüş"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {dict?.contactPage?.personalizedSolutions ||
                    "Kişiselleştirilmiş çözümler"}
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {dict?.contactPage?.sendMessage || "Mesaj Gönder"}
              </h2>
              <p className="text-gray-600 text-sm">
                {dict?.contactPage?.formDescription ||
                  "Formu doldurarak bizimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız."}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="flex text-gray-700 text-xs font-semibold items-center gap-2">
                    {dict?.contactPage?.firstName || "Ad"}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-gray-300"
                    placeholder={
                      dict?.contactPage?.firstNamePlaceholder ||
                      "Adınızı giriniz"
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="flex text-gray-700 text-xs font-semibold items-center gap-2">
                    {dict?.contactPage?.lastName || "Soyad"}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-gray-300"
                    placeholder={
                      dict?.contactPage?.lastNamePlaceholder ||
                      "Soyadınızı giriniz"
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="flex text-gray-700 text-xs font-semibold items-center gap-2">
                  {dict?.contactPage?.email || "E-posta"}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-gray-300"
                  placeholder={
                    dict?.contactPage?.emailPlaceholder ||
                    "E-posta adresinizi giriniz"
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="flex text-gray-700 text-xs font-semibold items-center gap-2">
                  {dict?.contactPage?.subject || "Konu"}
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-gray-300 bg-white"
                >
                  <option value="" disabled>
                    {dict?.contactPage?.subjectPlaceholder || "Konu seçiniz"}
                  </option>
                  <option value="şikayet">
                    {dict?.contactPage?.subjectOptions?.complaint || "Şikayet"}
                  </option>
                  <option value="teşekkür">
                    {dict?.contactPage?.subjectOptions?.thanks || "Teşekkür"}
                  </option>
                  <option value="üyelik">
                    {dict?.contactPage?.subjectOptions?.membership || "Üyelik"}
                  </option>
                  <option value="diğer">
                    {dict?.contactPage?.subjectOptions?.other || "Diğer"}
                  </option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="flex text-gray-700 text-xs font-semibold items-center gap-2">
                  {dict?.contactPage?.message || "Mesaj"}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-gray-300 resize-none"
                  placeholder={
                    dict?.contactPage?.messagePlaceholder ||
                    "Mesajınızı buraya yazınız..."
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 text-base shadow"
              >
                <span className="flex items-center justify-center gap-2">
                  <Mail className="text-lg" />{" "}
                  {dict?.contactPage?.sendButton || "Mesajı Gönder"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Ek Bilgiler ve SSS */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Neden KAPDEM */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                {dict?.contactPage?.whyWriteTitle || "Neden Bize Yazmalısınız?"}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {dict?.contactPage?.expertSupportTitle || "Uzman Destek"}
                    </h4>
                    <p className="text-gray-600">
                      {dict?.contactPage?.expertSupportDesc ||
                        "Alanında uzman ekibimiz ile size en iyi desteği sunmak için buradayız."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {dict?.contactPage?.quickResponseTitle ||
                        "Hızlı Geri Dönüş"}
                    </h4>
                    <p className="text-gray-600">
                      {dict?.contactPage?.quickResponseDesc ||
                        "Tüm mesajlarınıza 24 saat içinde dönüş sağlıyoruz."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {dict?.contactPage?.wideNetworkTitle || "Geniş Ağ"}
                    </h4>
                    <p className="text-gray-600">
                      {dict?.contactPage?.wideNetworkDesc ||
                        "500+ aktif üyemiz ve 50+ kurum ortağımız ile güçlü bir profesyonel ağa erişim sağlayın."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SSS */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                {dict?.contactPage?.faqTitle || "Sıkça Sorulan Sorular"}
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {dict?.contactPage?.faq1Question ||
                      "Mesajıma ne kadar sürede dönüş yapılır?"}
                  </h4>
                  <p className="text-gray-600">
                    {dict?.contactPage?.faq1Answer ||
                      "Tüm mesajlara 24 saat içinde dönüş yapılır."}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {dict?.contactPage?.faq2Question ||
                      "Hangi kanallardan ulaşabilirim?"}
                  </h4>
                  <p className="text-gray-600">
                    {dict?.contactPage?.faq2Answer ||
                      "E-posta, telefon veya iletişim formu üzerinden bize ulaşabilirsiniz."}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {dict?.contactPage?.faq3Question ||
                      "Bilgilerim güvende mi?"}
                  </h4>
                  <p className="text-gray-600">
                    {dict?.contactPage?.faq3Answer ||
                      "Tüm bilgileriniz gizli tutulur ve üçüncü kişilerle paylaşılmaz."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
