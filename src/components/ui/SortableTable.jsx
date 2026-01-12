"use client";

import { useState, useMemo } from "react";

/**
 * Sortable Table component with client-side sorting
 */
export default function SortableTable({
  columns = [],
  data = [],
  emptyMessage = "No data available",
  className = "",
  mobileRender,
  sortableColumns = [], // Array of column keys that are sortable
}) {
  // Sort state: { column: string | null, direction: 'asc' | 'desc' | null }
  const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

  // Handle sort toggle: None -> Desc -> Asc -> None
  const handleSort = (columnKey) => {
    setSortConfig((prev) => {
      if (prev.column !== columnKey) {
        // New column, start with descending
        return { column: columnKey, direction: "desc" };
      }
      if (prev.direction === "desc") {
        return { column: columnKey, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { column: null, direction: null };
      }
      return { column: columnKey, direction: "desc" };
    });
  };

  // Sort the data
  const sortedData = useMemo(() => {
    if (!sortConfig.column || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.column];
      const bValue = b[sortConfig.column];

      // Handle numeric comparison
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Handle string comparison
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (sortConfig.direction === "asc") {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
  }, [data, sortConfig]);

  if (!data.length) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  // Sort icon component
  const SortIcon = ({ columnKey }) => {
    const isActive = sortConfig.column === columnKey;
    const direction = isActive ? sortConfig.direction : null;

    return (
      <span className="inline-flex flex-col ml-1.5 -space-y-1">
        {/* Up arrow */}
        <svg
          className={`w-3 h-3 transition-colors ${
            isActive && direction === "asc"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 8l-6 6h12z" />
        </svg>
        {/* Down arrow */}
        <svg
          className={`w-3 h-3 transition-colors ${
            isActive && direction === "desc"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 16l-6-6h12z" />
        </svg>
      </span>
    );
  };

  return (
    <>
      {/* Mobile card view */}
      {mobileRender && (
        <div className="md:hidden">
          {/* Mobile sort controls */}
          {sortableColumns.length > 0 && (
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Sort by:</span>
                <div className="flex gap-2">
                  {sortableColumns.map((colKey) => {
                    const column = columns.find((c) => c.key === colKey);
                    const isActive = sortConfig.column === colKey;
                    return (
                      <button
                        key={colKey}
                        onClick={() => handleSort(colKey)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {column?.header || colKey}
                        {isActive && (
                          <span className="ml-1">
                            {sortConfig.direction === "desc" ? "↓" : "↑"}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.map((row, rowIndex) => (
              <div key={row.id || rowIndex}>{mobileRender(row)}</div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop table view */}
      <div
        className={`${mobileRender ? "hidden md:block" : ""} overflow-x-auto ${className}`}
      >
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((column) => {
                const isSortable = sortableColumns.includes(column.key);
                const isActive = sortConfig.column === column.key;

                return (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-left text-sm font-semibold bg-gray-50 dark:bg-gray-800/50 whitespace-nowrap ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-900 dark:text-gray-100"
                    } ${isSortable ? "cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" : ""}`}
                    onClick={isSortable ? () => handleSort(column.key) : undefined}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {isSortable && <SortIcon columnKey={column.key} />}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={`${row.id || rowIndex}-${column.key}`}
                    className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
