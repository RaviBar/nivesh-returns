import { useEffect, useState } from "react";
import Card from "../../components/user/Card";
import { Link } from "react-router-dom";
import squareIcon from "../../assets/squareIcon.svg"; 
import upGraphIcon from "../../assets/upGraphIcon.svg";

const InvestmentsPage = () => {
  const [investmentData, setInvestmentData] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/investments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });
         console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Response data:", data);
        setInvestmentData(data);
      } catch (err) {
        console.error("Failed to fetch investments:", err);
      }
    };
    fetchInvestments();
  }, []);

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
      <div className="grid grid-cols-1 gap-5 lg:p-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full lg:w-[698px] lg:ml-10 mx-auto">
          <Card>
            <div className="px-6 py-6 flex items-center gap-[22px]">
              <img src={upGraphIcon} alt="Graph Icon" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Total Invested</h3>
                <p className="text-xl font-semibold text-white">₹{investmentData.totalInvestment}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="px-8 py-6 flex items-center gap-[22px]">
              <img src={upGraphIcon} alt="Graph Icon" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Total Earned</h3>
                <p className="text-xl font-semibold text-white">₹{investmentData.totalEarned}</p>
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

  <div className="flex flex-col gap-6">
    {investmentData.subscriptions.length === 0 ? (
      <p className="text-gray-400">You haven't purchased any plans yet.</p>
    ) : (
      investmentData.subscriptions.map((sub) => (
        <div key={sub.planName + sub.status + sub.amount} className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-white">
              {sub.planName}
            </h3>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                sub.status === "active"
                  ? "bg-green-500/20 text-[#54BD95]"
                  : sub.status === "awaiting_admin"
                  ? "bg-yellow-500/20 text-[#EAE855]"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {sub.status}
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-white">Invested Amount</span>
              <span className="text-[#666D80] text-sm">₹{sub.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-white">Monthly Return</span>
              <span className="text-[#666D80] text-sm">₹{sub.monthlyReturns}</span>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>
      </div>
    </div>
  );
};

export default InvestmentsPage;
