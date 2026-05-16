import Link from "next/link";
import React from "react";
import PostContent from "../PostContent";

type Props = {
  item: {
    slug: string;
    _id: string;
    title: string;
    excerpt: string;
    author?: {
      firstName: string;
      lastName: string;
    };
    publishedAt: string;
    content?: {
      html: string;
    };
  };
  formatDate: (dateStr: string) => string;
};

export default function VideoCard({ formatDate, item }: Props) {
  return (
    <Link href={`/${item.slug}`} key={item.slug}>
      <div
        key={item._id}
        className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 flex flex-col overflow-hidden border border-gray-100 cursor-pointer"
      >
        <div className="flex-1 flex flex-col p-4">
          <h2 className="text-lg font-bold mb-2 group-hover:text-blue-700 transition-colors cursor-pointer">
            {item.title}
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-700 font-medium">
              {item.author?.firstName} {item.author?.lastName}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              {formatDate(item.publishedAt)}
            </span>
          </div>
          <div className="mb-3 text-gray-600 text-sm line-clamp-2">
            {item.excerpt}
          </div>
          <div className="video-embed-container rounded-lg border border-gray-200 aspect-video w-full h-full shadow-sm">
            <PostContent
              postData={item}
              className="w-full aspect-video"
              tag="div"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
