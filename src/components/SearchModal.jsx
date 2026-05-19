"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";
import { FaSort } from "react-icons/fa";
import SearchResultItem from "./SearchResultItem";

const categoryNameMap = {
  "kamu politikaları": "kamu-politikalari",
  "kamu politikasi": "kamu-politikalari",
  kamu: "kamu-politikalari",
  "görüş yazıları": "gorus-yazilari",
  "görüş yazisi": "gorus-yazilari",
  görüş: "gorus-yazilari",
  "yönetim tasarımı": "yonetim-tasarimi",
  "yonetim tasarimi": "yonetim-tasarimi",
  yönetim: "yonetim-tasarimi",
  "küresel politika": "kuresel-politika-ve-uluslararasi-iliskiler",
  "kuresel politika": "kuresel-politika-ve-uluslararasi-iliskiler",
  "uluslararası ilişkiler": "kuresel-politika-ve-uluslararasi-iliskiler",
  "uluslararasi iliskiler": "kuresel-politika-ve-uluslararasi-iliskiler",
  uluslararası: "kuresel-politika-ve-uluslararasi-iliskiler",
  uluslararasi: "kuresel-politika-ve-uluslararasi-iliskiler",
  küresel: "kuresel-politika-ve-uluslararasi-iliskiler",
  "ekonomi kalkınma": "ekonomi-ve-kalkinma",
  "ekonomi kalkinma": "ekonomi-ve-kalkinma",
  "ekonomi ve kalkınma": "ekonomi-ve-kalkinma",
  ekonomi: "ekonomi-ve-kalkinma",
  kalkınma: "ekonomi-ve-kalkinma",
  "teknoloji inovasyon": "teknoloji-ve-inovasyon",
  "teknoloji ve inovasyon": "teknoloji-ve-inovasyon",
  teknoloji: "teknoloji-ve-inovasyon",
  inovasyon: "teknoloji-ve-inovasyon",
  göç: "goc",
  goc: "goc",
  "savunma güvenlik": "savunma-ve-guvenlik",
  "savunma guvenlik": "savunma-ve-guvenlik",
  savunma: "savunma-ve-guvenlik",
  güvenlik: "savunma-ve-guvenlik",
  kultur: "kultur-ve-sanat",
  "kültür sanat": "kultur-ve-sanat",
  "kultur sanat": "kultur-ve-sanat",
};

const categories = [
  { value: "", label: { tr: "Tüm Kategoriler", en: "All Categories" } },
  {
    value: "kamu-politikalari",
    label: { tr: "Kamu Politikaları", en: "Public Policy" },
  },
  {
    value: "gorus-yazilari",
    label: { tr: "Görüş Yazıları", en: "Opinion Articles" },
  },
  {
    value: "yonetim-tasarimi",
    label: { tr: "Yönetim Tasarımı", en: "Management Design" },
  },
  {
    value: "kuresel-politika-ve-uluslararasi-iliskiler",
    label: { tr: "Küresel Politika", en: "Global Politics" },
  },
  {
    value: "ekonomi-ve-kalkinma",
    label: { tr: "Ekonomi ve Kalkınma", en: "Economy & Development" },
  },
  {
    value: "teknoloji-ve-inovasyon",
    label: { tr: "Teknoloji ve İnovasyon", en: "Technology & Innovation" },
  },
  { value: "goc", label: { tr: "Göç", en: "Migration" } },
  {
    value: "savunma-ve-guvenlik",
    label: { tr: "Savunma ve Güvenlik", en: "Defense & Security" },
  },
  {
    value: "kultur-ve-sanat",
    label: { tr: "Kültür ve Sanat", en: "Culture & Arts" },
  },
  { value: "roportajlar", label: { tr: "Röportajlar", en: "Interviews" } },
  {
    value: "editorun-sectikleri",
    label: { tr: "Editörün Seçtikleri", en: "Editor's Picks" },
  },
];

