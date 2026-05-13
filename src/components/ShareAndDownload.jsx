"use client";
import { useState } from "react";
import LoginRequiredModal from "./LoginRequiredModal";
import { Copy } from "lucide-react";
import {
  FaLinkedin,
  FaXTwitter,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaBluesky,
  FaFilePdf,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

export default function ShareAndDownload({ blogPost, dict }) {
  const { auth } = useAuth();

  const [copied, setCopied] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalMessageType, setModalMessageType] = useState("login");

  const handlePdfDownload = async () => {
    if (!auth) {
      setModalMessageType("login");
      setShowLoginModal(true);
      return;
    }

    if (
      blogPost.accessTier === "PAID" &&
      blogPost.preview &&
      !blogPost.preview.hasAccess
    ) {
      setModalMessageType("access");
      setShowLoginModal(true);
      return;
    }

    const loadLogo = () =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d").drawImage(img, 0, 0);
          resolve({
            dataUrl: canvas.toDataURL("image/png"),
            aspectRatio: img.width / img.height,
          });
        };
        img.onerror = () => resolve(null);
        img.src = "/images/kapdem.jpeg";
      });

    const fetchFontAsBase64 = async (url, cacheKey) => {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) return cached;
      } catch (_) {}

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Font fetch failed: ${url} (${res.status})`);
      }
      const buf = await res.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let bin = "";
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
      }
      const base64 = btoa(bin);
      try {
        sessionStorage.setItem(cacheKey, base64);
      } catch (_) {}
      return base64;
    };

    const loadRegular = () =>
      fetchFontAsBase64(
        "/fonts/Roboto-Regular.ttf",
        "__kapdem_pdf_font_regular_v2",
      );

    const loadBold = () =>
      fetchFontAsBase64(
        "/fonts/Roboto-Bold.ttf",
        "__kapdem_pdf_font_bold_v2",
      );

    const { jsPDF } = await import("jspdf");

    const safeLoad = (fn) => fn().catch((err) => {
      console.warn("[PDF] Font yüklenemedi:", err);
      return null;
    });
    const [regularBase64, boldBase64, logoData] = await Promise.all([
      safeLoad(loadRegular),
      safeLoad(loadBold),
      loadLogo(),
    ]);

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      putOnlyUsedFonts: true,
    });

    let fontName = "helvetica";
    if (regularBase64) {
      pdf.addFileToVFS("Roboto-Regular.ttf", regularBase64);
      pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");
      fontName = "Roboto";
    }
    let hasBold = false;
    if (boldBase64 && fontName === "Roboto") {
      pdf.addFileToVFS("Roboto-Bold.ttf", boldBase64);
      pdf.addFont("Roboto-Bold.ttf", "Roboto", "bold");
      hasBold = true;
    }

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginX = 20;
    const marginTop = 22;
    const marginBottom = 26;
    const contentWidth = pageWidth - marginX * 2;
    const bodyFontSize = 11;
    const bodyLineHeight = 6.8;
    const paragraphGap = 4.5;
    const firstLineIndent = 6;

    let y = marginTop;

    const ensureSpace = (needed) => {
      if (y + needed > pageHeight - marginBottom) {
        pdf.addPage();
        y = marginTop;
      }
    };

    // Başlık
    const titleFontSize = 18;
    const titleLineHeight = 8.5;
    pdf.setFont(fontName, hasBold ? "bold" : "normal");
    pdf.setFontSize(titleFontSize);
    pdf.setTextColor(20, 20, 20);
    const titleLines = pdf.splitTextToSize(blogPost.title || "", contentWidth);
    titleLines.forEach((line) => {
      ensureSpace(titleLineHeight);
      pdf.text(line, marginX, y + 6.3);
      y += titleLineHeight;
    });

    // Başlık altı ince çizgi
    y += 3;
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(marginX, y, marginX + contentWidth, y);
    y += 6;

    // Gövde
    pdf.setFont(fontName, "normal");
    pdf.setFontSize(bodyFontSize);
    pdf.setTextColor(40, 40, 40);
    const content = blogPost.content?.text || "";
    const paragraphs = content.split("\n\n").filter((p) => p.trim());

    paragraphs.forEach((paragraph) => {
      const trimmed = paragraph.trim();
      const firstLine = pdf.splitTextToSize(
        trimmed,
        contentWidth - firstLineIndent,
      )[0];
      const restText = trimmed.substring(firstLine.length).trim();
      const restLines = restText
        ? pdf.splitTextToSize(restText, contentWidth)
        : [];
      const allLines = [
        { text: firstLine, x: marginX + firstLineIndent },
        ...restLines.map((t) => ({ text: t, x: marginX })),
      ];
      allLines.forEach((ln) => {
        ensureSpace(bodyLineHeight);
        pdf.text(ln.text, ln.x, y + 4.3);
        y += bodyLineHeight;
      });
      y += paragraphGap;
    });

    // Yazı linki kutusu
    const linkUrl = window.location.href;
    const linkLines = pdf.splitTextToSize(linkUrl, contentWidth - 10);
    const boxPadding = 5;
    const boxHeight = boxPadding * 2 + 5 + linkLines.length * 5;
    ensureSpace(boxHeight + 6);
    y += 6;
    pdf.setFillColor(248, 249, 250);
    pdf.rect(marginX, y, contentWidth, boxHeight, "F");
    pdf.setFillColor(0, 0, 0);
    pdf.rect(marginX, y, 1.2, boxHeight, "F");
    pdf.setFontSize(9);
    pdf.setTextColor(73, 80, 87);
    pdf.text("Yazı linki:", marginX + boxPadding, y + boxPadding + 3);
    pdf.setTextColor(0, 0, 0);
    linkLines.forEach((line, idx) => {
      pdf.text(
        line,
        marginX + boxPadding,
        y + boxPadding + 8 + idx * 5,
      );
    });
    y += boxHeight;

    // Her sayfaya footer
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFont(fontName, "normal");

      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Sayfa ${i} / ${totalPages}`, marginX, pageHeight - 8);

      pdf.setFontSize(7);
      pdf.setTextColor(120, 120, 120);
      const footerUrl = window.location.href;
      const footerUrlWidth = pdf.getTextWidth(footerUrl);
      pdf.text(
        footerUrl,
        (pageWidth - footerUrlWidth) / 2,
        pageHeight - 8,
      );

      if (logoData) {
        const maxW = 28;
        const maxH = 14;
        let lw, lh;
        if (logoData.aspectRatio > maxW / maxH) {
          lw = maxW;
          lh = maxW / logoData.aspectRatio;
        } else {
          lh = maxH;
          lw = maxH * logoData.aspectRatio;
        }
        pdf.addImage(
          logoData.dataUrl,
          "PNG",
          pageWidth - marginX - lw,
          pageHeight - lh - 4,
          lw,
          lh,
        );
      }
    }

    pdf.save(`${blogPost.title || "yazi"}.pdf`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-10">
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        messageType={modalMessageType}
      />
      <div className="bg-white rounded-lg p-4 border border-gray-200 items-center max-w-fit justify-start">
        <h3 className="text-md font-medium text-gray-600 mb-3">
          {dict?.shareAndDownload}
        </h3>
        <div className="flex flex-wrap justify-start items-center gap-2">
          {/* PDF İndir */}
          <button
            onClick={handlePdfDownload}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
            title="PDF olarak indir"
          >
            <FaFilePdf className="w-6 h-6" />
          </button>
          {/* X (Twitter) */}
          <button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  blogPost.title,
                )}&url=${encodeURIComponent(window.location.href)}`,
                "_blank",
              )
            }
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
            title="X'te paylaş"
          >
            <FaXTwitter className="w-6 h-6" />
          </button>
          {/* Instagram */}
          <button
            onClick={() =>
              window.open(
                `https://www.instagram.com/share?url=${encodeURIComponent(
                  window.location.href,
                )}`,
                "_blank",
              )
            }
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition-colors duration-200"
            title="Instagram'da paylaş"
          >
            <FaInstagram className="w-6 h-6" />
          </button>
          {/* BlueSky */}
          <button
            onClick={() =>
              window.open(
                `https://bsky.app/intent/compose?text=${encodeURIComponent(
                  blogPost.title + " " + window.location.href,
                )}`,
                "_blank",
              )
            }
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
            title="BlueSky'da paylaş"
          >
            <FaBluesky className="w-6 h-6" />
          </button>
          {/* LinkedIn */}
          <button
            onClick={() =>
              window.open(
                `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  window.location.href,
                )}&title=${encodeURIComponent(blogPost.title)}`,
                "_blank",
              )
            }
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-[#0077b5] hover:bg-blue-50 hover:text-[#005582] transition-colors duration-200"
            title="LinkedIn'de paylaş"
          >
            <FaLinkedin className="w-6 h-6" />
          </button>
          {/* Facebook */}
          <button
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href,
                )}`,
                "_blank",
              )
            }
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-[#1877f3] hover:bg-blue-50 hover:text-[#145db2] transition-colors duration-200"
            title="Facebook'ta paylaş"
          >
            <FaFacebookF className="w-6 h-6" />
          </button>
          {/* WhatsApp */}
          <button
            onClick={() =>
              window.open(
                `https://wa.me/?text=${encodeURIComponent(
                  blogPost.title + " " + window.location.href,
                )}`,
                "_blank",
              )
            }
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-[#25d366] hover:bg-green-50 hover:text-[#1da851] transition-colors duration-200"
            title={dict?.sharewp}
          >
            <FaWhatsapp className="w-6 h-6" />
          </button>
          {/* Mail */}
          <button
            onClick={() =>
              window.open(
                `mailto:?subject=${encodeURIComponent(
                  blogPost.title,
                )}&body=${encodeURIComponent(window.location.href)}`,
              )
            }
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 text-[#ea4335] hover:bg-red-50 hover:text-[#b72d1b] transition-colors duration-200"
            title={dict?.sharemail}
          >
            <MdEmail className="w-6 h-6" />
          </button>
          {/* Kopyala */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 4000);
            }}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 ${
              copied
                ? "bg-green-100 text-green-700"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
            title={dict.sharelink}
          >
            <Copy className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
