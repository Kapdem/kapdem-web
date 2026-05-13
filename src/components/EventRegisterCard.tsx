"use client";
import { RegisterEvent } from "@/lib/action";
import React, { useState } from "react";

type Props = {
  eventId: string;
  buttonText?: string;
  dict?: any;
  disabled?: boolean;
};

export default function EventRegisterCard({
  eventId,
  buttonText,
  dict,
  disabled = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    kurum: "",
    aracPlakasi: "",
  });

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      eventId,
      name: form.name,
      surname: form.surname,
      email: form.email,
      phone: form.phone,
      kurum: form.kurum,
      aracPlakasi: form.aracPlakasi,
    };
    try {
      const res = await RegisterEvent(data);

      closePopup();
    } catch (error) {
      // Hata yönetimi eklenebilir
    }
  };

  return (
    <>
      {/* Button that opens the popup */}
      <button
        onClick={disabled ? undefined : openPopup}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-md transition-all ${
          disabled
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-blue-800 text-white hover:bg-blue-950"
        }`}
      >
        {disabled
          ? dict?.eventRegister?.pastEvent || "Etkinlik Sona Erdi"
          : buttonText || dict?.eventRegister?.buttonText || "Etkinliğe Katıl"}
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          {/* Popup Content */}
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative z-50 shadow-xl">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-xl font-bold mb-4">
              {dict?.eventRegister?.formTitle || "Etkinlik Kaydı"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {dict?.eventRegister?.firstName || "Ad"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder={
                    dict?.eventRegister?.firstNamePlaceholder || "Adınız"
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {dict?.eventRegister?.lastName || "Soyad"}
                </label>
                <input
                  type="text"
                  name="surname"
                  value={form.surname}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder={
                    dict?.eventRegister?.lastNamePlaceholder || "Soyadınız"
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {dict?.eventRegister?.email || "E-posta"}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder={
                    dict?.eventRegister?.emailPlaceholder || "E-posta Adresiniz"
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {dict?.eventRegister?.phone || "Telefon"}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder={
                    dict?.eventRegister?.phonePlaceholder || "Telefon Numaranız"
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {dict?.eventRegister?.institution || "Kurum İsteğe Bağlı"}
                </label>
                <input
                  type="text"
                  name="kurum"
                  value={form.kurum}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder={
                    dict?.eventRegister?.institutionPlaceholder ||
                    "Kurumunuz (İsteğe bağlı)"
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {dict?.eventRegister?.licensePlate || "Araç Plakası"}
                </label>
                <input
                  type="text"
                  name="aracPlakasi"
                  value={form.aracPlakasi}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder={
                    dict?.eventRegister?.licensePlatePlaceholder ||
                    "Araç Plakası (isteğe bağlı)"
                  }
                />
              </div>

              <input type="hidden" value={eventId} />

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
                >
                  {dict?.eventRegister?.submitButton || "Kaydı Tamamla"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
