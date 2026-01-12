"use client";

import { useRouter } from "next/navigation";
import MobileMenuButton from "./MobileMenuButton";

/**
 * Header component
 */
export default function Header({ title, children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <MobileMenuButton />
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">{children}</div>
          {/* User menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-white">A</span>
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
              Admin
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile action buttons - show below header on small screens */}
      {children && (
        <div className="sm:hidden px-4 pb-3 flex gap-2">
          {children}
        </div>
      )}
    </header>
  );
}
