/**
 * Mock data for cars
 * In a real application, this would come from a database or API
 */

export const cars = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2024,
    color: "Silver",
    licensePlate: "ABC-1234",
    dailyRate: 65,
    status: "available",
    mileage: 12500,
    fuelType: "Hybrid",
    transmission: "Automatic",
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2023,
    color: "Blue",
    licensePlate: "XYZ-5678",
    dailyRate: 55,
    status: "rented",
    mileage: 28000,
    fuelType: "Gasoline",
    transmission: "Automatic",
  },
  {
    id: "3",
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    color: "White",
    licensePlate: "EV-9012",
    dailyRate: 120,
    status: "available",
    mileage: 5000,
    fuelType: "Electric",
    transmission: "Automatic",
  },
  {
    id: "4",
    make: "BMW",
    model: "3 Series",
    year: 2023,
    color: "Black",
    licensePlate: "BMW-3456",
    dailyRate: 95,
    status: "maintenance",
    mileage: 18000,
    fuelType: "Gasoline",
    transmission: "Automatic",
  },
  {
    id: "5",
    make: "Ford",
    model: "Mustang",
    year: 2024,
    color: "Red",
    licensePlate: "MUS-7890",
    dailyRate: 110,
    status: "available",
    mileage: 3200,
    fuelType: "Gasoline",
    transmission: "Manual",
  },
  {
    id: "6",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    color: "Gray",
    licensePlate: "MB-2468",
    dailyRate: 105,
    status: "rented",
    mileage: 22000,
    fuelType: "Gasoline",
    transmission: "Automatic",
  },
  {
    id: "7",
    make: "Hyundai",
    model: "Tucson",
    year: 2024,
    color: "Green",
    licensePlate: "HYU-1357",
    dailyRate: 70,
    status: "available",
    mileage: 8500,
    fuelType: "Hybrid",
    transmission: "Automatic",
  },
  {
    id: "8",
    make: "Chevrolet",
    model: "Malibu",
    year: 2023,
    color: "White",
    licensePlate: "CHV-8024",
    dailyRate: 58,
    status: "available",
    mileage: 31000,
    fuelType: "Gasoline",
    transmission: "Automatic",
  },
];

export const carStatuses = [
  { value: "available", label: "Available" },
  { value: "rented", label: "Rented" },
  { value: "maintenance", label: "Maintenance" },
];

export const fuelTypes = [
  { value: "Gasoline", label: "Gasoline" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
];

export const transmissionTypes = [
  { value: "Automatic", label: "Automatic" },
  { value: "Manual", label: "Manual" },
];

/**
 * Get dashboard statistics from car data
 */
export function getCarStats() {
  const totalCars = cars.length;
  const availableCars = cars.filter((car) => car.status === "available").length;
  const rentedCars = cars.filter((car) => car.status === "rented").length;
  const maintenanceCars = cars.filter((car) => car.status === "maintenance").length;
  const totalRevenuePotential = cars.reduce((sum, car) => sum + car.dailyRate, 0);

  return {
    totalCars,
    availableCars,
    rentedCars,
    maintenanceCars,
    totalRevenuePotential,
  };
}