const SearchModal = ({ isOpen, onClose, dict, lang }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState("relevance"); // "date" | "relevance"
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const inputRef = useRef(null);

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Perform search
  useEffect(() => {
    if (!isOpen || debouncedQuery.length < 2) {
      setSearchResults(null);
      return;
    }
    performSearch(debouncedQuery, sortType, selectedCategory);
  }, [debouncedQuery, sortType, selectedCategory, isOpen]);

  // Lock body scroll & focus input
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
      setSearchQuery("");
      setSearchResults(null);
      setSelectedCategory("");
      setShowCategoryFilter(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const performSearch = async (query, sort, category) => {
    setIsLoading(true);
    try {
      let url = `/api/search?q=${encodeURIComponent(
        query
      )}&lang=${lang}&sort=${sort}`;
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults({
        posts: [],
        authors: [],
        teamMembers: [],
        totalCount: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults(null);
    setSelectedCategory("");
    setShowCategoryFilter(false);
    onClose();
  };

  const handleSortToggle = () => {
    setSortType((prev) => (prev === "date" ? "relevance" : "date"));
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults(null);
    inputRef.current?.focus();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowCategoryFilter(false);
  };

  const detectedCategory = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase().trim();
    if (!lowerQuery) return null;

    if (categoryNameMap[lowerQuery]) return categoryNameMap[lowerQuery];

    for (const [key, value] of Object.entries(categoryNameMap)) {
      if (lowerQuery.includes(key)) {
        return value;
      }
      const keyWords = key.split(" ");
      if (keyWords.every((word) => lowerQuery.includes(word))) {
        return value;
      }
    }
    return null;
  }, [searchQuery]);

  const combinedResults = useMemo(() => {
    if (!searchResults) return [];
    const results = [];


    // Kategori filtresi aktifse sadece post'ları ekle ve filtrele
    if (selectedCategory) {
      searchResults.posts?.forEach((post) => {
        if (post.category === selectedCategory) {
          results.push({
            id: post._id,
            type: "post",
            title: post.title,
            excerpt: post.excerpt,
            coverImage: post.coverImage,
            date: post.publishedAt,
            score: post.score ?? 0,
            slug: post.slug,
            category: post.category,
            author: post.author,
          });
        }
      });
    } else {
      // Kategori filtresi yoksa tüm sonuçları ekle
      searchResults.posts?.forEach((post) =>
        results.push({
          id: post._id,
          type: "post",
          title: post.title,
          excerpt: post.excerpt,
          coverImage: post.coverImage,
          date: post.publishedAt,
          score: post.score ?? 0,
          slug: post.slug,
          category: post.category,
          author: post.author,
        })
      );

      searchResults.authors?.forEach((author) =>
        results.push({
          id: author._id,
          type: "author",
          title: `${author.firstName} ${author.lastName}`,
          excerpt: author.title || author.profession || "",
          coverImage: author.profilePicture,
          date: null,
          score: author.score ?? 0,
          slug: author.username,
          author,
        })
      );

      searchResults.teamMembers?.forEach((member) =>
        results.push({
          id: member._id,
          type: "teamMember",
          title: `${member.firstName} ${member.lastName}`,
          excerpt: member.about || "",
          coverImage: member.photo,
          date: null,
          score: member.score ?? 0,
          slug: member.slug,
          author: {
            firstName: member.firstName,
            lastName: member.lastName,
            username: member.slug,
          },
        })
      );
    }

    const sortByDate = () =>
      results.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
      });
    const sortByScore = () =>
      results.sort((a, b) => {
        const scoreA =
          (a.score || 0) +
          ((detectedCategory || selectedCategory) &&
            a.type === "post" &&
            a.category === (selectedCategory || detectedCategory)
            ? 100
            : 0);
        const scoreB =
          (b.score || 0) +
          ((detectedCategory || selectedCategory) &&
            b.type === "post" &&
            b.category === (selectedCategory || detectedCategory)
            ? 100
            : 0);
        return scoreB - scoreA;
      });

    const sorted = sortType === "date" ? sortByDate() : sortByScore();

    // Yazarlar her zaman en üstte (kategori filtresi yokken)
    if (!selectedCategory) {
      const authorsList = sorted.filter((item) => item.type === "author");
      const rest = sorted.filter((item) => item.type !== "author");

      // Kategori bazlı önceliklendirme - sadece postlar arasında
      if (detectedCategory) {
        const prioritized = [];
        const others = [];
        rest.forEach((item) => {
          if (item.type === "post" && item.category === detectedCategory) {
            prioritized.push(item);
          } else {
            others.push(item);
          }
        });
        return [...authorsList, ...prioritized, ...others];
      }

      return [...authorsList, ...rest];
    }

    return sorted;
  }, [searchResults, sortType, detectedCategory, selectedCategory]);

  if (!isOpen) return null;

  const renderEmptyState = (message) => (
    <div className="text-center py-12 text-gray-500">
      <FiSearch className="w-12 h-12 mx-auto mb-4 text-gray-300" />
      <p>{message}</p>
    </div>
  );

  const getCategoryLabel = (value) => {
    if (!value) return "";
    const found = categories.find((c) => c.value === value);
    if (found) return found.label[lang] || found.label.tr;
    return value.replace(/-/g, " ");
  };

  const selectedCategoryLabel =
    categories.find((c) => c.value === selectedCategory)?.label[lang] ||
    (lang === "tr" ? "Tüm Kategoriler" : "All Categories");

  return (
    <div className="fixed inset-0 z-[9999]">
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 overflow-visible">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex-1 overflow-visible">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  {lang === "tr"
                    ? `Sıralama: ${sortType === "date" ? "Tarih" : "Alaka düzeyi"
                    }`
                    : `Sort by: ${sortType === "date" ? "Date" : "Relevance"}`}
                </p>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl bg-gray-50 px-3">
                  <button
                    onClick={handleSortToggle}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title={
                      sortType === "date"
                        ? lang === "tr"
                          ? "Alaka düzeyine göre sırala"
                          : "Sort by relevance"
                        : lang === "tr"
                          ? "Tarihe göre sırala"
                          : "Sort by date"
                    }
                  >
                    <FaSort className="w-5 h-5" />
                  </button>
                  <div className="flex items-center flex-1">
                    <FiSearch className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        dict?.search?.placeholder ||
                        (lang === "tr"
                          ? "Yazı, yazar veya kategori ara..."
                          : "Search articles, authors or categories...")
                      }
                      className="w-full bg-transparent py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>

                  {/* Category Filter Button Inside Input */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                      className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                      title={
                        lang === "tr"
                          ? "Kategori filtrele"
                          : "Filter by category"
                      }
                    >
                      <FiFilter
                        className={`w-4 h-4 ${selectedCategory ? "text-blue-600" : ""
                          }`}
                      />
                      {selectedCategory && (
                        <span className="text-blue-600">●</span>
                      )}
                    </button>

                    {/* Category Dropdown */}
                    {showCategoryFilter && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-[9999] max-h-80 overflow-y-auto">
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            onClick={() => handleCategoryChange(category.value)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === category.value
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-700"
                              }`}
                          >
                            {category.label[lang]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {searchQuery && (
                    <button
                      onClick={handleClear}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <FiX className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 rounded-b-2xl">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
              </div>
            )}

            {!isLoading &&
              searchQuery.trim().length < 2 &&
              renderEmptyState(
                dict?.search?.hint ||
                (lang === "tr"
                  ? "En az 2 karakter girin..."
                  : "Enter at least 2 characters...")
              )}

            {!isLoading &&
              searchResults &&
              searchResults.totalCount === 0 &&
              searchQuery.trim().length >= 2 &&
              !selectedCategory &&
              renderEmptyState(
                dict?.search?.noResults ||
                (lang === "tr" ? "Sonuç bulunamadı" : "No results found")
              )}

            {!isLoading &&
              searchResults &&
              combinedResults.length === 0 &&
              searchQuery.trim().length >= 2 &&
              selectedCategory &&
              renderEmptyState(
                lang === "tr"
                  ? `${selectedCategoryLabel} kategorisinde içerik bulunamadı`
                  : `No content found in ${selectedCategoryLabel} category`
              )}

            {!isLoading &&
              combinedResults.length > 0 &&
              combinedResults.map((result, index) => (
                <SearchResultItem
                  key={`${result.type}-${result.id}-${index}`}
                  id={result.id}
                  title={result.title}
                  excerpt={result.excerpt}
                  coverImage={result.coverImage}
                  date={result.date}
                  score={result.score}
                  type={result.type}
                  lang={lang}
                  sortType={sortType}
                  searchTerm={searchQuery}
                  slug={result.slug}
                  category={getCategoryLabel(result.category)}
                  author={result.author}
                  onClick={handleClose}
                />
              ))}
          </div>

          {/* Tips */}
          {!searchQuery && !selectedCategory && (
            <div className="px-6 pb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">
                    {dict?.search?.tip || (lang === "tr" ? "İpucu:" : "Tip:")}
                  </span>{" "}
                  {dict?.search?.tipText ||
                    (lang === "tr"
                      ? "Yazı başlığı, içerik, yazar adı ile arama yapabilir veya kategori filtreleyebilirsiniz."
                      : "You can search by article title, content, author name or filter by category.")}
                </p>
              </div>
            </div>
          )}

          {/* Active Filter Badge */}
          {selectedCategory && (
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {lang === "tr" ? "Aktif Filtre:" : "Active Filter:"}
                </span>
                <button
                  onClick={() => setSelectedCategory("")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors"
                >
                  <span>{selectedCategoryLabel}</span>
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
