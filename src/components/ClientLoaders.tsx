"use client";

/**
 * Client-only loaders that wrap dynamic imports with ssr: false.
 * `ssr: false` is only allowed in Client Components, so these wrappers
 * act as the boundary when imported by Server Components.
 */
import dynamic from "next/dynamic";

const SoundWaveDynamic = dynamic(() => import("./SoundWave"), { ssr: false });
export function SoundWaveLoader(props: any) {
  return <SoundWaveDynamic {...props} />;
}

// ShareAndDownload pulls in jsPDF + html2canvas — keep code-split and client-only
const ShareAndDownloadDynamic = dynamic(() => import("./ShareAndDownload"), {
  ssr: false,
  loading: () => null,
});
export function ShareAndDownloadLoader(props: any) {
  return <ShareAndDownloadDynamic {...props} />;
}
