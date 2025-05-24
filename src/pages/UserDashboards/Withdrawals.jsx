import { useState } from "react";
import Card from "../../components/user/Card";
import { Link } from "react-router-dom";

const WithdrawalsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => setShowCancelModal(true);

  const handleDiscard = () => {
    setIsEditing(false);
    setShowCancelModal(false);
  };

  const handleKeepEditing = () => setShowCancelModal(false);

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

      <div className="pt-8 w-[792px]">
        {/* Saved Withdrawal Methods */}
        <Card>
  <div className="p-6 h-[226px]">
    <h2 className="text-lg font-semibold text-[#F1F2FF] mb-5">Saved Withdrawal Methods</h2>
    <div className="text-[#F1F2FF] text-base mb-5">Bank Account Details</div>
    <div className="flex flex-col gap-y-2.5 text-sm w-[306px]">
      <div className="flex justify-between">
        <span className="text-[#FFFFFF]">Join Carter</span>
        <span className="text-[#666D80] text-right">State Bank Of India</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#FFFFFF]">A/C</span>
        <span className="text-[#666D80] text-right">XXXXX3466</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#FFFFFF]">IFSC Code</span>
        <span className="text-[#666D80] text-right">ABCD00123456</span>
      </div>
    </div>
  </div>
</Card>
        <div className="flex justify-end w-[792px]">
          <button
            className="text-[#000814] px-6 mt-6 py-3 bg-[#52BD94] hover:bg-green-600 rounded text-base font-medium"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>

        {/* Add/Edit Withdrawal Method */}
        {isEditing && (
          <>
            <Card className="mt-12 h-[338px]">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white mb-5">Add/Edit Withdrawal Method</h2>
                <div className="space-y-5">
                  <div className="text-[#F1F2FF] text-base">Bank Account Details</div>
                  {/* Form Grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    {/* Account Holder Name */}
                    <div className="space-y-2">
                      <div className="text-[#F1F2FF]">Account Holder Name</div>
                      <input
                        type="text"
                        placeholder="John Singh"
                        className="w-full bg-[#2C333F] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
                      />
                    </div>
                    {/* Account Number */}
                    <div className="space-y-2">
                      <div className="text-[#F1F2FF]">Account Number</div>
                      <input
                        type="text"
                        placeholder="********"
                        className="w-full bg-[#2C333F] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
                      />
                      <p className="text-[#585D69] text-xs">
                        Name entered above will be used for all issued certificates.
                      </p>
                    </div>
                    {/* Bank Name */}
                    <div className="space-y-2">
                      <div className="text-[#F1F2FF]">Bank Name</div>
                      <input
                        type="text"
                        placeholder="State Bank of India"
                        className="w-full bg-[#2C333F] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
                      />
                    </div>
                    {/* IFSC Code */}
                    <div className="space-y-2">
                      <div className="text-[#F1F2FF]">IFSC Code</div>
                      <input
                        type="text"
                        placeholder="ABCD00123456"
                        className="w-full bg-[#2C333F] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            {/* Right-aligned Buttons */}
            <div className="flex gap-4 pt-4 justify-end text-base">
              <button
                className="bg-[#2C333F] hover:bg-[#3a414d] text-[#F1F2FF] font-medium px-8 py-3 rounded-lg transition-colors"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className="text-[#000814] bg-[#52BD94] hover:bg-[#3fa37d] font-medium px-6 py-3 rounded-lg transition-colors">
                Save
              </button>
            </div>
          </>
        )}

        {/* Custom Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#23272F] rounded-lg p-8 w-[350px] shadow-lg flex flex-col items-center">
              <div className="text-white text-lg font-semibold mb-4">Keep changes or discard?</div>
              <div className="text-[#838894] text-sm mb-6 text-center">
                Press <span className="font-semibold">Discard</span> to close and lose changes, or <span className="font-semibold">Keep Editing</span> to continue.
              </div>
              <div className="flex gap-4">
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