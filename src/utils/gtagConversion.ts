// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetOrConfig: string,
      config?: {
        send_to?: string;
        value?: number;
        currency?: string;
        event_callback?: () => void;
      },
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Reports a conversion event to Google Ads
 * Conversion ID: AW-16643061743/tRMkCOKrntgbEO_vg4A-
 */
export function reportConversion(url?: string): boolean {
  const callback = () => {
    if (typeof url !== "undefined") {
      window.location.href = url;
    }
  };

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-16643061743/tRMkCOKrntgbEO_vg4A-",
      value: 1.0,
      currency: "UAH",
      event_callback: callback,
    });
  }

  return false;
}
