import Card from "../../components/user/Card";
import { Link } from "react-router-dom";
import squareIcon from "../../assets/squareIcon.svg"; 
import upGraphIcon from "../../assets/upGraphIcon.svg";
const InvestmentsPage = () => {
  return (
    <div className="flex-1 font-inter">
      {/* Breadcrumb */}
      <div className="text-sm text-[#838894] mb-6">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/user/dashboard/profile" className="hover:text-green-500">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="text-[#52BD94] font-medium">My Investments</span>
      </div>

      <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF]">My Investments</h1>
      <div className="grid grid-cols-1 gap-5 p-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-[698px] ml-10">
  <Card>
    <div className="px-6 py-6 flex items-center gap-[22px]">
      {/* Image */}
      <img
        src={upGraphIcon}
        alt="Graph Icon"
        width={40}
        height={24}
        className="w-[40px] h-[24px]"
      />
      {/* Text Group */}
      <div>
        <h3 className="text-[#666D80] text-sm mb-[10px]">Total Invested</h3>
        <p className="text-xl font-semibold text-white">₹83,345</p>
      </div>
    </div>
  </Card>
  <Card>
    <div className="px-8 py-6 flex items-center gap-[22px]">
      {/* Image */}
      <img
        src={upGraphIcon}
        alt="Graph Icon"
        width={40}
        height={24}
        className="w-[40px] h-[24px]"
      />
      {/* Text Group */}
      <div>
        <h3 className="text-[#666D80] text-sm mb-[10px]">Total Earned</h3>
        <p className="text-xl font-semibold text-white">₹7,345</p>
      </div>
    </div>
  </Card>
  <Card>
    <div className="px-8 py-6 flex items-center gap-[22px]">
      {/* Image */}
      <img
        src={squareIcon}
        alt="Graph Icon"
        width={40}
        height={24}
        className="w-[40px] h-[24px]"
      />
      {/* Text Group */}
      <div>
        <h3 className="text-[#666D80] text-sm mb-[10px]">Active Plans</h3>
        <p className="text-xl font-semibold text-white">1</p>
      </div>
    </div>
  </Card>
      </div>

      {/* My Plans Section */}
      <div className="bg-[#161D29] rounded-lg border border-gray-800 p-[22px] w-[698px] h-[185px] ml-10">
        <h2 className="text-lg font-semibold text-white mb-6">My Plans</h2>
        
        <div className="grid grid-cols-[1fr_auto_1fr] gap-[33px] w-[616px]">
          {/* Starter Plan */}
          <div className="">
            <div className="flex justify-between items-start mb-[10px]">
              <h3 className="text-lg font-semibold text-white">Starter Plan</h3>
              <span className="px-3 py-1 bg-green-500/20 text-[#54BD95] text-sm rounded-full">
                Active
              </span>
            </div>
            
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-white">Invested Amount</span>
                <span className="text-[#666D80] text-sm">RS. 19,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-white">Monthly Return</span>
                <span className="text-[#666D80] text-sm">RS. 1,350</span>
              </div>
            </div>
          </div>

          <div className="h-[90px] w-[1px] bg-[#666D80]"></div>

          {/* Pro Plan */}
          <div className="">
            <div className="flex justify-between items-start mb-[10px]">
              <h3 className="text-lg font-semibold text-white">Pro Plan</h3>
              <span className="px-3 py-1 bg-yellow-500/20 text-[#EAE855] text-sm rounded-full">
                Pending
              </span>
            </div>
            
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-white">Invested Amount</span>
                <span className="text-[#666D80] text-sm">RS. 25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-white">Monthly Return</span>
                <span className="text-[#666D80] text-sm">RS. 2,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default InvestmentsPage;