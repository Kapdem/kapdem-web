"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { subscribeNewsletter } from "../lib/action";

export default function NewsLetter({ dict }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
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
    <div className="relative isolate overflow-hidden bg-gray-900 mx-auto py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto  max-w-7xl  gap-x-8 gap-y-16 lg:max-w-none flex justify-center ">
          <div className="max-w-7xl lg:max-w-7xl mx-auto">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              {dict.subscribeNewsletter}
            </h2>
            <p className="mt-4 text-lg text-gray-300">{dict.dontspam}</p>
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex max-w-md gap-x-4"
            >
              <label htmlFor="email-address" className="sr-only">
                E-posta adresi
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={`${dict.writeMail}`}
                autoComplete="email"
                disabled={isSubmitting}
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="flex-none rounded-md bg-[#b61f24] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#b61f24] transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {dict.subscribe || "Abone Olunuyor..."}
                  </div>
                ) : (
                  dict.subscribe
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#b61f24] to-[#b61f24] opacity-30"
        />
      </div>
    </div>
  );
}
