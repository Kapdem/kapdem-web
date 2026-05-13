// Performance Metrics Utility
export class PerformanceMetrics {
  constructor() {
    this.startTime = null;
    this.apiStartTime = null;
    this.apiEndTime = null;
    this.pageStartTime = null;
    this.pageEndTime = null;
  }

  // API çağrısının başlangıcını kaydet
  markApiStart() {
    this.apiStartTime = performance.now();
  }

  // API çağrısının bitişini kaydet ve süreyi döndür
  markApiEnd() {
    this.apiEndTime = performance.now();
    const duration = this.apiEndTime - this.apiStartTime;
    return {
      duration: duration.toFixed(2),
      durationMs: Math.round(duration),
    };
  }

  // Genel başlangıç zamanı
  markPageStart() {
    this.pageStartTime = performance.now();
  }

  // Sayfanın tam yüklenmesi
  markPageEnd() {
    this.pageEndTime = performance.now();
    const duration = this.pageEndTime - this.pageStartTime;
    return {
      duration: duration.toFixed(2),
      durationMs: Math.round(duration),
    };
  }

  // Web Vitals bilgisini al
  getWebVitals() {
    if (typeof window === "undefined") return null;

    const vitals = {
      // Largest Contentful Paint
      lcp: this.getLCP(),
      // First Input Delay
      fid: this.getFID(),
      // Cumulative Layout Shift
      cls: this.getCLS(),
      // First Contentful Paint
      fcp: this.getFCP(),
    };

    return vitals;
  }

  // LCP - Largest Contentful Paint
  getLCP() {
    if (typeof window === "undefined") return null;

    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.renderTime || lastEntry.loadTime);
        observer.disconnect();
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });

      // Timeout: 5 saniye sonra bağlantıyı kes
      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, 5000);
    });
  }

  // FID - First Input Delay (deprecated, performanceObserver ile)
  getFID() {
    if (typeof window === "undefined") return null;

    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const firstEntry = entries[0];
          resolve(firstEntry.processingDuration);
          observer.disconnect();
        }
      });

      observer.observe({ entryTypes: ["first-input"] });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, 5000);
    });
  }

  // CLS - Cumulative Layout Shift
  getCLS() {
    if (typeof window === "undefined") return null;

    return new Promise((resolve) => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });

      observer.observe({ entryTypes: ["layout-shift"] });

      // Sayfa yükünden sonra CLS hesapla
      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue.toFixed(3));
      }, 2500);
    });
  }

  // FCP - First Contentful Paint
  getFCP() {
    if (typeof window === "undefined") return null;

    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(
          (entry) => entry.name === "first-contentful-paint",
        );
        if (fcpEntry) {
          resolve(fcpEntry.startTime);
          observer.disconnect();
        }
      });

      observer.observe({ entryTypes: ["paint"] });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, 3000);
    });
  }

  // Server-side: API yanıt süresini logla
  logServerMetrics(slug, duration) {
    const logData = {
      timestamp: new Date().toISOString(),
      endpoint: `/posts/slug/${slug}`,
      apiResponseTime: `${duration.toFixed(2)}ms`,
      type: "API_RESPONSE",
    };

    return logData;
  }

  // Client-side: Web Vitals ve yükleme süresini logla
  async logClientMetrics(slug, pageLoadTime) {
    if (typeof window === "undefined") return null;

    const logData = {
      timestamp: new Date().toISOString(),
      slug,
      pageLoadTime: `${pageLoadTime.toFixed(2)}ms`,
      type: "PAGE_LOAD",
    };

    // Performance API metrikleri
    const perfEntries = performance.getEntriesByType("navigation")[0];
    if (perfEntries) {
      logData.navigationTiming = {
        domContentLoaded: `${perfEntries.domContentLoadedEventEnd - perfEntries.domContentLoadedEventStart}ms`,
        loadComplete: `${perfEntries.loadEventEnd - perfEntries.loadEventStart}ms`,
        domInteractive: `${perfEntries.domInteractive - perfEntries.fetchStart}ms`,
        resourceLoad: `${perfEntries.responseEnd - perfEntries.fetchStart}ms`,
      };
    }

    return logData;
  }
}

// Singleton instance
export const performanceMetrics = new PerformanceMetrics();

// useEffect hook için yardımcı (client-side kullanımı için)
export const usePageLoadMetrics = (slug) => {
  if (typeof window === "undefined") return;

  try {
    const navigationStart =
      performance.getEntriesByType("navigation")[0]?.fetchStart || 0;
    const now = performance.now();

    const metrics = {
      slug,
      timeElapsed: (now - navigationStart).toFixed(2),
      navigationTiming: {
        domContentLoaded:
          performance.getEntriesByType("navigation")[0]
            ?.domContentLoadedEventEnd -
          performance.getEntriesByType("navigation")[0]
            ?.domContentLoadedEventStart,
        fullPageLoad:
          performance.getEntriesByType("navigation")[0]?.loadEventEnd -
          performance.getEntriesByType("navigation")[0]?.loadEventStart,
      },
    };

    return metrics;
  } catch (error) {
    console.error("Performans ölçümü hatası:", error);
    return null;
  }
};
