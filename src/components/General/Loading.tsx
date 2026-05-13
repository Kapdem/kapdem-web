import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "bars" | "pulse";
  text?: string;
  color?: "primary" | "secondary" | "accent" | "neutral" | "red";
  fullScreen?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const colorClasses = {
  primary: "text-blue-600 border-blue-600",
  secondary: "text-gray-600 border-gray-600",
  accent: "text-red-600 border-red-600",
  neutral: "text-slate-600 border-slate-600",
  red: "text-red-600 border-red-600",
};

const SpinnerLoader = ({ size, color }: { size: string; color: string }) => (
  <div
    className={`${size} border-4 border-t-transparent rounded-full animate-spin ${color}`}
    style={{ borderTopColor: "transparent" }}
  />
);

const DotsLoader = ({ size, color }: { size: string; color: string }) => {
  const dotSize = size.includes("6")
    ? "w-2 h-2"
    : size.includes("8")
    ? "w-3 h-3"
    : size.includes("12")
    ? "w-4 h-4"
    : "w-5 h-5";

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSize} ${color.split(" ")[0]} rounded-full animate-bounce`}
          style={{
            animationDelay: `${i * 0.1}s`,
            backgroundColor: "currentColor",
          }}
        />
      ))}
    </div>
  );
};

const BarsLoader = ({ size, color }: { size: string; color: string }) => {
  const barHeight = size.includes("6")
    ? "h-4"
    : size.includes("8")
    ? "h-6"
    : size.includes("12")
    ? "h-8"
    : "h-10";

  return (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-2 ${barHeight} ${color.split(" ")[0]} rounded-sm animate-bounce`}
          style={{
            animationDelay: `${i * 0.15}s`,
            backgroundColor: "currentColor",
          }}
        />
      ))}
    </div>
  );
};

const PulseLoader = ({ size, color }: { size: string; color: string }) => (
  <div className="relative">
    <div
      className={`${size} ${color.split(" ")[0]} rounded-full animate-ping opacity-75`}
      style={{ backgroundColor: "currentColor" }}
    />
    <div
      className={`absolute inset-0 ${size} ${color.split(" ")[0]} rounded-full animate-pulse`}
      style={{ backgroundColor: "currentColor" }}
    />
  </div>
);

export default function Loading({
  size = "md",
  variant = "spinner",
  text = "Yükleniyor...",
  color = "primary",
  fullScreen = false,
  className = "",
}: LoadingProps) {
  const sizeClass = sizeClasses[size];
  const colorClass = colorClasses[color];

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <DotsLoader size={sizeClass} color={colorClass} />;
      case "bars":
        return <BarsLoader size={sizeClass} color={colorClass} />;
      case "pulse":
        return <PulseLoader size={sizeClass} color={colorClass} />;
      default:
        return <SpinnerLoader size={sizeClass} color={colorClass} />;
    }
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center py-10";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="mb-4">{renderLoader()}</div>
      {text && (
        <div className={`text-sm font-medium ${colorClass.split(" ")[0]} animate-pulse`}>
          {text}
        </div>
      )}
    </div>
  );
}
