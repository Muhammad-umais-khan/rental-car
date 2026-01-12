import MobileMenuButton from "./MobileMenuButton";

/**
 * Header component
 */
export default function Header({ title, children }) {
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
          {/* User avatar placeholder */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-white">A</span>
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
              Admin
            </span>
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
