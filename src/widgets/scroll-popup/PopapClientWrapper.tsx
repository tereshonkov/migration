"use client";
import dynamic from "next/dynamic";

const Popap = dynamic(() => import("./Popap"), { ssr: false });

export default function PopapClientWrapper() {
  return <Popap />;
}
