import React from "react";

export default function ConsentModal({
  open,
  onClose,
  onApprove,
  title,
  children,
  dict,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
        <h2 className="text-xl font-semibold mb-4 text-[#013b73]">{title}</h2>
        <div className="text-gray-700 text-sm max-h-96 overflow-y-auto mb-6">
          {children}
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-lg"
          aria-label="Kapat"
        >
          ×
        </button>
        <button
          onClick={onApprove}
          className="w-full mt-2 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {dict.kvkkread}
        </button>
      </div>
    </div>
  );
}
