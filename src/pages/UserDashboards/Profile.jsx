import Card from '../../components/user/Card';
import { Link } from "react-router-dom";
import newUserIcon from "../../assets/newUserIcon.svg"; 
import editIcon from "../../assets/editIcon.svg"; 
const Profile = () => {
  return (
    <div className="flex-1 font-inter">
      <div className="text-sm text-[#838894] mb-3">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <span className="mx-2">/</span>
        <span >Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-[#52BD94] font-medium">My Profile</span>
      </div>

      <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF]">My Profile</h1>
      
      <div className="grid grid-cols-1 gap-5 p-8">
        <Card className="w-[792px] ml-10">
          <div className="flex p-6 justify-between items-start">
            <div className="flex items-center gap-6">
              {/* Profile Image */}
              <img
                src={newUserIcon} // Use public path or import if in assets
                alt="Profile Image"
                width={78}
                height={78}
                className="rounded-full"
              />
            <div>
              <h2 className="text-lg font-semibold text-white">Kaushal Kumar Anand</h2>
              <p className="text-[#838894] text-sm font-regular">kaushal@niveshreturns.com</p>
            </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-[#000814] bg-[#52BD94] hover:bg-green-600 rounded text-base font-medium">
              <img 
                src={editIcon}
                alt="Edit Icon" 
                width={18} 
                height={18} 
              />
              Edit
            </button>
          </div>
        </Card>

        <Card className="w-[792px] ml-10">
          <div className="p-6">
            <div className="flex justify-between items-start mb-5">
              <h3 className="text-lg font-semibold text-[#F1F2FF]">Personal Details</h3>
              <button className="flex items-center gap-2 px-4 py-2 text-[#000814] bg-[#52BD94] hover:bg-green-600 rounded text-base font-medium">
                <img 
                  src={editIcon}
                  alt="Edit Icon" 
                  width={18} 
                  height={18} 
                />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#424854]">First Name</label>
                  <p className="text-[#F1F2FF] text-sm font-medium">Kaushal Kumar</p>
                </div>
                <div>
                  <label className="text-sm text-[#424854]">Last Name</label>
                  <p className="text-[#F1F2FF] text-sm font-medium">Anand</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#424854]">Email</label>
                  <p className="text-[#F1F2FF] text-sm font-medium">kaushal@niveshreturns.com</p>
                </div>
                <div>
                  <label className="text-sm font-regular text-[#424854]">Phone Number</label>
                  <p className="text-[#F1F2FF] text-sm font-medium">(+91) 12345 67890</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;