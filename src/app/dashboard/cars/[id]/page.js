import { Header } from "@/components/layout";
import { Card } from "@/components/ui";
import { getCarById, formatCarFromDb } from "@/lib/cars";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${styles[status] || styles.available}`}>
      {status}
    </span>
  );
}

/**
 * Detail row component
 */
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{value || "N/A"}</span>
    </div>
  );
}

export default async function CarDetailPage({ params }) {
  const { id } = await params;
  
  let car;
  try {
    const carData = await getCarById(id);
    car = formatCarFromDb(carData);
  } catch (error) {
    notFound();
  }

  if (!car) {
    notFound();
  }

  return (
    <>
      <Header title={`${car.make} ${car.model}`}>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            href={`/dashboard/cars/${id}/edit`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="sm:inline">Edit</span>
          </Link>
          <Link
            href="/dashboard/cars"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-1 sm:flex-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="sm:inline">Back</span>
          </Link>
        </div>
      </Header>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Info Card */}
          <div className="lg:col-span-2">
            <Card title="Vehicle Information">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {car.make} {car.model}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">{car.year} • {car.color}</p>
                </div>
                <StatusBadge status={car.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Basic Details
                  </h4>
                  <DetailRow label="Make" value={car.make} />
                  <DetailRow label="Model" value={car.model} />
                  <DetailRow label="Year" value={car.year} />
                  <DetailRow label="Color" value={car.color} />
                  <DetailRow label="License Plate" value={car.licensePlate} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Status & Pricing
                  </h4>
                  <DetailRow label="Status" value={car.status} />
                  <DetailRow label="Daily Rate" value={`$${car.dailyRate}`} />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Daily Rate</p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  ${car.dailyRate}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Weekly (7 days)</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    ${(car.dailyRate * 7).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500 dark:text-gray-400">Monthly (30 days)</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    ${(car.dailyRate * 30).toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Quick Actions Card */}
            <Card title="Quick Actions">
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Create Booking
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Schedule Maintenance
                  </span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
