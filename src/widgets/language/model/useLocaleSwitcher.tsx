"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SUPPORTED_LOCALES = ["uk", "ru", "en"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const SUPPORTED_SET = new Set<string>(SUPPORTED_LOCALES);

export const LOCALE_LABELS: Record<string, string> = {
  uk: "Українська",
  en: "English",
  ru: "Русский",
};

function getLocaleFromPath(pathname: string) {
  const first = pathname.split("/")[1];
  if (first && SUPPORTED_SET.has(first)) return first;
  return "uk";
}

export function useLocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const node = event.target as Node | null;
      if (!node || !wrapperRef.current?.contains(node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const currentLocale = getLocaleFromPath(pathname);

  const handleChange = (selectedLocale: string) => {
    const paramsString = searchParams?.toString() ?? "";
    const query = paramsString ? `?${paramsString}` : "";

    let basePath = pathname;

    const current = getLocaleFromPath(pathname);
    if (SUPPORTED_SET.has(current)) {
      basePath = pathname.replace(`/${current}`, "") || "/";
    }

    let newPathname: string;
    if (selectedLocale === "uk") {
      newPathname = basePath;
    } else {
      newPathname = `/${selectedLocale}${basePath === "/" ? "" : basePath}`;
    }

    setOpen(false);
    router.push(`${newPathname}${query}`);
  };

  const handleContainerToggle = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "IMG" || target === wrapperRef.current) {
      setOpen((prev) => !prev);
    }
  };

  return {
    open,
    setOpen,
    wrapperRef,
    labels: LOCALE_LABELS,
    supportedLocales: SUPPORTED_LOCALES,
    currentLocale,
    handleChange,
    handleContainerToggle,
  };
}
