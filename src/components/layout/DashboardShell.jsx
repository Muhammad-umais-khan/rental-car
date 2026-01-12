"use client";

import { Sidebar } from "@/components/layout";
import { SidebarProvider, useSidebar } from "./SidebarContext";

function DashboardContent({ children }) {
  const { isOpen, close } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isOpen} onClose={close} />
      <main className="lg:pl-64">{children}</main>
    </div>
  );
}

export default function DashboardShell({ children }) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
