import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/user/Card";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.VITE_API_URL}/api/admin/users`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUsers(data);
        } catch (err) {
            setError("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const handleKycAction = async (userId, status) => {
        try {
            setError('');
            setSuccess('');
            await axios.post(`${process.env.VITE_API_URL}/api/admin/kyc/${userId}`, { status }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setSuccess(`User KYC status updated to ${status}.`);
            fetchUsers(); // Refresh the list
        } catch (err) {
            setError(err.response?.data?.error || `Failed to update KYC status.`);
        }
    }

    const getKycStatusPill = (status) => {
        switch (status) {
            case 'verified': return 'bg-green-500/20 text-green-400';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400';
            case 'rejected': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    }

    if (loading) return <p className="text-white">Loading users...</p>;

    return (
        <div className="flex-1 font-inter">
            <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF]">Manage Users</h1>
            {error && <p className="text-red-500 bg-red-500/10 p-3 rounded-lg mb-4">{error}</p>}
            {success && <p className="text-green-500 bg-green-500/10 p-3 rounded-lg mb-4">{success}</p>}
            <Card className="p-4 sm:p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-700">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-400">Name</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Contact</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">KYC Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="p-4 align-top">
                                        <p className="font-medium text-white">{user.firstName} {user.lastName}</p>
                                    </td>
                                    <td className="p-4 align-top">
                                        <p className="text-sm text-gray-300">{user.email}</p>
                                        <p className="text-xs text-gray-500">{user.phone}</p>
                                    </td>
                                    <td className="p-4 align-top">
                                        <span className={`px-3 py-1 text-xs rounded-full capitalize ${getKycStatusPill(user.kycStatus)}`}>
                                            {user.kycStatus}
                                        </span>
                                    </td>
                                    <td className="p-4 align-top">
                                        {user.kycStatus === 'pending' && (
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => handleKycAction(user._id, 'verified')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-xs">Verify</button>
                                                <button onClick={() => handleKycAction(user._id, 'rejected')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-xs">Reject</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ManageUsers;
