import { useState } from 'react';
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import { Outlet } from "react-router-dom";
import "../index.css";

const AdminDashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#000814]">
      <AdminNavbar toggleMobileMenu={() => setIsMobileOpen(!isMobileOpen)} />
      <div className="flex">
        <AdminSidebar
          isMobileOpen={isMobileOpen}
          closeMobileMenu={() => setIsMobileOpen(false)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-10 text-white lg:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminDashboardLayout;

