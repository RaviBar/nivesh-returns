import { useState } from 'react';
import Sidebar from "../components/user/Sidebar";
import SignedInNavbar from "../components/user/SignedInNavbar";
import { Outlet } from "react-router-dom";
import "../index.css"; 

// const UserDashboardLayout = () => (
//     <div className="min-h-screen bg-[#000814]">
//       <SignedInNavbar />
//       <div className="flex">
//         <Sidebar />
//       <main className="flex-1 p-10 text-white">
//         <Outlet />
//       </main>
//     </div>
//   </div>
// );



const UserDashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#000814]">
      <SignedInNavbar toggleMobileMenu={() => setIsMobileOpen(!isMobileOpen)} />
      
      {/* Original flex container */}
      <div className="flex">
        {/* Original sidebar usage */}
        <Sidebar 
          isMobileOpen={isMobileOpen}
          closeMobileMenu={() => setIsMobileOpen(false)}
        />
        
        {/* Main content (original classes) */}
        <main className="flex-1 p-10 text-white lg:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default UserDashboardLayout;