"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/layout";
import { Card, SortableTable } from "@/components/ui";
import { getCars, formatCarFromDb } from "@/lib/cars";
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
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || styles.available}`}>
      {status}
    </span>
  );
}

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch cars on mount
  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const data = await getCars();
        setCars(data.map(formatCarFromDb));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  // Filter cars by license plate
  const filteredCars = useMemo(() => {
    if (!searchQuery.trim()) return cars;
    return cars.filter((car) =>
      car.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, cars]);

  // Stats
  const stats = useMemo(() => ({
    total: cars.length,
    available: cars.filter(c => c.status === "available").length,
    rented: cars.filter(c => c.status === "rented").length,
  }), [cars]);

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

  if (error) {
    return (
      <>
        <Header title="Cars" />
        <div className="p-4 sm:p-6">
          <Card>
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">Error loading cars: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Try again
              </button>
            </div>
          </Card>
        </div>
      </>
    );
  }

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
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {loading ? "..." : stats.total}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Available</p>
            <p className="text-2xl font-bold text-green-600">
              {loading ? "..." : stats.available}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Rented</p>
            <p className="text-2xl font-bold text-yellow-600">
              {loading ? "..." : stats.rented}
            </p>
          </div>
        </div>

        {/* Cars table with sorting */}
        <Card
          title="Fleet Inventory"
          description="Manage your car rental fleet"
          padding={false}
          headerAction={
            <div className="relative w-full">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by license plate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          }
        >
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Loading cars...</p>
            </div>
          ) : (
            <SortableTable
              columns={columns}
              data={filteredCars}
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
          )}
        </Card>
      </div>
    </>
  );
}
