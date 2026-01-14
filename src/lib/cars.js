import { supabase } from "./supabase";

/**
 * Custom error class for car-related operations
 */
class CarServiceError extends Error {
  constructor(message, originalError = null) {
    super(message);
    this.name = "CarServiceError";
    this.originalError = originalError;
  }
}

/**
 * Handle Supabase errors consistently
 */
function handleError(operation, error) {
  console.error(`Error ${operation}:`, error);
  
  // Map common errors to user-friendly messages
  const userMessage = {
    fetch: "Failed to load cars. Please refresh the page.",
    create: "Failed to add car. Please try again.",
    update: "Failed to update car. Please try again.",
    delete: "Failed to delete car. Please try again.",
    stats: "Failed to load statistics. Please refresh the page.",
  };
  
  throw new CarServiceError(userMessage[operation] || "An unexpected error occurred.", error);
}

/**
 * Fetch all cars from the database
 */
export async function getCars() {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    handleError("fetch", error);
  }

  return data;
}

/**
 * Fetch a single car by ID
 */
export async function getCarById(id) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    handleError("fetch", error);
  }

  return data;
}

/**
 * Create a new car
 */
export async function createCar(carData) {
  const { data, error } = await supabase
    .from("cars")
    .insert([{
      make: carData.make,
      model: carData.model,
      year: parseInt(carData.year),
      color: carData.color,
      license_plate: carData.licensePlate,
      daily_rate: parseFloat(carData.dailyRate),
      status: carData.status || "available",
    }])
    .select()
    .single();

  if (error) {
    handleError("create", error);
  }

  return data;
}

/**
 * Update an existing car
 */
export async function updateCar(id, carData) {
  const { data, error } = await supabase
    .from("cars")
    .update({
      make: carData.make,
      model: carData.model,
      year: parseInt(carData.year),
      color: carData.color,
      license_plate: carData.licensePlate,
      daily_rate: parseFloat(carData.dailyRate),
      status: carData.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    handleError("update", error);
  }

  return data;
}

/**
 * Delete a car
 */
export async function deleteCar(id) {
  const { error } = await supabase
    .from("cars")
    .delete()
    .eq("id", id);

  if (error) {
    handleError("delete", error);
  }

  return true;
}

/**
 * Helper to convert database row to frontend format
 */
export function formatCarFromDb(car) {
  return {
    id: car.id,
    make: car.make,
    model: car.model,
    year: car.year,
    color: car.color,
    licensePlate: car.license_plate,
    dailyRate: parseFloat(car.daily_rate),
    status: car.status,
    createdAt: car.created_at,
    updatedAt: car.updated_at,
  };
}

/**
 * Get cars count by status and revenue potential
 */
export async function getCarStats() {
  const { data, error } = await supabase
    .from("cars")
    .select("status, daily_rate");

  if (error) {
    handleError("stats", error);
  }

  const totalRevenue = data.reduce((sum, car) => sum + parseFloat(car.daily_rate || 0), 0);

  return {
    total: data.length,
    available: data.filter(c => c.status === "available").length,
    rented: data.filter(c => c.status === "rented").length,
    maintenance: data.filter(c => c.status === "maintenance").length,
    totalRevenuePotential: totalRevenue.toFixed(2),
  };
}
