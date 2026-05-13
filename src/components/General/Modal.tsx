import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  lang: string;
  labels: Record<string, any>;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  lang,
  labels,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center pointer-events-none sm:bottom-4 pt-28 sm:right-4 sm:inset-auto sm:block">
      <div
        className="bg-white rounded-2xl shadow-xl p-0 w-[min(260px,calc(100vw-2rem))] sm:w-[300px] relative animate-slideUp overflow-hidden max-h-[70vh] sm:max-h-[90vh] overflow-y-auto border border-slate-200/60 pointer-events-auto"
        style={{ boxShadow: "0 12px 40px -8px rgba(15,23,42,0.18)" }}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100/80 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <span
              className="block w-2 h-2 rounded-full"
              style={{ background: "#6366f1" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#6366f1", letterSpacing: "0.15em" }}
            >
              {labels[lang].upcoming}
            </span>
          </div>
          <button
            className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all text-sm font-bold"
            onClick={onClose}
            aria-label={labels[lang].close}
          >
            ×
          </button>
        </div>
        <div className="px-4 py-3 items-center">{children}</div>
      </div>
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card-animate {
          animation: cardIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
};

export default Modal;
