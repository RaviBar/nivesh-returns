import React, { useEffect, useState } from "react";
import Card from "../../components/user/Card";
import { Link } from "react-router-dom";
import axios from "axios";

const WithdrawalsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [user, setUser] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [loading, setLoading] = useState(true);
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(data);
      setBankDetails({
        accountHolderName: data.accountHolderName || "",
        bankName: data.bankName || "",
        accountNumber: data.accountNumber || "",
        ifscCode: data.ifscCode || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const handleChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };
  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => setShowCancelModal(true);

  const handleDiscard = () => {
    setBankDetails({
      accountHolderName: user.accountHolderName || "",
      bankName: user.bankName || "",
      accountNumber: user.accountNumber || "",
      ifscCode: user.ifscCode || "",
    });
    setIsEditing(false);
    setShowCancelModal(false);
  };

  const handleKeepEditing = () => setShowCancelModal(false);
  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/profile`, bankDetails, {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Bank details updated successfully!");
      setIsEditing(false);
      fetchProfile(); // Re-fetch to show updated data
    } catch (error) {
      console.error("Failed to update bank details:", error);
      alert(error.response?.data?.error || "Failed to update details.");
    }
  };
  if (loading) {
    return <p className="text-white">Loading...</p>;
  }
  return (
    <div className="flex-1 font-inter">
      {/* Breadcrumb */}
      <div className="text-sm text-[#838894] mb-6">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/user/dashboard/profile" className="hover:text-green-500">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="text-[#52BD94] font-medium">Withdrawals</span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF]">Withdrawals</h1>

      <div className="pt-8 lg:w-[792px]">
        {/* Saved Withdrawal Methods */}
        <Card className="lg:h-auto">
          <div className="p-4 lg:p-6">
            <h2 className="text-lg font-semibold text-[#F1F2FF] mb-5">Saved Withdrawal Methods</h2>
            <div className="text-[#F1F2FF] text-base mb-5">Bank Account Details</div>
            {bankDetails.accountNumber ? (
              <div className="flex flex-col gap-y-2.5 text-sm w-full lg:w-[306px]">
                <div className="flex justify-between">
                  <span className="text-[#FFFFFF]">Account Holder</span>
                  <span className="text-[#666D80] text-right">{bankDetails.accountHolderName}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-[#FFFFFF]">Bank Name</span>
                  <span className="text-[#666D80] text-right">{bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FFFFFF]">A/C</span>
                  <span className="text-[#666D80] text-right">XXXXX{bankDetails.accountNumber.slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FFFFFF]">IFSC Code</span>
                  <span className="text-[#666D80] text-right">{bankDetails.ifscCode}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No bank details saved. Please add them.</p>
            )}
          </div>
        </Card>
        <div className="flex justify-end w-full lg:w-[792px]">
          <button
            className="text-[#000814] px-4 lg:px-6 mt-4 lg:mt-6 py-2 lg:py-3 bg-[#52BD94] hover:bg-green-600 rounded text-sm lg:text-base font-medium"
            onClick={handleEdit}
          >
            {bankDetails.accountNumber ? "Edit" : "Add Details"}
          </button>
        </div>

        {/* Add/Edit Withdrawal Method */}
        {(isEditing || !bankDetails.accountNumber) && (
          <>
            <Card className="mt-6 lg:mt-12 h-auto">
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-semibold text-white mb-5">{bankDetails.accountNumber ? "Edit" : "Add"} Withdrawal Method</h2>
                <div className="space-y-5">
                  <div className="text-[#F1F2FF] text-base">Bank Account Details</div>
                  {/* Form Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 text-sm">
                    {/* Account Holder Name */}
                    <div className="space-y-2">
                      <div className="text-[#F1F2FF]">Account Holder Name</div>
                      <input
                        type="text"
                        name="accountHolderName"
                        value={bankDetails.accountHolderName}
                        onChange={handleChange}
                        placeholder="John Singh"
                        className="w-full bg-[#2C333F] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
                      />
                    </div>
                     {/* Bank Name */}
                    <div className="space-y-2">
                      <div className="text-[#F1F2FF]">Bank Name</div>
                      <input
                        type="text"
                        name="bankName"
                        value={bankDetails.bankName}
                        onChange={handleChange}
                        placeholder="State Bank of India"
                        className="w-full bg-[#2C333F] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
                      />
                    </div>
                    {/* Account Number */}
                    <div className="space-y-2">
                      <div className="text-[#F1F2FF]">Account Number</div>
                      <input
                        type="text"
                        name="accountNumber"
                        value={bankDetails.accountNumber}
                        onChange={handleChange}
                        placeholder="********"
                        className="w-full bg-[#2C333F] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
                      />
                    </div>
                    {/* IFSC Code */}
                    <div className="space-y-2">
                      <div className="text-[#F1F2FF]">IFSC Code</div>
                      <input
                        type="text"
                        name="ifscCode"
                        value={bankDetails.ifscCode}
                        onChange={handleChange}
                        placeholder="ABCD00123456"
                        className="w-full bg-[#2C333F] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            {/* Right-aligned Buttons */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 pt-4 justify-end">
              <button
                className="bg-[#2C333F] hover:bg-[#3a414d] text-[#F1F2FF] font-medium px-4 lg:px-8 py-2 lg:py-3 rounded-lg transition-colors"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button onClick={handleSave} className="text-[#000814] bg-[#52BD94] hover:bg-[#3fa37d] font-medium px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-colors">
                Save
              </button>
            </div>
          </>
        )}

        {/* Custom Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-[#23272F] rounded-lg p-6 lg:p-8 w-[90%] lg:w-[350px]">
              <div className="text-white text-lg font-semibold mb-4">Keep changes or discard?</div>
              <div className="text-[#838894] text-sm mb-6 text-center">
                Press <span className="font-semibold">Discard</span> to close and lose changes, or <span className="font-semibold">Keep Editing</span> to continue.
              </div>
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
                <button
                  className="bg-[#52BD94] hover:bg-green-600 text-[#000814] font-medium px-5 py-2 rounded"
                  onClick={handleDiscard}
                >
                  Discard
                </button>
                <button
                  className="bg-[#2C333F] hover:bg-[#3a414d] text-white font-medium px-5 py-2 rounded"
                  onClick={handleKeepEditing}
                >
                  Keep Editing
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WithdrawalsPage;