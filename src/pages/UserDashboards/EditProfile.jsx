import InputField from "../../components/user/InputField";
import React, { useRef, useState, useEffect } from "react";
import Card from "../../components/user/Card";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/deleteIcon.svg";
import newUserIcon from "../../assets/newUserIcon.svg";
import axios from "axios";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    profession: "",
    dob: "",
    gender: "",
    about: "",
    profilePictureUrl: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
          profession: data.profession || "",
          dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
          gender: data.gender || "",
          about: data.about || "",
          profilePictureUrl: data.profilePictureUrl || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/profile`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      if (passwordData.currentPassword && passwordData.newPassword) {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/change-password`, passwordData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      alert("Profile updated successfully!");
      navigate("/user/dashboard/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error.response?.data?.error || "Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex-1 font-inter">
      <div className="text-sm text-[#838894] mb-6 px-4 lg:px-0">
        <Link to="/user/dashboard/profile" className="hover:text-[#52BD94]">
          &lt; Back
        </Link>
      </div>

      <h1 className="text-3xl font-medium mb-8 text-[#F1F2FF] px-4 lg:px-0">Edit Profile</h1>

      <div className="w-full lg:w-[792px] lg:ml-10 p-4 lg:p-6 mb-8 mx-auto flex flex-col gap-8">
        <Card className="p-4 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-[#52BD94] flex-shrink-0">
              <img
                src={formData.profilePictureUrl || newUserIcon}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-[#F1F2FF] text-lg mb-4">Change Profile Picture</h2>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="text-[#000814] px-6 py-3 bg-[#52BD94] rounded-lg text-base font-medium hover:bg-[#3fa37d] transition-colors"
                  onClick={() => alert("File upload functionality coming soon!")}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-8">
          <h2 className="text-xl font-semibold text-[#F1F2FF] mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Your first name"
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Your last name"
            />
            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
            />
            <div className="space-y-2">
              <label className="block text-[#F1F2FF] text-sm">Profession</label>
              <select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full h-[44px] bg-[#2C333F] text-[#F1F2FF] pl-4 pr-8 rounded-lg border border-[#2C333F] focus:outline-none focus:ring-2 focus:ring-[#52BD94] appearance-none"
              >
                <option value="">Select profession</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select>
            </div>
             <InputField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="w-full bg-[#2C333F] rounded-lg p-3 text-[#999DAA] border border-[#2C333F]"
            />
             <div className="space-y-2">
                <label className="block text-[#F1F2FF] text-sm mb-2">Gender</label>
                <div className="flex flex-col lg:flex-row lg:items-center gap-3 bg-[#2C333F] rounded-lg border border-[#2C333F] p-3 lg:px-4">
                    {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="flex items-center gap-2 cursor-pointer">
                        <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="accent-[#52BD94] w-4 h-4"
                        />
                        <span className="text-[#F1F2FF] text-sm">{gender}</span>
                    </label>
                    ))}
                </div>
            </div>
             <InputField
              label="About"
              name="about"
              as="textarea"
              value={formData.about}
              onChange={handleChange}
              placeholder="Enter Bio Details"
              className="w-full rounded-lg p-3 text-[#F1F2FF] border border-[#2C333F] lg:h-[44px] resize-none"
            />
          </div>
        </Card>

        <Card className="p-4 lg:p-8">
          <h2 className="text-xl font-semibold text-[#F1F2FF] mb-6">Password</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InputField
              label="Current Password"
              name="currentPassword"
              type="password"
              placeholder="**********"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
            <InputField
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="**********"
               value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </Card>

        <Card className="p-4 lg:p-8 bg-[#340019]">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <img src={deleteIcon} alt="Delete Account" width={52} height={52} />
            <div>
              <h2 className="text-xl font-semibold text-[#F1F2FF] mb-4">Delete Account</h2>
              <p className="text-[#666D80] text-sm mb-4">
                Would you like to delete account?<br />
                This account contains Paid Courses. Deleting your account will remove all the content associated with it.
              </p>
              <span className="text-[#D43D63] italic text-base">I want to delete my account</span>
            </div>
          </div>
        </Card>

        <div className="flex flex-col lg:flex-row gap-4 pt-4 justify-end">
          <button
            onClick={() => navigate("/user/dashboard/profile")}
            className="bg-[#2C333F] hover:bg-[#3a414d] text-[#F1F2FF] font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button onClick={handleSaveProfile} className="text-[#000814] bg-[#52BD94] hover:bg-[#3fa37d] font-medium px-6 py-3 rounded-lg transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;