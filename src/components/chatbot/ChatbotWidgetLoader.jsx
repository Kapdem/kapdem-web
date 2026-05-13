"use client";

import dynamic from "next/dynamic";

// ssr: false yalnızca Client Component içinde kullanılabilir.
// layout.js (Server Component) bu wrapper'ı import eder.
const ChatbotWidget = dynamic(() => import("./ChatbotWidget"), { ssr: false });

export default function ChatbotWidgetLoader({ dict, lang }) {
  return <ChatbotWidget dict={dict} lang={lang} />;
}
