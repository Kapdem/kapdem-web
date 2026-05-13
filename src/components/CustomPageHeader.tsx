import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  onButtonClick?: () => void;
  buttonText?: string;
};

export default function CustomPageHeader({
  title,
  subtitle,
  className = "",
  onButtonClick,
  buttonText = "Daha Fazla Bilgi",
}: Props) {
  return (
    <div
      className={`relative w-full h-[35vh] min-h-[450px] flex items-center justify-center mt-20 overflow-hidden ${className}`}
    >
      {/* Modern Background with Subtle Patterns */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
          }}
        />

        {/* Subtle geometric elements */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-50 opacity-60 blur-sm" />
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-indigo-50 opacity-50 blur-sm" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rotate-45 bg-slate-50 opacity-40" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #334155 1px, transparent 1px),
              linear-gradient(180deg, #334155 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative w-full px-6 max-w-6xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Text */}
          <div className="flex-1 text-left">
            {/* Decorative line */}
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 rounded-full" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {subtitle && (
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Side - Button */}
          {/* Right Side - Button and Disclaimer */}
          <div className="flex-1 lg:flex-none lg:w-80 text-center lg:text-right">
            <button
              onClick={onButtonClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 mb-4 inline-block"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
