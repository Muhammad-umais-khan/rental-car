import { DashboardShell } from "@/components/layout";

export const metadata = {
  title: "Dashboard | Car Rental Admin",
  description: "Admin dashboard for car rental management",
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
