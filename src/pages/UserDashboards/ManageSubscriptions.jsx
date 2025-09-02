import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/user/Card";

const ManageSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [filter, setFilter] = useState('awaiting_approval');

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:5000/api/admin/subscriptions", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setSubscriptions(data);
        } catch (err) {
            setError("Failed to fetch subscriptions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const handleAction = async (id, action) => {
        try {
            setError('');
            setSuccess('');
            const endpoint = action === 'approve' ? 'approve' : 'approve-cancellation';
            const { data } = await axios.post(`http://localhost:5000/api/admin/subscriptions/${id}/${endpoint}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setSuccess(data.message);
            fetchSubscriptions();
        } catch (err) {
            setError(err.response?.data?.error || `Failed to perform action.`);
        }
    }
    
    const getStatusPill = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-[#54BD95]';
            case 'completed': return 'bg-gray-500/20 text-gray-400';
            case 'awaiting_approval': return 'bg-yellow-500/20 text-yellow-400';
            case 'cancellation_requested': return 'bg-orange-500/20 text-orange-400';
            default: return 'bg-red-500/20 text-red-400';
        }
    }
    
    const filteredSubs = subscriptions.filter(s => filter === 'all' || s.status === filter);

    return (
        <div className="flex-1 font-inter">
            <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF]">Manage Subscriptions</h1>
             {error && <p className="text-red-500 bg-red-500/10 p-3 rounded-lg mb-4">{error}</p>}
             {success && <p className="text-green-500 bg-green-500/10 p-3 rounded-lg mb-4">{success}</p>}

            <div className="mb-4">
                <select onChange={(e) => setFilter(e.target.value)} value={filter} className="bg-[#2C333F] text-white p-2 rounded-lg">
                    <option value="all">All Subscriptions</option>
                    <option value="awaiting_approval">Awaiting Approval</option>
                    <option value="cancellation_requested">Cancellation Requested</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <Card className="p-4 sm:p-6">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-700">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-400">User</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Plan</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Amount</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Date</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center p-6 text-gray-500">Loading...</td></tr>
                            ) : filteredSubs.length === 0 ? (
                                <tr><td colSpan="6" className="text-center p-6 text-gray-500">No subscriptions match the filter.</td></tr>
                            ) : (
                                filteredSubs.map((s) => (
                                    <tr key={s._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                        <td className="p-4 align-top">
                                            <p className="font-medium text-white">{s.userId.firstName} {s.userId.lastName}</p>
                                            <p className="text-xs text-gray-400">{s.userId.email}</p>
                                        </td>
                                        <td className="p-4 align-top text-white">{s.planName}</td>
                                        <td className="p-4 align-top font-semibold text-lg text-white">₹{s.amount.toLocaleString()}</td>
                                        <td className="p-4 align-top text-sm text-gray-400">{new Date(s.startDate).toLocaleDateString()}</td>
                                        <td className="p-4 align-top">
                                            <span className={`px-3 py-1 text-xs rounded-full capitalize ${getStatusPill(s.status)}`}>{s.status.replace('_', ' ')}</span>
                                        </td>
                                        <td className="p-4 align-top text-center">
                                            {s.status === 'awaiting_approval' && <button onClick={() => handleAction(s._id, 'approve')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-xs">Approve Plan</button>}
                                            {s.status === 'cancellation_requested' && <button onClick={() => handleAction(s._id, 'approve-cancellation')} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-xs">Approve Cancellation</button>}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                 </div>
            </Card>
        </div>
    );
};

export default ManageSubscriptions;
