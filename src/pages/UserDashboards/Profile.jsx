import Card from '../../components/user/Card';
import { Link } from "react-router-dom";
import newUserIcon from "../../assets/newUserIcon.svg"; 
import editIcon from "../../assets/editIcon.svg"; 
import { useEffect, useState } from "react";
import axios from "axios";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-white">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-white">Could not load profile.</p>;
  }
  return (
    <div className="flex-1 font-inter">
      <div className="text-sm text-[#838894] mb-3 px-4 lg:px-0">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <span className="mx-2">/</span>
        <span >Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-[#52BD94] font-medium">My Profile</span>
      </div>

      <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF] px-4 lg:px-0">My Profile</h1>
      
      <div className="grid grid-cols-1 gap-5 lg:p-8">
        <Card className="w-full lg:w-[792px] lg:ml-10 mx-auto">
          <div className="flex flex-col lg:flex-row p-6 justify-between items-start gap-4">
            <div className="flex items-center gap-6"> 
              {/* Profile Image */}
              <img
                src={user.profilePictureUrl || newUserIcon} // Use public path or import if in assets
                alt="Profile Image"
                width={78}
                height={78}
                className="rounded-full"
              />
            <div>
              <h2 className="text-lg font-semibold text-white">{`${user.firstName} ${user.lastName}`}</h2>
              <p className="text-[#838894] text-sm font-regular">{user.email}</p>
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

        <Card className="w-full lg:w-[792px] lg:ml-10 mx-auto">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start mb-5 gap-4">
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
                  <p className="text-[#F1F2FF] text-sm font-medium">{user.firstName}</p>
                </div>
                <div>
                  <label className="text-sm text-[#424854]">Last Name</label>
                  <p className="text-[#F1F2FF] text-sm font-medium">{user.lastName}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#424854]">Email</label>
                  <p className="text-[#F1F2FF] text-sm font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-regular text-[#424854]">Phone Number</label>
                  <p className="text-[#F1F2FF] text-sm font-medium">{user.phone || 'Not provided'}</p>
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