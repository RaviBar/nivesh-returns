import { NavLink, useLocation } from 'react-router-dom';
import newUserIcon from '../../assets/newUserIcon.svg';
import investmentIcon from '../../assets/investmentIcon.svg';
import shoppingIcon from '../../assets/shoppingIcon.svg';
import capIcon from '../../assets/capIcon.svg';
import settingsIcon from '../../assets/settingsIcon.svg';
import logoutIcon from '../../assets/logoutIcon.svg';

const menuItems = [
  { name: "My Profile", href: "/user/dashboard/profile", icon: newUserIcon },
  { name: "My Investments", href: "/user/dashboard/investments", icon: investmentIcon },
  { name: "My Wallet", href: "/user/dashboard/wallet", icon: shoppingIcon },
  { name: "Withdrawals", href: "/user/dashboard/withdrawals", icon: shoppingIcon },
  { name: "About Investments", href: "/user/dashboard/about-investments", icon: capIcon },
  { name: "Settings", href: "/user/dashboard/edit-profile", icon: settingsIcon },
  { name: "Log Out", href: "/", icon: logoutIcon },
];

const Sidebar = ({ isMobileOpen, closeMobileMenu }) => (
  <>
    {/* Mobile Overlay */}
    <div
      className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
        isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeMobileMenu}
    />

    {/* Desktop Sidebar (Original Layout) */}
    <aside className="hidden lg:block bg-[#161D29] text-white w-[222px] min-h-screen overflow-y-auto">
      <ul className="pt-7">
        {menuItems.map((item) => (
          <li key={item.name} className="w-auto">
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                  isActive && item.name !== "Log Out"
                    ? "bg-[#19372C] text-[#54BD95] border-l-3 border-[#54BD95]"
                    : "hover:bg-gray-800 text-[#838894]"
                } text-sm`
              }
            >
              <div className="h-4 w-4 flex-shrink-0">
                <img src={item.icon} alt={item.name} className="h-full w-full object-contain" />
              </div>
              <span className="font-inter">{item.name}</span>
            </NavLink>
            {item.name === "About Investments" && (
              <hr className="border-t-[1px] border-[#424854] w-[190px] mx-auto my-2" />
            )}
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
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                  isActive && item.name !== "Log Out"
                    ? "bg-[#19372C] text-[#54BD95] border-l-3 border-[#54BD95]"
                    : "hover:bg-gray-800 text-[#838894]"
                } text-sm`
              }
            >
              <div className="h-4 w-4 flex-shrink-0">
                <img src={item.icon} alt={item.name} className="h-full w-full object-contain" />
              </div>
              <span className="font-inter">{item.name}</span>
            </NavLink>
            {item.name === "About Investments" && (
              <hr className="border-t-[1px] border-[#424854] w-[190px] mx-auto my-2" />
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default Sidebar;