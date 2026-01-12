/**
 * Reusable Table component (Server Component)
 * Usage:
 * <Table
 *   columns={[{ key: 'name', header: 'Name' }, { key: 'email', header: 'Email' }]}
 *   data={[{ id: 1, name: 'John', email: 'john@example.com' }]}
 * />
 */

export default function Table({
  columns = [],
  data = [],
  emptyMessage = "No data available",
  className = "",
  mobileRender,
}) {
  if (!data.length) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      {/* Mobile card view */}
      {mobileRender && (
        <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <div key={row.id || rowIndex}>
              {mobileRender(row)}
            </div>
          ))}
        </div>
      )}

      {/* Desktop table view */}
      <div className={`${mobileRender ? 'hidden md:block' : ''} overflow-x-auto ${className}`}>
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800/50 whitespace-nowrap"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, rowIndex) => (
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
