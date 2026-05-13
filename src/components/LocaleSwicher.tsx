"use client";

import { i18n } from "@/i18n-config";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

interface LocaleSwitcherProps {
  locale: string;
}

export default function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const currentPathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  const currentLocale = i18n.locales.includes(locale)
    ? locale
    : i18n.defaultLocale;

  const handleLocaleChange = (selectedLocale: string) => {
    if (selectedLocale === currentLocale || isAnimating) return;

    setIsAnimating(true);

    // Set cookie for NEXT_LOCALE
    document.cookie = `NEXT_LOCALE=${selectedLocale}; path=/; max-age=${
      30 * 24 * 60 * 60
    }; SameSite=lax`;

    // Simple path construction
    let newPath: string;
    const segments = currentPathname.split("/").filter(Boolean);
    const hasLocalePrefix =
      segments.length > 0 && i18n.locales.includes(segments[0]);

    if (selectedLocale === i18n.defaultLocale) {
      // Going to default locale (tr) - remove locale prefix
      if (hasLocalePrefix) {
        newPath = "/" + segments.slice(1).join("/");
        if (newPath === "/" || newPath === "") newPath = "/";
      } else {
        newPath = currentPathname;
      }
    } else {
      // Going to non-default locale (en) - add/replace locale prefix
      if (hasLocalePrefix) {
        segments[0] = selectedLocale;
        newPath = "/" + segments.join("/");
      } else {
        newPath = `/${selectedLocale}${
          currentPathname === "/" ? "" : currentPathname
        }`;
      }
    }

    // Smooth navigation with loading state
    setTimeout(() => {
      try {
        window.location.replace(newPath);
      } catch (error) {
        window.location.href = newPath;
      }
    }, 300);
  };

  const localeOptions = [
    {
      code: "tr",
      label: "TR",
      fullLabel: "Türkçe",
      flag: "/images/flags/tr.svg",
    },
    {
      code: "en",
      label: "EN",
      fullLabel: "English",
      flag: "/images/flags/en.svg",
    },
  ];

  return (
    <div className="relative group">
      {/* Modern Glass Effect Container */}
      <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/30 hover:shadow-xl hover:bg-white/15 hover:scale-105 transition-all duration-300 ease-out">
        {localeOptions.map((option, index) => {
          const isActive = option.code === currentLocale;
          return (
            <button
              key={option.code}
              onClick={() => handleLocaleChange(option.code)}
              disabled={isAnimating}
              className={`
                relative flex items-center gap-2  rounded-lg text-sm font-medium
                transition-all duration-300 ease-out min-w-[64px] justify-center
                transform hover:scale-105 active:scale-95
                ${
                  isActive
                    ? "text-white shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 ring-2 ring-blue-300/50"
                    : "text-gray-100 hover:text-white hover:bg-white/10 hover:shadow-md"
                }
                ${
                  isAnimating
                    ? "cursor-not-allowed opacity-50 animate-pulse"
                    : "cursor-pointer"
                }
                ${index === 0 ? "mr-1" : ""}
              `}
              aria-label={`Switch to ${option.fullLabel}`}
              title={option.fullLabel}
            >
              {/* Animated Background for Active State */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg animate-pulse-slow" />
              )}

              <div className="relative z-10 flex items-center gap-1.5">
                <Image
                  src={option.flag}
                  alt={option.fullLabel}
                  width={20} // istediğin boyuta göre güncelleyebilirsin
                  height={20}
                  className="object-contain"
                />
                <span className="font-semibold tracking-wide">
                  {option.label}
                </span>
              </div>

              {/* Hover Effect Ring */}
              {!isActive && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/0 to-indigo-400/0 group-hover/btn:from-blue-400/20 group-hover/btn:to-indigo-400/20 transition-all duration-300" />
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
