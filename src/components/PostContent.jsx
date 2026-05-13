"use client";
import "@/utils/ckeditor.css";
import "@/utils/revert.css";

import React from "react";

const PREVIEW_LENGTH = 300;
const YOUTUBE_REGEX = /(?:v=|youtu.be\/|embed\/)([\w-]{11})/;

const PROSE_CLASSES = [].join(" ");

const createEmbedIframe = (src, isYouTube = false) => {
  const baseStyle = "border-radius:12px;width:100%;height:400px;border:0;";
  const shadowStyle = "box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);";
  const allow = isYouTube
    ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    : "";

  return `<iframe 
    style='${baseStyle}${shadowStyle}' 
    src='${src}' 
    ${allow ? `allow='${allow}'` : ""}
    allowfullscreen 
    loading='lazy'
  ></iframe>`;
};

const extractYouTubeId = (url) => {
  const match = url.match(YOUTUBE_REGEX);
  return match ? match[1] : null;
};

const getContentFromObject = (content) => {
  let html = null;
  if (typeof content === "object" && content?.html) {
    html = content.html;
  } else if (typeof content === "string") {
    html = content;
  }
  if (!html) return null;
  // kapdem.org/wp-content/uploads/ ile başlayan tüm varyasyonları S3 linkine çevir
  return html.replace(
    /https?:\/\/(www\.)?kapdem\.org\/wp-content\/uploads\//g,
    "https://kapdem-org.s3.eu-north-1.amazonaws.com/wp-content/uploads/"
  );
};

const truncateContent = (content, length = PREVIEW_LENGTH) => {
  if (!content) return null;

  const text = typeof content === "string" ? content : content.html;
  if (text.length <= length) return text;

  return text.substring(0, length).trim() + "...";
};

export default function PostContent({
  postData,
  className = "",
  tag = "article",
}) {
  const getDisplayContent = () => {
    const isRestricted =
      postData.accessTier === "PAID" &&
      postData.preview &&
      !postData.preview.hasAccess;

    if (isRestricted) {
      const preview = getContentFromObject(postData.preview.previewContent);
      if (preview) return preview;

      const truncated = truncateContent(postData.content);
      if (truncated) return truncated;

      return "<p class='text-gray-500 italic'>Önizleme içeriği mevcut değil</p>";
    }

    // Normal içerik
    const content = getContentFromObject(postData.content);
    if (content) return content;

    // Link bazlı içerik
    if (postData.link) {
      const ytId = extractYouTubeId(postData.link);

      if (ytId) {
        return createEmbedIframe(`https://www.youtube.com/embed/${ytId}`, true);
      }

      return createEmbedIframe(postData.link);
    }

    return "<p class='text-gray-500 italic'>İçerik mevcut değil</p>";
  };

  const Tag = tag;
  const content = getDisplayContent();
  const combinedClasses = `${PROSE_CLASSES} ck-content ${className}`.trim();

  return (
    <Tag
      className={combinedClasses}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
