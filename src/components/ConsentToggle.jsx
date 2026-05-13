import React from "react";

export default function ConsentToggle({
  label,
  checked,
  onChange,
  required = false,
  onShowModal,
}) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <button
        type="button"
        className={`w-10 h-6 flex items-center rounded-full border transition ${
          checked
            ? "bg-blue-600 border-blue-600"
            : "bg-gray-200 border-gray-300"
        }`}
        onClick={() => {
          if (required && !checked && onShowModal) {
            onShowModal();
          } else {
            onChange(!checked);
          }
        }}
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
      <span className="text-sm text-white">
        {label}
        {required ? <span className="text-red-500 ml-1">*</span> : null}
      </span>
    </div>
  );
}
