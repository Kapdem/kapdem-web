import React from "react";
import { getPostByCategory } from "../../../lib/posts/data";
import KapdemDijital from "../../../views/KapdemDijital";

type Props = {};

export default async function page({}: Props) {
  const podcasts = (await getPostByCategory("podcastler")) || [];
  const videos = (await getPostByCategory("videolar")) || [];
  return (
    <div>
      <KapdemDijital podcasts={podcasts} videos={videos} />
    </div>
  );
}
