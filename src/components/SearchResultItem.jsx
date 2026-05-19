"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import "@/utils/ckeditor.css";
import "@/utils/revert.css";

const highlightTerm = (text, term) => {
  if (!text || !term) return text;
  const regex = new RegExp(`(${term})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

const truncateContent = (content, searchTerm) => {
  if (!content) return "";

  // HTML tag'lerini temizle
  const textContent = content.replace(/<[^>]*>/g, "");

  if (searchTerm) {
    const indexOfTerm = textContent
      .toLowerCase()
      .indexOf(searchTerm.toLowerCase());
    if (indexOfTerm !== -1) {
      const startIndex = Math.max(0, indexOfTerm - 40);
      const endIndex = Math.min(textContent.length, indexOfTerm + 40);
      const truncated = textContent.substring(startIndex, endIndex);
      return highlightTerm(truncated, searchTerm);
    }
  }

  const words = textContent.split(" ");
  return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : textContent;
};

export default function SearchResultItem({
  id,
  title,
  excerpt,
  coverImage,
  date,
  score,
  type,
  lang,
  sortType,
  searchTerm,
  slug,
  category,
  author,
  onClick,
}) {
  const truncatedContent = useMemo(
    () => truncateContent(excerpt || "", searchTerm),
    [excerpt, searchTerm],
  );
  const truncatedContentWithDots = `...${truncatedContent}...`;

  const highlightedTitle = useMemo(
    () => highlightTerm(title || "", searchTerm),
    [title, searchTerm],
  );

  const getHref = () => {
    if (type === "post") {
      return `/${lang}/${slug || id}`;
    } else if (type === "author") {
      return `/${lang}/member/${author?.username || id}`;
    } else if (type === "teamMember") {
      return `/${lang}/ana-kadro/${slug || id}`;
    }
    return "#";
  };
  const getImageSrc = () => {
    const baseUrl = process.env.NEXT_PUBLIC_S3_URL; // sadece bunu kullan

    if (coverImage) {
      // Eğer coverImage zaten bir http linkiyse direkt dön
      if (coverImage.startsWith("http")) {
        return coverImage;
      }

      // S3 URL + dosya yolu
      return `${baseUrl}${coverImage}`;
    }

    return null;
  };

  return (
    <Link
      href={getHref()}
      onClick={onClick}
      className="flex py-4 sm:py-5 border-b border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {getImageSrc() && (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 mr-3 sm:mr-4">
          <Image
            src={getImageSrc()}
            alt={title || "Cover Image"}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
          <p
            className="ck-content text-sm sm:text-[15px] font-semibold mb-1 flex-1 min-w-0 break-words"
            dangerouslySetInnerHTML={{ __html: highlightedTitle }}
          />
          {category && (
            <span className="self-start px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs flex-shrink-0 max-w-full sm:max-w-[45%] truncate">
              {category}
            </span>
          )}
        </div>
        {truncatedContent && (
          <p
            className="ck-content text-xs text-gray-600 mb-2"
            dangerouslySetInnerHTML={{ __html: truncatedContentWithDots }}
          />
        )}
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500">
            {date && (
              <span className="font-medium">
                {format(new Date(date), "dd/MM/yyyy")}
              </span>
            )}
            {author && (
              <span>
                {author.firstName} {author.lastName}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
