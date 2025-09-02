import { useEffect, useState } from "react";
import Card from "../../components/user/Card";
import { Link } from "react-router-dom";
import squareIcon from "../../assets/squareIcon.svg"; 
import upGraphIcon from "../../assets/upGraphIcon.svg";
import axios from "axios";
import { ChevronDown, ChevronUp } from 'lucide-react';

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && interval !== 'seconds' && Object.keys(timerComponents).length === 0) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Returns processing!</span>}
    </div>
  );
};

const PlanGroup = ({ planName, subs, onCancel }) => {
    const [isOpen, setIsOpen] = useState(true);

    const totalInvestedInPlan = subs.filter(sub => sub.status === 'active').reduce((sum, sub) => sum + sub.amount, 0);
    const activeSubsCount = subs.filter(sub => sub.status === 'active').length;

    const getStatusPill = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-[#54BD95]';
            case 'completed': return 'bg-gray-500/20 text-gray-400';
            case 'awaiting_approval': return 'bg-yellow-500/20 text-yellow-400';
            case 'cancellation_requested': return 'bg-orange-500/20 text-orange-400';
            default: return 'bg-red-500/20 text-red-400';
        }
    }

    return (
        <div className="p-4 border-b border-gray-700">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <h3 className="text-lg font-semibold text-white">{planName}</h3>
                    <p className="text-sm text-gray-400">{activeSubsCount} Active Subscription(s) | Total Invested: ₹{totalInvestedInPlan.toLocaleString()}</p>
                </div>
                {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
            </div>

            {isOpen && (
                <div className="mt-4 pl-4 border-l-2 border-gray-600">
                    {subs.map((sub) => (
                        <div key={sub._id} className="mb-4 pb-2 border-b border-gray-800 last:border-b-0">
                             <div className="flex justify-between items-start mb-2">
                                <p className="text-sm text-gray-300">
                                  Purchased on: {new Date(sub.startDate).toLocaleDateString()}
                                </p>
                                <span className={`px-3 py-1 text-xs rounded-full capitalize ${getStatusPill(sub.status)}`}>
                                  {sub.status.replace('_', ' ')}
                                </span>
                            </div>
                            <div className="space-y-2.5">
                                <div className="flex justify-between">
                                <span className="text-sm font-semibold text-white">Invested Amount</span>
                                <span className="text-[#666D80] text-sm">₹{sub.amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                <span className="text-sm font-semibold text-white">Monthly Return</span>
                                <span className="text-[#666D80] text-sm">₹{sub.monthlyReturns.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                <span className="text-sm font-semibold text-white">Total Earned on this Plan</span>
                                <span className="text-[#666D80] text-sm">₹{sub.totalEarned.toLocaleString()}</span>
                                </div>
                                {sub.status === "active" && sub.nextReturnDate && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-white">Next Return In</span>
                                    <div className="text-[#54BD95] text-sm font-medium">
                                        <Countdown targetDate={sub.nextReturnDate} />
                                    </div>
                                </div>
                                )}
                                {sub.status === 'active' && (
                                    <div className="text-right pt-2">
                                        <button 
                                            onClick={() => onCancel(sub._id)}
                                            className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/40 px-3 py-1 rounded-md">
                                            Request Cancellation
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
const InvestmentsPage = () => {
  const [investmentData, setInvestmentData] = useState(null);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const fetchInvestments = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/investments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setInvestmentData(data);
    } catch (err) {
      console.error("Failed to fetch investments:", err);
      setFeedback({message: 'Failed to fetch investments.', type: 'error'})
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleCancelRequest = async (subId) => {
      if (!window.confirm("Are you sure you want to request cancellation for this plan? The principal amount will be returned to your wallet upon admin approval.")) return;
      
      try {
          setFeedback({ message: '', type: '' });
          const { data } = await axios.post(`http://localhost:5000/api/investments/subscriptions/${subId}/request-cancellation`, {}, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setFeedback({ message: data.message, type: 'success' });
          fetchInvestments(); // Refresh data
      } catch (error) {
          setFeedback({ message: error.response?.data?.error || 'Failed to request cancellation.', type: 'error' });
      }
  }

  const groupedSubscriptions = investmentData?.subscriptions.reduce((acc, sub) => {
    (acc[sub.planName] = acc[sub.planName] || []).push(sub);
    return acc;
  }, {});

  if (!investmentData) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex-1 font-inter">
      {/* Breadcrumb */}
      <div className="text-sm text-[#838894] mb-6 px-4 lg:px-0">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/user/dashboard/profile" className="hover:text-green-500">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="text-[#52BD94] font-medium">My Investments</span>
      </div>

      <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF] px-4 lg:px-0">My Investments</h1>
        {feedback.message && (
            <div className={`p-4 rounded-lg mb-6 ${feedback.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {feedback.message}
            </div>
        )}
      <div className="grid grid-cols-1 gap-5 lg:p-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full lg:w-[698px] lg:ml-10 mx-auto">
          <Card>
            <div className="px-6 py-6 flex items-center gap-[22px]">
              <img src={upGraphIcon} alt="Graph Icon" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Total Invested</h3>
                <p className="text-xl font-semibold text-white">₹{investmentData.totalInvestment.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="px-8 py-6 flex items-center gap-[22px]">
              <img src={upGraphIcon} alt="Graph Icon" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Total Earned</h3>
                <p className="text-xl font-semibold text-white">₹{investmentData.totalEarned.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="px-8 py-6 flex items-center gap-[22px]">
              <img src={squareIcon} alt="Graph Icon" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Active Plans</h3>
                <p className="text-xl font-semibold text-white">{investmentData.activePlans}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* My Plans Section */}
        <div className="bg-[#161D29] rounded-lg border border-gray-800 p-4 lg:p-[22px] w-full lg:w-[698px] lg:ml-10 mx-auto min-h-[185px]">
          <h2 className="text-lg font-semibold text-white mb-6">My Plans</h2>
          <div className="flex flex-col gap-2">
            {investmentData.subscriptions.length === 0 ? (
              <p className="text-gray-400">You haven't purchased any plans yet.</p>
            ) : (
                Object.entries(groupedSubscriptions).map(([planName, subs]) => (
                    <PlanGroup key={planName} planName={planName} subs={subs} onCancel={handleCancelRequest} />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsPage;
