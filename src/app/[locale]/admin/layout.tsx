"use client";

import { ReactNode } from "react";
import { AdminThemeProvider } from "@/widgets/admin/ui/AdminThemeProvider";
import { TabProvider } from "@/context/TabContext";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <TabProvider>
      <AdminThemeProvider>{children}</AdminThemeProvider>
    </TabProvider>
  );
}
