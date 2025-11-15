import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/user/Card";

const ManageWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.VITE_API_URL}/api/admin/withdrawals`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWithdrawals(data);
    } catch (err) {
      console.error("Failed to fetch withdrawals:", err);
      setError("Failed to fetch withdrawals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);
  
  const handleAction = async (id, action) => {
      try {
          setError('');
          setSuccess('');
          await axios.post(`${process.env.VITE_API_URL}/api/admin/withdrawals/${id}/${action}`, {}, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setSuccess(`Withdrawal successfully ${action}ed.`);
          fetchWithdrawals(); // Refresh the list
      } catch (err) {
          console.error(`Failed to ${action} withdrawal:`, err);
          setError(err.response?.data?.error || `Failed to ${action} withdrawal.`);
      }
  }

  if (loading) return <p className="text-white">Loading withdrawal requests...</p>;

  return (
    <div className="flex-1 font-inter">
      <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF]">Manage Withdrawals</h1>
      {error && <p className="text-red-500 bg-red-500/10 p-3 rounded-lg mb-4">{error}</p>}
      {success && <p className="text-green-500 bg-green-500/10 p-3 rounded-lg mb-4">{success}</p>}
      <Card className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-400">User</th>
                <th className="p-4 text-sm font-semibold text-gray-400">Amount</th>
                <th className="p-4 text-sm font-semibold text-gray-400">Bank Details</th>
                <th className="p-4 text-sm font-semibold text-gray-400">Date</th>
                <th className="p-4 text-sm font-semibold text-gray-400 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.length === 0 ? (
                <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500">No pending withdrawal requests.</td>
                </tr>
              ) : (
                withdrawals.map((w) => (
                <tr key={w._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 align-top">
                    <p className="font-medium text-white">{w.user.firstName} {w.user.lastName}</p>
                    <p className="text-xs text-gray-400">{w.user.email}</p>
                  </td>
                  <td className="p-4 align-top font-semibold text-lg text-white">₹{w.amount}</td>
                  <td className="p-4 align-top text-sm text-gray-300">
                    <p><strong>Holder:</strong> {w.bankDetails.accountHolderName}</p>
                    <p><strong>Bank:</strong> {w.bankDetails.bankName}</p>
                    <p><strong>A/C:</strong> {w.bankDetails.accountNumber}</p>
                    <p><strong>IFSC:</strong> {w.bankDetails.ifscCode}</p>
                  </td>
                  <td className="p-4 align-top text-sm text-gray-400">{new Date(w.date).toLocaleDateString()}</td>
                  <td className="p-4 align-top">
                    <div className="flex justify-center items-center gap-2">
                      <button onClick={() => handleAction(w._id, 'approve')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-xs">Approve</button>
                      <button onClick={() => handleAction(w._id, 'reject')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-xs">Reject</button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ManageWithdrawals;
