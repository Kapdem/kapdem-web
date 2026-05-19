import { getAvailableAuthors } from "@/lib/data";

import AuthorCard from "@/components/AuthorCard";
import React from "react";
import { getDictionary } from "../dictionaries";

export default async function page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const authors = await getAvailableAuthors();
  console.log("Fetched authors:", authors);

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {dict?.authorsPage?.title || "Yazarlarımız"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {dict?.authorsPage?.description ||
              "KAPDEM çatısı altında araştırmalarını paylaşan değerli yazarlarımız"}
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {authors && authors.length > 0 ? (
            authors.map((author) => (
              <AuthorCard key={author._id} author={author} lang={lang} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              {dict?.authorsPage?.noAuthors || "Henüz yazar bulunmamaktadır."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
