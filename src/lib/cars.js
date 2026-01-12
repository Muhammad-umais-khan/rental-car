import { supabase } from "./supabase";

/**
 * Fetch all cars from the database
 */
export async function getCars() {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cars:", error);
    throw error;
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
    console.error("Error fetching car:", error);
    throw error;
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
    console.error("Error creating car:", error);
    throw error;
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
    console.error("Error updating car:", error);
    throw error;
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
    console.error("Error deleting car:", error);
    throw error;
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
    console.error("Error fetching car stats:", error);
    throw error;
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
