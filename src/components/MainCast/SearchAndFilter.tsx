import React from "react";

type Props = {
  readonly roles: any;
  readonly searchTerm: any;
  readonly setSearchTerm: any;
  readonly filterRole: any;
  readonly setFilterRole: any;
  readonly clearFilters: any;
  readonly filteredMembers: any;
  readonly dict: any;
};

export default function SearchAndFilter({
  roles,
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole,
  clearFilters,
  filteredMembers,
  dict,
}: Props) {
  return (
    <div className="mb-8 sm:mb-12 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={
              dict?.searchAndFilter?.searchPlaceholder ||
              "İsim veya pozisyon ara..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 sm:px-6 py-2 sm:py-4 pr-14 sm:pr-20 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#002C54]/20 focus:border-[#002C54] transition-all outline-none text-base sm:text-lg"
          />
          <div className="absolute right-8 sm:right-12 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={
                dict?.searchAndFilter?.clearSearchLabel || "Aramayı temizle"
              }
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex gap-1 sm:gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 sm:px-6 py-2 sm:py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#002C54]/20 focus:border-[#002C54] transition-all outline-none text-base sm:text-lg bg-white"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role === "all"
                  ? dict?.searchAndFilter?.allPositions || "Tüm Pozisyonlar"
                  : role}
              </option>
            ))}
          </select>
          {(searchTerm || filterRole !== "all") && (
            <button
              onClick={clearFilters}
              className="px-4 sm:px-6 py-2 sm:py-4 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-200 transition-all text-gray-600 hover:text-gray-800 font-medium"
              aria-label={
                dict?.searchAndFilter?.clearFiltersLabel ||
                "Tüm filtreleri temizle"
              }
            >
              {dict?.searchAndFilter?.clearButton || "Temizle"}
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Section */}
      {(searchTerm || filterRole !== "all") && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-4 w-full">
          <span className="text-xs sm:text-sm text-gray-600 font-medium">
            {dict?.searchAndFilter?.activeFilters || "Aktif Filtreler:"}
          </span>
          {searchTerm && (
            <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#002C54]/10 text-[#002C54] rounded-full text-xs sm:text-sm">
              <span>
                {dict?.searchAndFilter?.searchLabel || "Arama:"} &ldquo;
                {searchTerm}&rdquo;
              </span>
              <button
                onClick={() => setSearchTerm("")}
                className="hover:bg-[#002C54]/20 rounded-full p-1 transition-colors"
                aria-label={
                  dict?.searchAndFilter?.removeSearchLabel ||
                  "Arama filtresini kaldır"
                }
              >
                ✕
              </button>
            </div>
          )}
          {filterRole !== "all" && (
            <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm">
              <span>
                {dict?.searchAndFilter?.roleLabel || "Rol:"} {filterRole}
              </span>
              <button
                onClick={() => setFilterRole("all")}
                className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                aria-label={
                  dict?.searchAndFilter?.removeRoleLabel ||
                  "Rol filtresini kaldır"
                }
              >
                ✕
              </button>
            </div>
          )}
          <span className="text-xs sm:text-sm text-gray-500">
            ({filteredMembers.length}{" "}
            {dict?.searchAndFilter?.resultsCount || "sonuç"})
          </span>
        </div>
      )}
    </div>
  );
}
