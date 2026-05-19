import { Geist, Geist_Mono, Manrope, Work_Sans } from "next/font/google";
import "../../app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../../context/AuthContext";
import { cookies } from "next/headers";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ChatbotWidgetLoader from "../../components/chatbot/ChatbotWidgetLoader";
import { getDictionary } from "./dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://kapdem.org"),
  title: {
    default:
      "KAPDEM | Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi ",
    template:
      "%s | KAPDEM | Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi",
  },
  description:
    "Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi (KAPDEM), Türkiye de siyaset bilimi ve kamu yönetimi, kamu politikaları ile ekonomik, sosyal, kültürel ve toplumsal konulardaki temel kamusal, yönetimsel/idari/siyasi kararlara odaklı çalışmalar yapmak, projeler geliştirmek ve yenilikçi ve çözüm odaklı yaklaşımlara katkıda bulunmak üzere kurulmuştur.",
  keywords: [
    "kamu politikası",
    "devlet yönetimi",
    "toplumsal gelişim",
    "dijital dönüşüm",
    "teknoloji",
    "girişimcilik",
    "analiz",
    "kapdem",
    "araştırma",
    "makale",
    "podcast",
    "video",
  ],
  openGraph: {
    title:
      "KAPDEM | Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi",
    description:
      "KAPDEM, kamu politikası, devlet yönetimi, toplumsal gelişim, dijital dönüşüm, teknoloji, girişimcilik ve güncel analizlerle topluma değer katan bir platformdur.",
    url: "https://kapdem.org",
    siteName: "Kapdem | Kamu Politikaları ve Dijital Dönüşüm Merkezi",
    images: [
      {
        url: "https://kapdem.org/images/kapdem-logo-2.png",
        width: 1200,
        height: 630,
        alt: "Kapdem Logo",
        type: "image/png",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kapdemorg",
    title: "Kapdem | Kamu Politikaları ve Dijital Dönüşüm Merkezi",
    description:
      "Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi (KAPDEM), Türkiye de siyaset bilimi ve kamu yönetimi, kamu politikaları ile ekonomik, sosyal, kültürel ve toplumsal konulardaki temel kamusal, yönetimsel/idari/siyasi kararlara odaklı çalışmalar yapmak, projeler geliştirmek ve yenilikçi ve çözüm odaklı yaklaşımlara katkıda bulunmak üzere kurulmuştur.",

    images: [
      {
        url: "https://kapdem.org/images/kapdem-logo-2.png",
        alt: "KAPDEM | Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi",
      },
    ],
  },
};

// Google'ın arama sonuçları ve bilgi panelinde gösterdiği logoyu kontrol eder.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KAPDEM",
  alternateName:
    "Kamu Politikası, Devlet Yönetimi ve Toplumsal Gelişim Merkezi",
  url: "https://kapdem.org",
  logo: "https://kapdem.org/images/LOGO.jpg",
  sameAs: [
    "https://x.com/kapdemorg",
    "https://www.instagram.com/kapdemorg/",
    "https://www.linkedin.com/company/kapdem/",
    "https://www.youtube.com/channel/UCpWaTCuKLX2wEScGiEyntmQ",
  ],
};

export default async function RootLayout({ children, params }) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);

  // Server-side'da authentication cookie'sini kontrol et
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("Authentication");
  const initialAuth = authCookie?.value || null;

  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="http://16.171.56.33:3000" />
        <link
          rel="preconnect"
          href="https://kapdem.s3.eu-central-1.amazonaws.com"
        />
        <meta
          name="google-site-verification"
          content="cWOkpvAJAlllNFmDlFA2TZeuZiaYGdf5wS2mrvHigyk"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className={` ${workSans.variable}  antialiased`}>
        <AuthProvider initialAuth={initialAuth}>
          <Navbar dict={dict.navbar} lang={awaitedParams.lang} />
          {children}
          <Footer dict={dict} />
          <ChatbotWidgetLoader dict={dict} lang={awaitedParams.lang} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
