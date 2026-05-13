import Link from "next/link";

export default function SectionHeader({
  title,
  link,
  linkLabel = "Tümünü Gör",
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
        {title}
      </h2>
      {link && (
        <Link
          href={link}
          className="inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
