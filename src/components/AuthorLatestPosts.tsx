import { getPostByAuthorPosts } from "../lib/posts/data";
import LatestBlogs from "./LatestBlogs";

/**
 * Async Server Component — yazarın diğer yazılarını çekip LatestBlogs ile gösterir.
 * PostsView içinde UserProfileCard'ın hemen altına Suspense ile sarmalı kullanılır.
 */
export default async function AuthorLatestPosts({
  authorId,
  dict,
}: {
  authorId: string;
  dict: any;
}) {
  const authorPosts = await getPostByAuthorPosts(authorId);
  if (!authorPosts?.length) return null;
  return <LatestBlogs dict={dict} authorPosts={authorPosts} />;
}
