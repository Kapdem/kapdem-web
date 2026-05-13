import Link from "next/link";
import { getPostByCategory } from "../../../lib/posts/data";

import Image from "next/image";
import { getDictionary } from "../dictionaries";

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author: { firstName: string; lastName: string };
  coverImage: string;
};

const articles: Article[] =
  (await getPostByCategory("editorun-sectikleri")) || [];

function ArticleCard({
  article,
  dict,
  lang,
}: {
  article: Article;
  dict: any;
  lang: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <Image
        width={400}
        height={200}
        src={article.coverImage}
        alt={article.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-bold mb-2">{article.title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {article.author.firstName} {article.author.lastName}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString("tr-TR")}
          </span>
        </div>
        <Link
          href={`/${lang}/${article.slug}`}
          className="mt-3 inline-block text-blue-600 hover:underline text-sm font-medium"
        >
          {dict?.editorPicks?.readMore || "Devamını oku"}
        </Link>
      </div>
    </div>
  );
}

export default async function page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8 mt-28">
      <h1 className="text-2xl font-bold mb-6">
        {dict?.editorPickss?.title || "Editörün Seçtikleri"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            dict={dict}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
}
