import { NavLink } from 'react-router-dom';
import newUserIcon from '../../assets/newUserIcon.svg';
import investmentIcon from '../../assets/investmentIcon.svg';
import shoppingIcon from '../../assets/shoppingIcon.svg';
import logoutIcon from '../../assets/logoutIcon.svg';
import { PackageCheck } from 'lucide-react';


const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: investmentIcon },
  { name: "Manage Users", href: "/admin/users", icon: newUserIcon },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: PackageCheck },
  { name: "Withdrawals", href: "/admin/withdrawals", icon: shoppingIcon },
  { name: "Log Out", href: "/", icon: logoutIcon },
];

const AdminSidebar = ({ isMobileOpen, closeMobileMenu }) => (
  <>
    {/* Mobile Overlay */}
    <div
      className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
        isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeMobileMenu}
    />

    {/* Desktop Sidebar */}
    <aside className="hidden lg:block bg-[#161D29] text-white w-[222px] min-h-screen overflow-y-auto">
      <ul className="pt-7">
        {menuItems.map((item) => (
          <li key={item.name} className="w-auto">
            <NavLink
              to={item.href}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                  isActive && item.name !== "Log Out"
                    ? "bg-[#19372C] text-[#54BD95] border-l-3 border-[#54BD95]"
                    : "hover:bg-gray-800 text-[#838894]"
                } text-sm`
              }
            >
              <div className="h-4 w-4 flex-shrink-0">
                {item.icon === PackageCheck ? <PackageCheck className="h-full w-full object-contain text-current" /> : <img src={item.icon} alt={item.name} className="h-full w-full object-contain" />}
              </div>
              <span className="font-inter">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>

    {/* Mobile Sidebar */}
    <div
      className={`lg:hidden fixed left-0 top-[70px] h-[calc(100vh-70px)] w-[75%] bg-[#161D29] z-50 transform transition-transform ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <ul className="pt-7 h-full overflow-y-auto">
        {menuItems.map((item) => (
          <li key={item.name} className="w-full">
            <NavLink
              to={item.href}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                  isActive && item.name !== "Log Out"
                    ? "bg-[#19372C] text-[#54BD95] border-l-3 border-[#54BD95]"
                    : "hover:bg-gray-800 text-[#838894]"
                } text-sm`
              }
            >
              <div className="h-4 w-4 flex-shrink-0">
                 {item.icon === PackageCheck ? <PackageCheck className="h-full w-full object-contain text-current" /> : <img src={item.icon} alt={item.name} className="h-full w-full object-contain" />}
              </div>
              <span className="font-inter">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default AdminSidebar;

