"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { subscribeNewsletter } from "../lib/action";

type Props = {
  dict: any;
};

export default function FooterMailSubscription({ dict }: Props) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error(
        dict?.toast?.newsletter?.emailRequired ||
          "Lütfen e-posta adresinizi girin"
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(
        dict?.toast?.newsletter?.emailInvalid ||
          "Lütfen geçerli bir e-posta adresi girin"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await subscribeNewsletter(email.trim().toLowerCase());

      if (result && result.success !== false) {
        toast.success(
          dict?.toast?.newsletter?.success || "Bültene başarıyla abone oldunuz!"
        );
        setEmail(""); // Clear the input
      } else {
        // Backend mesajı yerine dict mesajını öncelikli kullan
        toast.error(
          dict?.toast?.newsletter?.error ||
            result?.message ||
            "Abonelik sırasında bir hata oluştu"
        );
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error(
        dict?.toast?.newsletter?.connectionError ||
          "Bağlantı hatası. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-zinc-900 rounded-xl shadow-lg px-6 py-8 flex flex-col items-center gap-4">
      <Image
        width={112}
        height={32}
        src="/images/kapdem-logo-2.png"
        alt="KAPDEM Logo"
        className="w-28 h-auto mb-2 rounded"
      />
      <p className="text-gray-200 text-center text-sm md:text-base">
        {dict?.footer?.mailtext}
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col sm:flex-row gap-3 mt-2"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder={dict?.footer?.email}
          disabled={isSubmitting}
          className="flex-1 rounded-md px-3 py-2 bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#b61f24] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="rounded-md bg-[#b61f24] px-5 py-2 text-white font-semibold hover:bg-[#a11b1f] transition-colors shadow btn-gradient text-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#b61f24]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden sm:inline">Gönderiliyor...</span>
            </div>
          ) : (
            dict?.footer?.subscribe
          )}
        </button>
      </form>
    </div>
  );
}
