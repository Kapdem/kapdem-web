"use server";
import { cache } from "react";
import { fetchInstance } from "../../utils/fetch";

const S3_URL = process.env.NEXT_PUBLIC_S3_URL || "";

// Dil parametresini normalize et: sadece "tr" | "en"
const normalizeLang = (lang) => (lang === "en" ? "en" : "tr");

export const getPosts = cache(async (lang) => {
  try {
    const res = await fetchInstance(`/posts?limit=5&lang=${normalizeLang(lang)}`, {
      method: "GET",
      next: { revalidate: 300, tags: ["posts"] }, // 5 dakika cache + tag
    });

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    if (Array.isArray(res?.posts)) {
      res.posts = res.posts.map((post) => {
        if (
          post.coverImage &&
          !post.coverImage.startsWith(s3Prefix) &&
          !post.coverImage.startsWith("http")
        ) {
          return { ...post, coverImage: s3Prefix + post.coverImage.replace(/^\/+/, '') };
        }
        return post;
      });

      return res.posts;
    }

    return res.posts || [];
  } catch (error) {
    return [];
  }
});
export const getPostDetails = cache(async (slug) => {
  try {
    const res = await fetchInstance(`/posts/slug/${slug}`, {
      method: "GET",
    });

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    if (res && res.coverImage) {
      if (
        !res.coverImage.startsWith(s3Prefix) &&
        !res.coverImage.startsWith("http")
      ) {
        res.coverImage = s3Prefix + res.coverImage;
      }
    }

    // Process galleryImages if exists
    if (res && res.galleryImages && Array.isArray(res.galleryImages)) {
      res.galleryImages = res.galleryImages.map((img) => {
        if (!img.startsWith(s3Prefix) && !img.startsWith("http")) {
          return s3Prefix + img;
        }
        return img;
      });
    }

    return res;
  } catch (error) {
    return null;
  }
});

export const getEventDetails = async (slug) => {
  try {
    const res = await fetchInstance(`/events/slug/${slug}`, {
      method: "GET",
    });

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    if (res && res.coverImage) {
      if (
        !res.coverImage.startsWith(s3Prefix) &&
        !res.coverImage.startsWith("http")
      ) {
        res.coverImage = s3Prefix + res.coverImage;
      }
    }

    // Process galleryImages if exists
    if (res && res.galleryImages && Array.isArray(res.galleryImages)) {
      res.galleryImages = res.galleryImages.map((img) => {
        if (!img.startsWith(s3Prefix) && !img.startsWith("http")) {
          return s3Prefix + img;
        }
        return img;
      });
    }

    return res;
  } catch (error) {
    console.error("Error fetching event details:", error);
    return null;
  }
};

export const getPostByCategory = async (
  category,
  limit = 100,
  page = 1,
  lang,
) => {
  try {
    const res = await fetchInstance(
      `/posts/category/${category}?page=${page}&limit=${limit}&lang=${normalizeLang(lang)}`,
      {
        method: "GET",
        next: { revalidate: 300, tags: ["posts", `category-${category}`] },
      },
    );

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    const fixCoverImage = (url) => {
      if (!url) return url;
      // Zaten doğru prefix ile başlıyorsa dokunma
      if (url.startsWith(s3Prefix)) return url;
      // Eski/yanlış S3 bucket URL'si ise path kısmını çıkar ve doğru prefix ekle
      if (url.startsWith("http")) {
        try {
          const parsed = new URL(url);
          // pathname başındaki "/" karakterini kaldır
          const path = parsed.pathname.startsWith("/")
            ? parsed.pathname.slice(1)
            : parsed.pathname;
          return s3Prefix + path;
        } catch {
          return url;
        }
      }
      // Göreceli path ise doğru prefix ekle
      return s3Prefix + url;
    };

    if (Array.isArray(res?.posts)) {
      res.posts = res.posts.map((post) => ({
        ...post,
        coverImage: fixCoverImage(post.coverImage),
      }));

      return res.posts;
    } else if (Array.isArray(res)) {
      // Eğer response direkt array ise
      const processedPosts = res.map((post) => ({
        ...post,
        coverImage: fixCoverImage(post.coverImage),
      }));

      return processedPosts;
    } else {
      return []; // null yerine boş array dön
    }
  } catch (error) {
    console.error(`Error fetching posts for category "${category}":`, error);
    return []; // null yerine boş array dön
  }
};

