import InputField from "../../components/user/InputField";
import React, { useRef, useState } from "react";
import Card from "../../components/user/Card";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/deleteIcon.svg";
import newUserIcon from "../../assets/newUserIcon.svg";
const EditProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  return (
    <div className="flex-1 font-inter">
      <div className="text-sm text-[#838894] mb-6">
        <Link to="/user/dashboard/profile" className="hover:text-[#52BD94]">&lt; Back</Link>
      </div>

      <h1 className="text-3xl font-medium mb-8 text-[#F1F2FF]">Edit Profile</h1>
      
      <div className="w-[792px] ml-10 p-6 mb-8 flex flex-col gap-8">
        
        {/* Profile Picture Section */}
        <Card className="p-8">
          <div className="flex items-center gap-8">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-[#52BD94] flex-shrink-0">
              <img
                src={profileImage || newUserIcon}
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
                  onClick={() => fileInputRef.current.click()}
                >
                  Change
                </button>
                <button
                  type="button"
                  className="text-[#C5C7D4] px-6 py-3 bg-[#2C333F] rounded-lg text-base font-medium hover:bg-[#3a414d] transition-colors"
                  onClick={() => setProfileImage(null)}
                  disabled={!profileImage}
                >
                  Remove
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setProfileImage(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Information Section */}
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-[#F1F2FF] mb-6">Profile Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <InputField 
              label="Display Name"
              placeholder="**********"
              defaultValue=""
              disabled
              readOnly
            />
            
            <div className="space-y-2">
              <label className="block text-[#F1F2FF] text-sm mb-2">Profession</label>
              <select
                className="w-full h-[44px] bg-[#2C333F] text-[#F1F2FF] pl-4 pr-8 rounded-lg border border-[#2C333F] focus:outline-none focus:ring-2 focus:ring-[#52BD94] appearance-none"
                defaultValue=""
              >
        <option value="" disabled>Select profession</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
        <option value="student">Student</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>
  <p className="text-[#585D69] text-xs -mt-2 mb-4">
    Name entered above will be used for all issued certifies
  </p>
      

<div className="grid grid-cols-2 gap-6">
  <div className="space-y-2">
    <InputField
      label="Date of Birth"
      type="date"
      className="w-full bg-[#2C333F] rounded-lg p-3 text-[#999DAA] border border-[#2C333F]"
    />
  </div>
  <div className="space-y-2">
      <label className="block text-[#F1F2FF] text-sm mb-2">Gender <span className="text-[#EF476F]">*</span></label>
      <div className="flex items-center h-[44px] bg-[#2C333F] rounded-lg border border-[#2C333F] px-4 gap-6">
        {['Male', 'Female', 'Other'].map((gender) => (
          <label key={gender} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value={gender}
              className="accent-[#52BD94] w-4 h-4"
            />
            <span className="text-[#F1F2FF] text-sm">{gender}</span>
          </label>
        ))}
      </div>
    </div>
</div>
<div className="grid grid-cols-2 gap-6">
  <div className="space-y-2">
    <label className="text-[#F1F2FF] text-sm">Phone Number <span className="text-[#EF476F]">*</span></label>
    <div className="flex items-center -mt-2 gap-4">
      <div className="relative" style={{ width: "81px" }}>
        <select
          className="w-full h-[44px] bg-[#2C333F] text-[#999DAA] pl-4 pr-6 rounded-lg border border-[#2C333F] focus:outline-none appearance-none"
          defaultValue="+91"
            >
          <option value="+91">+91</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
          <option value="+61">+61</option>
        </select>
        {/* Custom arrow only */}
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg className="w-4 h-4 text-[#999DAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
      <InputField
        type="tel"
        placeholder="12345 67890"
        className="flex-1 mt-4 rounded-lg text-[#F1F2FF] border border-[#2C333F] h-[44px] px-4"
        label={null}
      />
    </div>
  </div>
  <div className="space-y-2 pt-1">
    <InputField
      label="About"
      as="textarea"
      placeholder="Enter Bio Details"
      className="w-full rounded-lg p-3 text-[#F1F2FF] border border-[#2C333F] h-[44px] resize-none"
    />
  </div>
</div>
      </Card>

      <Card className="p-8">
  <h2 className="text-xl font-semibold text-[#F1F2FF] mb-6">Password</h2>
  <div className="grid grid-cols-2 gap-6">
    <InputField
      label={
        <>
          Current Password
          <span className="text-[#EF476F]"> *</span>
        </>
      }
      type="password"
      placeholder="**********"
    />
    <InputField
      label={
        <>
          Change Password
          <span className="text-[#EF476F]"> *</span>
        </>
      }
      type="password"
      placeholder="**********"
    />
  </div>
</Card>

<Card className="p-8 bg-[#340019]">
  <div className="flex items-start gap-6">
    <img
      src={deleteIcon}  
      alt="Delete Account"
      width={52}
      height={52}
      className="w-[52px] h-[52px] mb-0"
    />
    <div>
      <h2 className="text-xl font-semibold text-[#F1F2FF] mb-4">Delete Account</h2>
      <p className="text-[#666D80] text-sm mb-4">
        Would you like to delete account?<br />
        This account contains Paid Courses. Deleting your account will remove all the content associated with it.
      </p>
      <div className="flex items-center gap-4">
        <span className="text-[#D43D63] italic text-base">I want to delete my account</span>
      </div>
    </div>
  </div>
</Card>
      <div className="flex gap-4 pt-4 justify-end text-base">
              <button
                className="bg-[#2C333F] hover:bg-[#3a414d] text-[#F1F2FF] font-medium px-8 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="text-[#000814] bg-[#52BD94] hover:bg-[#3fa37d] font-medium px-6 py-3 rounded-lg transition-colors">
                Save
              </button>
        </div>
      </div>
      

    </div>
  );
};

export default EditProfilePage;