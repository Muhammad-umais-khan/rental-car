/**
 * Reusable Card component (Server Component)
 */

export default function Card({
  children,
  title,
  description,
  className = "",
  padding = true,
}) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl 
        border border-gray-200 dark:border-gray-700
        shadow-sm
        ${className}
      `}
    >
      {(title || description) && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={padding ? "p-4 sm:p-6" : ""}>{children}</div>
    </div>
  );
}
