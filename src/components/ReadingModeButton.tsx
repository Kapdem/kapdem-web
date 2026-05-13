"use client";

import { ScanEye } from "lucide-react";

interface ReadingModeButtonProps {
  slug: string;
  label: string;
  className?: string;
}

export default function ReadingModeButton({
  slug,
  label,
  className = "w-full px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow font-semibold transition flex items-center justify-center gap-2",
}: ReadingModeButtonProps) {
  return (
    <button
      onClick={() => window.open(`${slug}/okuma-modu`, "_blank")}
      className={className}
    >
      <ScanEye className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}
