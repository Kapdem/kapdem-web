import Image from "next/image";
import Link from "next/link";

type Props = {
  article: {
    slug: string;
    _id: string;
    coverImage: string;
    title: string;
    excerpt: string;
    publishedAt: string;
  };
  formatDate: (dateStr: string) => string;
  lang: string;
};

export default function ArticlesCard({ article, formatDate, lang }: Props) {
  return (
    <Link href={`/${lang}/${article.slug}`} key={article.slug}>
      <div
        key={article._id}
        className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 flex flex-col hover:shadow-xl transition-shadow duration-200 h-full"
      >
        <div className="w-full aspect-[5/3] relative mb-4 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={
              article.coverImage && article.coverImage.trim() !== ""
                ? article.coverImage
                : "/images/onlylogo.png"
            }
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <h2 className="text-lg md:text-xl font-semibold mb-2">
          {article.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex-grow">
          <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
