import { useEffect, useState } from "react";
import Card from "../../components/user/Card";
import { Link } from "react-router-dom";
import upgraphIcon from "../../assets/upgraphIcon.svg";
import downgraphIcon from "../../assets/downgraphIcon.svg";
import squareIcon from "../../assets/squareIcon.svg";
import axios from "axios";


const WalletPage = () => {
  const [walletData, setWalletData] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleDeposit = async () => {
    setError("");
    setSuccess("");

    const amountNum = parseFloat(depositAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Enter a valid amount");
      return;
    }

    try {
        const { data: order } = await axios.post("http://localhost:5000/api/create-order",
            { amount: amountNum },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        const options = {
            key: "rzp_test_RBWTNSJF2mGBao",
            amount: order.amount,
            currency: order.currency,
            name: "Nivesh Returns",
            description: "Wallet Deposit",
            order_id: order.id,
            handler: async function (response) {
                await axios.post("http://localhost:5000/api/deposit", {
                    ...response,
                    amount: amountNum,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSuccess("Wallet credited successfully!");
                setDepositAmount("");
                fetchWallet(); // Refresh wallet data
            },
            theme: {
                color: "#25703A"
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();

    } catch (err) {
        console.error(err);
        setError("Something went wrong!");
    }
  };

  const handleWithdraw = async () => {
    setError("");
    setSuccess("");

    const amountNum = parseFloat(withdrawalAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
        setError("Enter a valid withdrawal amount");
        return;
    }

    if (!bankDetails) {
        setError("Please provide bank details for withdrawal.");
        return;
    }


    try {
        const res = await axios.post("http://localhost:5000/api/wallet/withdraw", {
                amount: amountNum,
                bankDetails,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (res.data.success) {
            setSuccess("Withdrawal request submitted successfully!");
            setWithdrawalAmount("");
            fetchWallet();
        } else {
            setError(res.data.error || "Something went wrong!");
        }
    } catch (err) {
        console.error(err);
        setError("Something went wrong!");
    }
  };

  const fetchWallet = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/wallet", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWalletData(data);
    } catch (err) {
      console.error("Failed to fetch wallet:", err);
    }
  };


  useEffect(() => {
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
      <Card className="p-6 mb-6 lg:w-[916px] lg:ml-10 mx-auto">
        <h2 className="text-lg font-semibold text-white mb-4">Add Money to Wallet</h2>
        <div className="flex flex-col md:flex-row gap-4">
            <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter amount"
            className="p-3 rounded-lg bg-[#2C333F] text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
            />
            <button
            onClick={handleDeposit}
            className="bg-[#52BD94] hover:bg-green-600 text-[#000814] px-4 py-2 rounded font-medium"
            >
            Deposit
            </button>
        </div>
        </Card>
{/* Wallet Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full lg:w-[916px] lg:ml-10 mx-auto">
          <Card className="h-[106px]">
            <div className="px-6 py-6 flex items-center gap-[22px] h-full">
              <img src={upgraphIcon} alt="Wallet" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-sm mb-[10px]">Wallet Balance</h3>
                <p className="text-xl font-semibold text-white">
                  ₹ {walletData.walletBalance}
                </p>
              </div>
            </div>
          </Card>

          <Card className="h-[106px]">
            <div className="px-6 py-6 flex items-center gap-[22px] h-full">
              <img src={upgraphIcon} alt="Deposits" className="w-[40px] h-[24px]" />
              <div>
                <h3 className="text-[#666D80] text-xs mb-[10px]">Total Deposited</h3>
                <p className="text-xl font-semibold text-white">
                  ₹ {walletData.totalDeposited}
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
                  ₹ {walletData.totalWithdrawn}
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
        <Card className="p-6 mb-6 lg:w-[916px] lg:ml-10 mx-auto">
            <h2 className="text-lg font-semibold text-white mb-4">Withdraw Funds</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="number"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="p-3 rounded-lg bg-[#2C333F] text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94]"
                />
                <input
                    type="text"
                    value={bankDetails}
                    onChange={(e) => setBankDetails(e.target.value)}
                    placeholder="Enter Bank Details (e.g., Account Number, IFSC)"
                    className="p-3 rounded-lg bg-[#2C333F] text-white focus:outline-none focus:ring-1 focus:ring-[#52BD94] flex-grow"
                />
                <button
                    onClick={handleWithdraw}
                    className="bg-[#52BD94] hover:bg-green-600 text-[#000814] px-4 py-2 rounded font-medium"
                >
                    Withdraw
                </button>
            </div>
        </Card>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}


        
      </div>
    </div>
  );
};

export default WalletPage;
