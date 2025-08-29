import { useEffect, useState } from "react";
import Card from "../../components/user/Card";
import { Link } from "react-router-dom";
import upgraphIcon from "../../assets/upgraphIcon.svg";
import downgraphIcon from "../../assets/downgraphIcon.svg";
import squareIcon from "../../assets/squareIcon.svg";

const WalletPage = () => {
  const [walletData, setWalletData] = useState(null);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/wallet", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });
        const data = await res.json();  
        setWalletData(data);
      } catch (err) {
        console.error("Failed to fetch wallet:", err);
      }
    };
    fetchWallet();
  }, []);

  if (!walletData) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex-1 font-inter">
      {/* Breadcrumb */}
      <div className="text-sm text-[#838894] mb-6 px-4 lg:px-0">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/user/dashboard/profile" className="hover:text-green-500">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="text-[#52BD94] font-medium">Wallet</span>
      </div>

      <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF] px-4 lg:px-0">Wallet Overview</h1>
      <div className="grid grid-cols-1 gap-5 lg:p-8">

        {/* Wallet Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full lg:w-[916px] lg:ml-10 mx-auto">
          <Card className="h-[106px]">
            <div className="px-6 py-6 flex items-center gap-[22px] h-full">
              <img src={upgraphIcon} alt="Wallet" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Wallet Balance</h3>
                <p className="text-xl font-semibold text-white">
                  RS. {walletData.walletBalance}
                </p>
              </div>
            </div>
          </Card>

          <Card className="h-[106px]">
            <div className="px-6 py-6 flex items-center gap-[22px] h-full">
              <img src={upgraphIcon} alt="Deposits" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Total Earned</h3>
                <p className="text-xl font-semibold text-white">
                  RS. {walletData.totalEarned}
                </p>
              </div>
            </div>
          </Card>

          <Card className="h-[106px]">
            <div className="px-6 py-6 flex items-center gap-[22px] h-full">
              <img src={downgraphIcon} alt="Withdrawals" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Withdrawn</h3>
                <p className="text-xl font-semibold text-white">
                  RS. {walletData.totalWithdrawn}
                </p>
              </div>
            </div>
          </Card>

          <Card className="h-[106px]">
            <div className="px-6 py-6 flex items-center gap-[22px] h-full">
              <img src={squareIcon} alt="Transactions" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Last Credited</h3>
                <p className="text-sm font-medium text-[#54BD95]">
                  {walletData.lastCredited
                    ? new Date(walletData.lastCredited).toLocaleDateString()
                    : "No credits yet"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
