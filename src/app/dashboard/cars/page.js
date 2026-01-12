"use client";

import { Header } from "@/components/layout";
import { Card, SortableTable } from "@/components/ui";
import { cars } from "@/data/cars";
import Link from "next/link";

/**
 * Status badge component
 */
function StatusBadge({ status }) {
  const styles = {
    available: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    rented: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    maintenance: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function CarsPage() {
  const columns = [
    {
      key: "make",
      header: "Make",
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.model}</p>
        </div>
      ),
    },
    {
      key: "year",
      header: "Year",
    },
    {
      key: "color",
      header: "Color",
    },
    {
      key: "licensePlate",
      header: "License Plate",
      render: (value) => (
        <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {value}
        </span>
      ),
    },
    {
      key: "dailyRate",
      header: "Daily Rate",
      render: (value) => (
        <span className="font-medium text-green-600 dark:text-green-400">
          ${value}/day
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <a
            href={`/dashboard/cars/${row.id}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            View
          </a>
          <a
            href={`/dashboard/cars/${row.id}/edit`}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium"
          >
            Edit
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header title="Cars">
        <Link
          href="/dashboard/cars/add"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Car
        </Link>
      </Header>
      <div className="p-4 sm:p-6">
        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Cars</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{cars.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Available</p>
            <p className="text-2xl font-bold text-green-600">{cars.filter(c => c.status === "available").length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Rented</p>
            <p className="text-2xl font-bold text-yellow-600">{cars.filter(c => c.status === "rented").length}</p>
          </div>
        </div>

        {/* Cars table with sorting */}
        <Card title="Fleet Inventory" description="Manage your car rental fleet" padding={false}>
          <SortableTable
            columns={columns}
            data={cars}
            sortableColumns={["year", "dailyRate"]}
            emptyMessage="No cars found. Add your first car to get started."
            mobileRender={(car) => (
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {car.make} {car.model}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {car.year} • {car.color}
                    </p>
                  </div>
                  <StatusBadge status={car.status} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                    {car.licensePlate}
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    ${car.dailyRate}/day
                  </span>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <a
                    href={`/dashboard/cars/${car.id}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium"
                  >
                    View Details
                  </a>
                  <a
                    href={`/dashboard/cars/${car.id}/edit`}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 text-sm font-medium"
                  >
                    Edit
                  </a>
                </div>
              </div>
            )}
          />
        </Card>
      </div>
    </>
  );
}
