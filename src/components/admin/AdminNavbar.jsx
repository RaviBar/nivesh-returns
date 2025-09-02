import { Link } from "react-router-dom";
import signedProfileLogo from "../../assets/signedProfilelogo.svg";
import newUserIcon from "../../assets/newUserIcon.svg";
import { Menu } from "lucide-react";

const AdminNavbar = ({ toggleMobileMenu }) => {
  return (
    <nav className="bg-[#161D29] text-white py-4 lg:px-20 px-4 flex h-[70px] items-center justify-between lg:static fixed w-full z-50">
      <div className="lg:flex-1">
        <Link to="/admin/dashboard">
          <img
            src={signedProfileLogo}
            alt="logo"
            className="lg:w-[110px] w-[80px]"
          />
        </Link>
      </div>

      <div className="hidden lg:block lg:flex-1 text-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
        <Link to="/user/dashboard/profile" className="lg:mr-4">
          <img
            src={newUserIcon}
            alt="Profile"
            className="h-7 w-7 rounded-full border border-gray-500"
          />
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;

