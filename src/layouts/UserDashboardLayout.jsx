import Sidebar from "../components/user/Sidebar";
import SignedInNavbar from "../components/user/SignedInNavbar";
import { Outlet } from "react-router-dom";
import "../index.css"; 

const UserDashboardLayout = () => (
    <div className="min-h-screen bg-[#000814]">
      <SignedInNavbar />
      <div className="flex">
        <Sidebar />
      <main className="flex-1 p-10 text-white">
        <Outlet />
      </main>
    </div>
  </div>
);

export default UserDashboardLayout;