"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout";
import { Button, Input, Select, Card } from "@/components/ui";
import { carStatuses } from "@/data/cars";
import { createCar } from "@/lib/cars";
import Link from "next/link";

const initialFormState = {
  make: "",
  model: "",
  year: "",
  color: "",
  licensePlate: "",
  dailyRate: "",
  status: "available",
};

const initialErrors = {};

export default function AddCarPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Make validation
    if (!formData.make.trim()) {
      newErrors.make = "Make is required";
    } else if (formData.make.trim().length < 2) {
      newErrors.make = "Make must be at least 2 characters";
    }

    // Model validation
    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    }

    // Year validation
    const currentYear = new Date().getFullYear();
    const year = parseInt(formData.year);
    if (!formData.year) {
      newErrors.year = "Year is required";
    } else if (isNaN(year) || year < 1990 || year > currentYear + 1) {
      newErrors.year = `Year must be between 1990 and ${currentYear + 1}`;
    }

    // Color validation
    if (!formData.color.trim()) {
      newErrors.color = "Color is required";
    }

    // License plate validation
    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = "License plate is required";
    } else if (formData.licensePlate.trim().length < 4) {
      newErrors.licensePlate = "License plate must be at least 4 characters";
    }

    // Daily rate validation
    const rate = parseFloat(formData.dailyRate);
    if (!formData.dailyRate) {
      newErrors.dailyRate = "Daily rate is required";
    } else if (isNaN(rate) || rate <= 0) {
      newErrors.dailyRate = "Daily rate must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createCar(formData);
      setSubmitSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push("/dashboard/cars");
      }, 1500);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors(initialErrors);
    setSubmitSuccess(false);
  };

  return (
    <>
      <Header title="Add New Car">
        <Link
          href="/dashboard/cars"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Cars
        </Link>
      </Header>
      <div className="p-4 sm:p-6 max-w-3xl">
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-800 dark:text-green-200 font-medium">
                Car added successfully! Redirecting...
              </p>
            </div>
          </div>
        )}

        <Card
          title="Car Information"
          description="Fill in the details below to add a new car to the fleet"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
                Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  placeholder="e.g., Toyota"
                  error={errors.make}
                  required
                />
                <Input
                  label="Model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g., Camry"
                  error={errors.model}
                  required
                />
                <Input
                  label="Year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g., 2024"
                  error={errors.year}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  required
                />
                <Input
                  label="Color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g., Silver"
                  error={errors.color}
                  required
                />
              </div>
            </div>

            {/* License & Rental Details Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
                License & Rental Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="License Plate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  placeholder="e.g., ABC-1234"
                  error={errors.licensePlate}
                  required
                />
                <Input
                  label="Daily Rate ($)"
                  name="dailyRate"
                  type="number"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  placeholder="e.g., 65"
                  error={errors.dailyRate}
                  min="1"
                  step="0.01"
                  required
                />
                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={carStatuses}
                  placeholder="Select status"
                  error={errors.status}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="ghost"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || submitSuccess}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding Car...
                  </>
                ) : (
                  "Add Car"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
