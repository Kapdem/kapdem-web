"use client";

import { useEffect } from "react";

export default function ViewCountTracker({ postId }: { postId: string }) {
  useEffect(() => {
    if (!postId) return;
    fetch(`/api/posts/${postId}/view`, { method: "POST" }).catch(() => {});
  }, [postId]);

  return null;
}
