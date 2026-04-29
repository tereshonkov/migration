import { afterEach, describe, expect, it, vi } from "vitest";
import { reportConversion } from "./gtagConversion";

describe("reportConversion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete window.gtag;
  });

  it("calls gtag with expected conversion payload when gtag exists", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    const result = reportConversion();

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith(
      "event",
      "conversion",
      expect.objectContaining({
        send_to: "AW-16643061743/tRMkCOKrntgbEO_vg4A-",
        value: 1.0,
        currency: "UAH",
      })
    );
    expect(result).toBe(false);
  });

  it("does not throw when gtag is missing", () => {
    delete window.gtag;
    expect(() => reportConversion()).not.toThrow();
    expect(reportConversion()).toBe(false);
  });

  it("includes event_callback when url is passed (used for redirect)", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    reportConversion("https://example.com/thanks");

    const payload = gtag.mock.calls[0][2] as { event_callback?: () => void };
    expect(typeof payload.event_callback).toBe("function");
  });
});
