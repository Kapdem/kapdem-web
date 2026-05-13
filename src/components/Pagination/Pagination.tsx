import React from "react";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  hasMore: boolean;
  dict?: any;
};

export default function Pagination({
  page,
  setPage,
  loading,
  hasMore,
  dict,
}: Props) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1 || loading}
      >
        {dict?.pagination?.previous || "Önceki"}
      </button>
      <span className="px-4 py-2">
        {dict?.pagination?.page || "Sayfa"} {page}
      </span>
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => setPage((p) => (hasMore ? p + 1 : p))}
        disabled={!hasMore || loading}
      >
        {dict?.pagination?.next || "Sonraki"}
      </button>
    </div>
  );
}
