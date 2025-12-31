import { useEffect, useState } from "react";
import Card from "../../components/user/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { Users, AlertTriangle, CheckCircle, Clock, CreditCard, PieChart, Wallet, TrendingUp } from 'lucide-react';


const AdminDashboard = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard-summary`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSummary(data);
            } catch (err) {
                console.error("Failed to fetch dashboard summary:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) return <p className="text-white">Loading Dashboard...</p>;
    if (!summary) return <p className="text-white">Could not load dashboard data.</p>;


    return (
        <div className="flex-1 font-inter">
            <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF]">Admin Dashboard</h1>

            {/* Actionable Cards */}
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Pending Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                 <Link to="/admin/subscriptions?filter=awaiting_approval">
                    <Card className="hover:border-yellow-400 transition-all">
                        <div className="p-6 flex items-center gap-4">
                            <Clock className="w-8 h-8 text-yellow-400" />
                            <div>
                                <h3 className="text-gray-400 text-sm">New Subscriptions</h3>
                                <p className="text-2xl font-semibold text-white">{summary.pendingSubscriptions}</p>
                            </div>
                        </div>
                    </Card>
                </Link>
                <Link to="/admin/subscriptions?filter=cancellation_requested">
                     <Card className="hover:border-orange-400 transition-all">
                        <div className="p-6 flex items-center gap-4">
                            <AlertTriangle className="w-8 h-8 text-orange-400" />
                            <div>
                                <h3 className="text-gray-400 text-sm">Cancellation Requests</h3>
                                <p className="text-2xl font-semibold text-white">{summary.cancellationRequests}</p>
                            </div>
                        </div>
                    </Card>
                </Link>
                 <Link to="/admin/withdrawals">
                    <Card className="hover:border-blue-400 transition-all">
                        <div className="p-6 flex items-center gap-4">
                            <CreditCard className="w-8 h-8 text-blue-400" />
                            <div>
                                <h3 className="text-gray-400 text-sm">Pending Withdrawals</h3>
                                <p className="text-2xl font-semibold text-white">{summary.pendingWithdrawals}</p>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>


            {/* Overview Stats */}
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Platform Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <div className="p-6 flex items-center gap-4">
                        <Users className="w-8 h-8 text-green-400" />
                        <div>
                            <h3 className="text-gray-400 text-sm">Total Users</h3>
                            <p className="text-2xl font-semibold text-white">{summary.totalUsers}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6 flex items-center gap-4">
                         <CheckCircle className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h3 className="text-gray-400 text-sm">Active Investments</h3>
                            <p className="text-2xl font-semibold text-white">₹{summary.totalInvested.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6 flex items-center gap-4">
                        <Wallet className="w-8 h-8 text-emerald-400" />
                        <div>
                            <h3 className="text-gray-400 text-sm">Total Deposited</h3>
                            <p className="text-2xl font-semibold text-white">₹{summary.platformFund?.totalDeposited?.toLocaleString() || 0}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6 flex items-center gap-4">
                        <PieChart className="w-8 h-8 text-purple-400" />
                        <div>
                            <h3 className="text-gray-400 text-sm">Available For Investment</h3>
                            <p className="text-2xl font-semibold text-white">₹{summary.platformFund?.availableForInvestment?.toLocaleString() || 0}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <h2 className="text-lg font-semibold text-gray-300 mb-4 mt-10">Fund Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                <Card>
                    <div className="p-6 flex items-center gap-4">
                        <TrendingUp className="w-8 h-8 text-pink-400" />
                        <div>
                            <h3 className="text-gray-400 text-sm">Returns Distributed</h3>
                            <p className="text-2xl font-semibold text-white">₹{summary.platformFund?.totalReturnsDistributed?.toLocaleString() || 0}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6 flex items-center gap-4">
                        <CreditCard className="w-8 h-8 text-blue-400" />
                        <div>
                            <h3 className="text-gray-400 text-sm">Total Withdrawn</h3>
                            <p className="text-2xl font-semibold text-white">₹{summary.platformFund?.totalWithdrawn?.toLocaleString() || 0}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;

