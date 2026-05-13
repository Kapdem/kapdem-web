import React from "react";
import { getPostDetails } from "../../../../lib/posts/data";
import ShareAndDownload from "../../../../components/ShareAndDownload";
import PostContent from "../../../../components/PostContent";
import { getDictionary } from "../../dictionaries";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
    lang: string;
  };
};

export default async function Page({ params }: Props) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);
  const res = await getPostDetails(awaitedParams.slug);

  if (!res) {
    return (
      <div className="mt-44">No post found for slug: {awaitedParams.slug}</div>
    );
  }

  const shareData = {
    title: res.title,
    image: res.coverImage,
    content: res.content?.text || "",
  };

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto my-32 px-2">
      {res.coverImage && (
        <Image
          width={800}
          height={400}
          src={res.coverImage}
          alt={res.title}
          className="w-full max-w-7xl max-h-[400px] object-cover rounded-xl mb-8 shadow"
        />
      )}
      <PostContent
        postData={res}
        className="max-w-7xl mx-auto prose text-xl w-full mb-8 px-4 text-justify"
      />
      <ShareAndDownload dict={dict} blogPost={shareData} />
    </div>
  );
}
