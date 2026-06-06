import React from "react";
import { getPostByCategory } from "../../../lib/posts/data";
import KapdemDijital from "../../../views/KapdemDijital";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function page({ params }: Props) {
  const { lang } = await params;
  const podcasts = (await getPostByCategory("podcastler", 100, 1, lang)) || [];
  const videos = (await getPostByCategory("videolar", 100, 1, lang)) || [];
  return (
    <div>
      <KapdemDijital podcasts={podcasts} videos={videos} lang={lang} />
    </div>
  );
}
