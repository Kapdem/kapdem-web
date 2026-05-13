/** @type {import('next').NextConfig} */

const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  // Turbopack ayarları
  turbopack: {},

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@sentry/nextjs": false,
      "@sentry/react": false,
      "@sentry/node": false,
      "@sentry/browser": false,
    };
    return config;
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "http", hostname: "*.googleusercontent.com" },
      { protocol: "http", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "s3.eu-north-1.amazonaws.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "kapdem.s3.us-east-1.amazonaws.com" },
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "kapdem.org" },
      { protocol: "https", hostname: "cdn.kapdem.org" },
      { protocol: "https", hostname: "kapdem.s3.eu-central-1.amazonaws.com" },
      { protocol: "https", hostname: "kapdem-org.s3.eu-north-1.amazonaws.com" },
    ],
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    // ÖNEMLİ: images içindeki kısıtlayıcı CSP satırı kaldırıldı çünkü aşağıda headers içinde tanımlıyoruz.
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:3001", "localhost:3002"],
      bodySizeLimit: "10mb",
    },
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  transpilePackages: ["lucide-react"],
  poweredByHeader: false,

  async headers() {
    const isDev = process.env.NODE_ENV === "development";

    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // img-src güncellendi: http ve https googleusercontent eklendi
      "img-src 'self' data: blob: http://*.googleusercontent.com https://*.googleusercontent.com https://*.amazonaws.com https://images.pexels.com https://i.scdn.co https://kapdem.org https://cdn.kapdem.org",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.amazonaws.com https://api.kapdem.org",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://vimeo.com",
      "media-src 'self' https://*.amazonaws.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      // Geliştirme aşamasında http resimlerin engellenmemesi için upgrade-insecure sadece prod'da.
      ...(!isDev ? ["upgrade-insecure-requests"] : []),
    ];

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspDirectives.join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
