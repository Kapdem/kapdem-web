const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://kapdem.org";

const NORMALIZED_BASE_URL = BASE_URL.replace(/\/+$/, "");

const publicRoutes = [
  "",
  "about-us",
  "ana-kadro",
  "authors",
  "contact",
  "danismanlik",
  "donate",
  "editorun-sectikleri",
  "etkinlikler",
  "kapdem-dijital",
  "membership",
  "ozel-dosyalar",
  "roportajlar",
  "sendpaper",
];

const toUrl = (path = "") =>
  path
    ? `${NORMALIZED_BASE_URL}/${path.replace(/^\/+/, "")}`
    : `${NORMALIZED_BASE_URL}/`;

export default function sitemap() {
  const now = new Date();

  return publicRoutes.flatMap((route) => {
    const trPath = route;
    const enPath = route ? `en/${route}` : "en";

    return [
      {
        url: toUrl(trPath),
        lastModified: now,
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            tr: toUrl(trPath),
            en: toUrl(enPath),
          },
        },
      },
      {
        url: toUrl(enPath),
        lastModified: now,
        changeFrequency: "weekly",
        priority: route === "" ? 0.9 : 0.7,
        alternates: {
          languages: {
            tr: toUrl(trPath),
            en: toUrl(enPath),
          },
        },
      },
    ];
  });
}
