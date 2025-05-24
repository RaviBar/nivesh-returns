import Card from "../../components/user/Card";
import { Link } from "react-router-dom";
import upgraphIcon from "../../assets/upgraphIcon.svg";
import downgraphIcon from "../../assets/downgraphIcon.svg";
import squareIcon from "../../assets/squareIcon.svg";
const WalletPage = () => {
  return (
    <div className="flex-1 font-inter">
      {/* Breadcrumb */}
      <div className="text-sm text-[#838894] mb-6">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/user/dashboard/profile" className="hover:text-green-500">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="text-[#52BD94] font-medium">Wallet</span>
      </div>

      <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF]">Wallet Overview</h1>
      <div className="grid grid-cols-1 gap-5 p-8">
      {/* Wallet Summary Cards */}
      <div className="grid grid-cols-4 gap-5 w-[916px] ml-10">
        <Card className="h-[106px]">
          <div className="px-6 py-6 flex items-center gap-[22px] h-full">
            <img
              src={upgraphIcon}
              alt="Wallet"
              width={40}
              height={24}
              className="w-[40px] h-[24px]"
            />
            <div>
              <h3 className="text-[#666D80] text-sm mb-[10px]">Wallet Balance</h3>
              <p className="text-xl font-semibold text-white">RS. 9,345</p>
            </div>
          </div>
        </Card>

        <Card className="h-[106px]">
          <div className="px-6 py-6 flex items-center gap-[22px] h-full">
            <img
              src={upgraphIcon}
              alt="Deposits"
              width={40}
              height={24}
              className="w-[40px] h-[24px]"
            />
            <div>
              <h3 className="text-[#666D80] text-sm mb-[10px]">Total Earned</h3>
              <p className="text-xl font-semibold text-white">RS. 7,345</p>
            </div>
          </div>
        </Card>

        <Card className="h-[106px]">
          <div className="px-6 py-6 flex items-center gap-[22px] h-full">
            <img
              src={downgraphIcon}
              alt="Withdrawals"
              width={40}
              height={24}
              className="w-[40px] h-[24px]"
            />
            <div>
              <h3 className="text-[#666D80] text-sm mb-[10px]">Withdrawn</h3>
              <p className="text-xl font-semibold text-white">RS. 7,155</p>
            </div>
          </div>
        </Card>

        <Card className="h-[106px]">
          <div className="px-6 py-6 flex items-center gap-[22px] h-full">
            <img
              src={squareIcon}
              alt="Transactions"
              width={40}
              height={24}
              className="w-[40px] h-[24px]"
            />
            <div>
              <h3 className="text-[#666D80] text-sm mb-[10px]">Last Credited</h3>
              <p className="text-sm font-medium text-[#54BD95]">12 Apr 2024</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Transaction History Section */}
      <div className="bg-[#161D29] rounded-lg border border-gray-800 p-6 ml-10 h-[256px] w-[600px]">
  <h2 className="text-lg font-semibold text-white mb-5">Withdraw funds from your wallet</h2>

  <div className="">
    {/* Available Balance */}
    <h2 className="text-[#F1F2FF] text-sm mb-[6px]">Available Balance</h2>
    <div className="flex justify-between items-center bg-[#2C333F] mb-[6px] w-[383px] h-[48px] rounded-lg p-4">
      <span className="text-[#999DAA] text-base font-medium">RS. 9,345</span>
    </div>

    {/* Processing Info */}
    <p className="text-[#54BD95] text-xs mb-5">
      Withdrawals are processed within 24–48 hrs. You will be notified after admin approval.
    </p>

    {/* Withdrawal Form */}
      <button className="w-[195px] bg-[#52BD94] hover:bg-[#3fa37d] text-[#000814] font-medium py-3 rounded-lg transition-colors">
          Request Withdrawal
        </button>
  </div>
      </div>
      </div>
    </div>
  );
};

export default WalletPage;