export const getPostByAuthorPosts = async (authorId) => {
  try {
    const res = await fetchInstance(`/posts/author/${authorId}`, {
      method: "GET",
    });

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    if (Array.isArray(res?.posts)) {
      res.posts = res.posts.map((post) => {
        if (
          post.coverImage &&
          !post.coverImage.startsWith(s3Prefix) &&
          !post.coverImage.startsWith("http")
        ) {
          return { ...post, coverImage: s3Prefix + post.coverImage.replace(/^\/+/, '') };
        }
        return post;
      });

      return res.posts;
    }

    return res.posts || null;
  } catch (error) {
    return null;
  }
};

export const findPastEvents = async () => {
  try {
    const res = await fetchInstance(`/events/past`, {
      method: "GET",
    });

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    // Backend'den gelen response: { data: [...], total, page, limit, totalPages }
    const events = res?.data || [];

    if (Array.isArray(events)) {
      const processedEvents = events.map((event) => {
        if (
          event.coverImage &&
          !event.coverImage.startsWith(s3Prefix) &&
          !event.coverImage.startsWith("http")
        ) {
          return { ...event, coverImage: s3Prefix + event.coverImage.replace(/^\/+/, '') };
        }
        return event;
      });

      return processedEvents;
    }

    return [];
  } catch (error) {
    console.error("Error fetching past events:", error);
    return [];
  }
};

export const findUpcomingEvents = async () => {
  try {
    const res = await fetchInstance(`/events/upcoming`, {
      method: "GET",
      next: { revalidate: 150 },
    });

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    // Backend'den gelen response: { data: [...], total, page, limit, totalPages }
    const events = res?.data || [];

    if (Array.isArray(events)) {
      const processedEvents = events.map((event) => {
        if (
          event.coverImage &&
          !event.coverImage.startsWith(s3Prefix) &&
          !event.coverImage.startsWith("http")
        ) {
          return { ...event, coverImage: s3Prefix + event.coverImage.replace(/^\/+/, '') };
        }
        return event;
      });

      return processedEvents;
    }

    return [];
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
};

export const getPostByUsername = async (username) => {
  try {
    const res = await fetchInstance(`/posts/author/name/${username}`, {
      method: "GET",
    });

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    if (Array.isArray(res?.posts)) {
      res.posts = res.posts.map((post) => {
        if (
          post.coverImage &&
          !post.coverImage.startsWith(s3Prefix) &&
          !post.coverImage.startsWith("http")
        ) {
          return { ...post, coverImage: s3Prefix + post.coverImage.replace(/^\/+/, '') };
        }
        return post;
      });

      return res.posts;
    }

    return res.posts || null;
  } catch (error) {
    return null;
  }
};

export const getFeaturedPosts = async (lang) => {
  try {
    const res = await fetchInstance(`/posts/featured?lang=${normalizeLang(lang)}`, {
      method: "GET",
      next: { revalidate: 300, tags: ["featured-posts"] },
    });

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    if (Array.isArray(res?.posts)) {
      res.posts = res.posts.map((post) => {
        if (
          post.coverImage &&
          !post.coverImage.startsWith(s3Prefix) &&
          !post.coverImage.startsWith("http")
        ) {
          return { ...post, coverImage: s3Prefix + post.coverImage.replace(/^\/+/, '') };
        }
        return post;
      });

      return res.posts;
    }

    return res.posts || [];
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
};

export const getEditorsPicks = async (lang) => {
  try {
    const res = await fetchInstance(`/posts/editor-picks?lang=${normalizeLang(lang)}`, {
      method: "GET",
      next: { revalidate: 300, tags: ["editors-picks"] },
    });

    const s3Prefix = "https://kapdem.s3.eu-central-1.amazonaws.com/";

    if (Array.isArray(res?.posts)) {
      res.posts = res.posts.map((post) => {
        if (
          post.coverImage &&
          !post.coverImage.startsWith(s3Prefix) &&
          !post.coverImage.startsWith("http")
        ) {
          return { ...post, coverImage: s3Prefix + post.coverImage.replace(/^\/+/, '') };
        }
        return post;
      });

      return res.posts;
    }

    return res.posts || [];
  } catch (error) {
    console.error("Error fetching editor's picks:", error);
    return [];
  }
};
