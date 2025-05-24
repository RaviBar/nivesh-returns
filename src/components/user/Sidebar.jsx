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

const Sidebar = () => (
  <aside className="bg-[#161D29] text-white lg:w-[222px] w-full lg:min-h-screen lg:overflow-y-auto">
    <ul className="lg:pt-7 flex lg:block overflow-x-auto">
      {menuItems.map((item) => (
        <li key={item.name} className="lg:w-auto w-[120px] flex-shrink-0">
          <NavLink
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                isActive && item.name !== "Log Out"
                  ? "bg-[#19372C] text-[#54BD95] border-l-3 border-[#54BD95]"
                  : "hover:bg-gray-800 text-[#838894]"
              } lg:text-sm text-xs`
            }
            end={item.name === "Log Out"}
          >
            <div className="h-4 w-4 flex-shrink-0">
              <img src={item.icon} alt={item.name} className="h-full w-full object-contain" />
            </div>
            <span className="text-sm font-inter lg:inline">{item.name}</span>
          </NavLink>
          {item.name === "About Investments" && (
            <hr className="border-t-[1px] border-[#424854] w-[190px] mx-auto my-2" />
          )}
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;