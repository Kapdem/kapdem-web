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

    const escapeHtml = (s) =>
      String(s || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const sanitizeFilename = (s) =>
      String(s || "yazi")
        .replace(/[\/\\?%*:|"<>]/g, "-")
        .slice(0, 80) || "yazi";

    // İçerik HTML'i hazırla — site ile aynı URL düzeltmesi
    const rawContent =
      (typeof blogPost.content === "object"
        ? blogPost.content?.html
        : blogPost.content) || "";
    const contentHtml = rawContent.replace(
      /https?:\/\/(www\.)?kapdem\.org\/wp-content\/uploads\//g,
      "https://kapdem-org.s3.eu-north-1.amazonaws.com/wp-content/uploads/",
    );

    const formattedDate = blogPost.formattedDate || blogPost.date || "";
    const author = blogPost.author || {};
    const authorName = `${author.firstName || ""} ${
      author.lastName || ""
    }`.trim();

    const coverImage = blogPost.coverImage || "";

    // PDF üretimi sırasında kullanıcıya overlay göster
    const overlay = document.createElement("div");
    overlay.id = "__kapdem-pdf-overlay";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #002c54;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 20px;
      color: #ffffff;
      font-family: system-ui, -apple-system, sans-serif;
    `;
    overlay.innerHTML = `
      <div style="width:56px;height:56px;border:4px solid rgba(255,255,255,0.2);border-top-color:#ffffff;border-radius:50%;animation:kapdem-spin 0.8s linear infinite;"></div>
      <div style="font-size:16px;font-weight:600;letter-spacing:0.5px;">PDF İndiriliyor...</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.7);">Lütfen bekleyin</div>
      <style>@keyframes kapdem-spin{to{transform:rotate(360deg);}}</style>
    `;
    document.body.appendChild(overlay);

    // PDF için render container'ı oluştur.
    // position: absolute (fixed değil) — html2canvas tam içerik yüksekliğini yakalayabilsin.
    // Overlay tarafından gizleniyor.
    const container = document.createElement("div");
    container.id = "__kapdem-pdf-container";
    container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 794px;
      padding: 40px 48px;
      box-sizing: border-box;
      background: #ffffff;
      color: #1a1a1a;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.75;
      text-rendering: optimizeSpeed;
      z-index: 2147483645;
    `;

    container.innerHTML = `
      ${
        coverImage
          ? `<div style="margin-bottom:24px;overflow:hidden;border-radius:8px;">
              <img src="${escapeHtml(coverImage)}"
                   crossorigin="anonymous"
                   style="width:100%;max-height:380px;object-fit:cover;display:block;" />
            </div>`
          : ""
      }
      <h1 style="font-size:26px;font-weight:700;line-height:1.3;color:#002c54;margin:0 0 12px 0;letter-spacing:-0.01em;">
        ${escapeHtml(blogPost.title || "")}
      </h1>
      <div style="font-size:12px;color:#6b7280;margin:0 0 24px 0;padding-bottom:14px;border-bottom:1px solid #e5e7eb;">
        ${authorName ? `<strong style="color:#374151;">${escapeHtml(authorName)}</strong>` : ""}
        ${authorName && formattedDate ? '<span style="margin:0 8px;">·</span>' : ""}
        ${formattedDate ? `<span>${escapeHtml(formattedDate)}</span>` : ""}
      </div>
      <div class="ck-content" style="font-size:14px;line-height:1.75;color:#1f2937;word-wrap:break-word;">
        ${contentHtml}
      </div>
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:11px;color:#6b7280;line-height:1.5;">
        <strong style="color:#374151;">Yazı linki:</strong>
        <span style="word-break:break-all;">${escapeHtml(window.location.href)}</span>
      </div>
    `;

    document.body.appendChild(container);

    // Container içindeki tüm görsellere stil ver
    container.querySelectorAll("img").forEach((img) => {
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.display = "block";
      img.style.margin = "16px auto";
      img.style.borderRadius = "6px";
    });

    // Görselleri base64 data URL'e çevir (CORS sorunlarını atlatmak için).
    // Cross-origin URL'ler same-origin proxy üzerinden geçiriliyor.
    const imageToDataUrl = async (url) => {
      try {
        let fetchUrl = url;
        if (/^https?:\/\//i.test(url)) {
          try {
            const u = new URL(url);
            if (u.origin !== window.location.origin) {
              fetchUrl = `/api/image/proxy?url=${encodeURIComponent(url)}`;
            }
          } catch {}
        }
        const res = await fetch(fetchUrl);
        if (!res.ok) return null;
        const blob = await res.blob();
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        return null;
      }
    };

    await Promise.all(
      Array.from(container.querySelectorAll("img")).map(async (img) => {
        const src = img.getAttribute("src") || "";
        if (!src || src.startsWith("data:")) return;
        const dataUrl = await imageToDataUrl(src);
        if (dataUrl) {
          img.removeAttribute("crossorigin");
          img.src = dataUrl;
        } else {
          // Yüklenemeyen görseli kaldır (boş yer bırakma)
          img.remove();
        }
      }),
    );

    // Layout'un tam oluşması için bir frame bekle
    await new Promise((r) => requestAnimationFrame(() => r()));
    await new Promise((r) => requestAnimationFrame(() => r()));

    const originalScrollY = window.scrollY;
    window.scrollTo({ top: 0, behavior: "instant" });

    try {
      const [jsPDFMod, html2canvasMod] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);
      const JsPDF = jsPDFMod.jsPDF || jsPDFMod.default;
      const html2canvas = html2canvasMod.default || html2canvasMod;

      // 1. Container'ı canvas'a render et
      const canvas = await html2canvas(container, {
        scale: 1.8,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: container.offsetWidth,
        windowHeight: container.scrollHeight,
      });

      const pdf = new JsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const marginX = 10;
      const marginY = 10;
      const usableWidth = pageWidth - marginX * 2;
      const usableHeight = pageHeight - marginY * 2;

      // px → mm dönüşüm oranı
      const pxToMm = usableWidth / canvas.width;
      const sliceHeightPx = Math.floor(usableHeight / pxToMm);

      // 2. Akıllı sayfa kesimi: kesim noktasını beyaz boşluğa kaydır.
      // Tek seferde tüm canvas ImageData'sını al — getImageData her seferinde
      // yeniden çağırmak yerine hız için.
      const ctx = canvas.getContext("2d");
      const fullData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const w = canvas.width;
      const sampleStepX = 16; // her 16 pikselde bir kontrol (hız için)

      const isRowWhite = (y) => {
        const rowStart = y * w * 4;
        for (let x = 0; x < w; x += sampleStepX) {
          const i = rowStart + x * 4;
          if (
            fullData[i] < 245 ||
            fullData[i + 1] < 245 ||
            fullData[i + 2] < 245
          ) {
            return false;
          }
        }
        return true;
      };

      const findWhitespaceRow = (targetY) => {
        // ±40 piksellik bir pencerede beyaz satır ara, üstten başla
        const searchRange = 40;
        const startY = Math.max(0, targetY - searchRange);
        for (let y = targetY; y >= startY; y -= 2) {
          if (isRowWhite(y)) return y;
        }
        return targetY;
      };

      // 3. Sayfa sayfa ekle, kesim noktalarını ayarla
      let currentY = 0;
      let isFirstPage = true;

      while (currentY < canvas.height) {
        let nextY = Math.min(currentY + sliceHeightPx, canvas.height);

        // Son sayfa değilse beyaz boşluğa kaydır
        if (nextY < canvas.height) {
          nextY = findWhitespaceRow(nextY);
        }

        const sliceHeight = nextY - currentY;
        if (sliceHeight <= 0) break;

        // Kesilen parçayı geçici canvas'a kopyala
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceHeight;
        const sliceCtx = sliceCanvas.getContext("2d");
        sliceCtx.fillStyle = "#ffffff";
        sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        sliceCtx.drawImage(
          canvas,
          0,
          currentY,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight,
        );

        const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.95);
        const sliceMmHeight = sliceHeight * pxToMm;

        if (!isFirstPage) pdf.addPage();
        pdf.addImage(
          sliceData,
          "JPEG",
          marginX,
          marginY,
          usableWidth,
          sliceMmHeight,
        );

        currentY = nextY;
        isFirstPage = false;
      }

      pdf.save(`${sanitizeFilename(blogPost.title)}.pdf`);
    } catch (err) {
      console.error("[PDF] Üretim hatası:", err);
      alert("PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      window.scrollTo({ top: originalScrollY, behavior: "instant" });
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }
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
