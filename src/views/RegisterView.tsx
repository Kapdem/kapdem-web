"use client";
import Image from "next/image";
import CustomSlider from "../components/CustomSlider";
import { useState } from "react";
import ConsentModal from "../components/ConsentModal";
import ConsentToggle from "../components/ConsentToggle";
import { Register } from "../lib/auth/action";
import { kvkkText } from "../common/kvkk";
import { acıkiletisim } from "../common/acıkiletisim";

export default function RegisterView({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // KVKK, iletişim, bülten toggle state
  const [kvkkOpen, setKvkkOpen] = useState(false);
  const [commOpen, setCommOpen] = useState(false);
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [commChecked, setCommChecked] = useState(false);
  const [newsletterChecked, setNewsletterChecked] = useState(false);

  // KVKK ve Açık İletişim metinleri
  const commText = `Açık iletişim metni: Bilgilendirme ve iletişim için onay vermektesiniz.`;

  // Modal onaylandığında toggle aktif edilir
  const handleKvkkApprove = () => {
    setKvkkChecked(true);
    setKvkkOpen(false);
  };
  const handleKvkkClose = () => {
    setKvkkOpen(false);
  };
  const handleCommApprove = () => {
    setCommChecked(true);
    setCommOpen(false);
  };
  const handleCommClose = () => {
    setCommOpen(false);
  };

  // Kayıt butonu KVKK ve Açık İletişim onayları olmadan disabled
  const canRegister = kvkkChecked && commChecked;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (form.password !== form.confirmPassword) {
        setError(dict.registerPage.errorPasswordMismatch);
        setLoading(false);
        return;
      }
      if (!kvkkChecked || !commChecked) {
        setError(dict.registerPage.errorConsentRequired);
        setLoading(false);
        return;
      }
      const res = await Register(form);

      if (res?.success) {
        setSuccess(dict.registerPage.successMessage);
        // Opsiyonel: yönlendirme yerine kısa gecikme
        setTimeout(() => {
          window.location.href = `/${lang}/login`;
        }, 800);
      } else {
        setError(res?.message || dict.registerPage.errorGeneric);
      }
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        institution: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(dict.registerPage.errorGeneric);
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen grid bg-zinc-900 grid-cols-1 md:grid-cols-2">
      {/* Left: Register Form */}
      <div className="flex flex-col justify-center px-8 md:px-20">
        <div className="max-w-lg w-full mx-auto space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div>
              <Image
                src={"/images/kapdem-logo-2.png"}
                alt="Kapdem Logo"
                width={400}
                height={160}
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">
              {dict.registerPage.title}
            </h2>
            <p className="text-gray-300">{dict.registerPage.description}</p>
          </div>

          {/* Form */}
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-400 text-center font-semibold">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-green-400 text-center font-semibold">
                  {success}
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-sm font-semibold text-white mb-2">
                    {dict.registerPage.firstName}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 text-white rounded-lg px-4 py-3 transition-all duration-200 bg-transparent"
                    placeholder={dict.registerPage.firstName}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-semibold text-white mb-2">
                    {dict.registerPage.lastName}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 text-white rounded-lg px-4 py-3 transition-all duration-200 bg-transparent"
                    placeholder={dict.registerPage.lastName}
                    required
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-white mb-2">
                  {dict.registerPage.username}
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 text-white rounded-lg px-4 py-3 transition-all duration-200 bg-transparent"
                  placeholder={dict.registerPage.usernamePlaceholder}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {dict.registerPage.institution}
                </label>
                <input
                  type="text"
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 text-white rounded-lg px-4 py-3 transition-all duration-200 bg-transparent"
                  placeholder={dict.registerPage.institutionPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {dict.registerPage.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 text-white rounded-lg px-4 py-3 transition-all duration-200 bg-transparent"
                  placeholder={dict.registerPage.emailPlaceholder}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {dict.registerPage.password}
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border-2 text-white border-gray-200 rounded-lg px-4 py-3 transition-all duration-200 bg-transparent"
                  placeholder={dict.registerPage.passwordPlaceholder}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {dict.registerPage.confirmPassword}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full border-2 text-white border-gray-200 rounded-lg px-4 py-3 transition-all duration-200 bg-transparent"
                  placeholder={dict.registerPage.confirmPasswordPlaceholder}
                  required
                />
              </div>
              {/* Toggle alanları */}
              <div className="mb-6 mt-2">
                <ConsentToggle
                  label={dict.registerPage.kvkkLabel}
                  checked={kvkkChecked}
                  onChange={setKvkkChecked}
                  required
                  onShowModal={() => setKvkkOpen(true)}
                />
                <ConsentToggle
                  label={dict.registerPage.communicationLabel}
                  checked={commChecked}
                  onChange={setCommChecked}
                  required
                  onShowModal={() => setCommOpen(true)}
                />
                <ConsentToggle
                  onShowModal={() => setNewsletterChecked(!newsletterChecked)}
                  label={dict.registerPage.newsletterLabel}
                  checked={newsletterChecked}
                  onChange={setNewsletterChecked}
                />
              </div>

              {/* KVKK Modal */}
              <ConsentModal
                dict={dict}
                open={kvkkOpen}
                onClose={handleKvkkClose}
                onApprove={handleKvkkApprove}
                title={dict.registerPage.kvkkTitle}
              >
                <div className="whitespace-pre-line text-sm">{kvkkText}</div>
              </ConsentModal>

              <ConsentModal
                dict={dict}
                open={commOpen}
                onClose={handleCommClose}
                onApprove={handleCommApprove}
                title={dict.registerPage.communicationTitle}
              >
                <div className="whitespace-pre-line text-sm">
                  {acıkiletisim}
                </div>
              </ConsentModal>
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg py-3 font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  canRegister ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={loading || !canRegister}
              >
                {loading
                  ? dict.registerPage.registeringButton
                  : dict.registerPage.registerButton}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-white/70 mt-6">
            <p>{dict.registerPage.footer}</p>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="w-full h-screen hidden md:block">
        <div className="h-full flex items-center justify-center p-8">
          <div className="w-full h-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl border border-white/30 bg-white/10 backdrop-blur-sm">
            <CustomSlider dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
