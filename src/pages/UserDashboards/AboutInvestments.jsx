import Card from "../../components/user/Card";
import { Link } from "react-router-dom";
const AboutInvestmentsPage = () => {
  return (
    <>
    <div className="flex-1 font-inter">
      {/* Breadcrumb */}
      <div className="text-sm text-[#838894] mb-6">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/user/dashboard/profile" className="hover:text-green-500">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="text-[#52BD94] font-medium">About Investments</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[#F1F2FF] mb-10">About Investments</h1>
        <p className="text-[15px] text-[#838894] font-medium">
          Learn how your money is invested to generate returns
        </p>
      </div>

      {/* Investment Sections */}
      <div className="space-y-5 w-[792px]">
        {/* E-Commerce Investment */}
        <Card>
          <div className="p-6">
            <div>
              <h2 className="text-lg font-semibold text-[#FFA200] mb-5">E-Commerce Investment</h2>
            </div>
            
            <div className="space-y-5">
              <div className="max-w-[428px]">
                <h3 className="text-[#F1F2FF] text-base font-semibold mb-2">Overview</h3>
                <p className="text-[#838894] text-[15px] font-medium">
                  A portion of your funds is invested in thriving e-commerce businesses, 
                  including investor financing and marketplace growth.
                </p>
              </div>
              
              <div className="max-w-[411px]">
                <h3 className="text-[#F1F2FF] text-base font-semibold mb-2">Returns</h3>
                <p className="text-[#838894] text-[15px] font-medium">
                  You earn a share of the monthly revenue generated from product sales and vendor profits.
                </p>
              </div>
              <h3 className="text-[#F1F2FF] text-base font-semibold mb-2">Risk Level:
              <span className="px-1 text-[#FDDB33] text-[15px] font-medium inline-block mt-2">
                 Moderate
              </span>
              </h3>
            </div>
          </div>
        </Card>

        {/* Real Estate Investments */}
        <Card>
          <div className="p-6">
            <div>
              <h2 className="text-lg font-semibold text-[#54BD95] mb-5">Real Estate Investments</h2>
            </div>
            
            <div className="space-y-5">
              <div className="max-w-[428px]">
                <h3 className="text-[#F1F2FF] text-base font-semibold mb-2">Overview</h3>
                <p className="text-[#838894] text-[15px] font-medium">
                  We allocate your capital to vetted real estate projects — both commercial and residential that offer long-term income and capital growth.
                </p>
              </div>
              
              <div className="max-w-[411px]">
                <h3 className="text-[#F1F2FF] text-base font-semibold mb-2">Returns</h3>
                <p className="text-[#838894] text-[15px] font-medium">
                  Monthly pay outs from rental income or resale profits from property developments.
                </p>
              </div>
              <h3 className="text-[#F1F2FF] text-base font-semibold mb-2">Risk Level:
              <span className="px-1 text-[#989CFC] font-medium text-sm inline-block mt-2">
                 Low to moderate
              </span>
              </h3>
            </div>
          </div>
        </Card>

        {/* Trading & Market Investments */}
        <Card>
          <div className="p-6">
            <div>
              <h2 className="text-lg font-semibold text-[#54BD95] mb-5">Trading & Market Investments</h2>
            </div>
            
            <div className="space-y-5">
              <div className="max-w-[428px]">
                <h3 className="text-[#F1F2FF] text-base font-semibold mb-2">Overview</h3>
                <p className="text-[#838894] text-[15px] font-medium">
                  Expert traders manage your funds across the stock market, mutual funds, and select crypto assets using risk-managed strategies.
                </p>
              </div>
              
              <div className="max-w-[411px]">
                <h3 className="text-[#F1F2FF] text-base font-semibold mb-2">Returns</h3>
                <p className="text-[#838894] text-[15px] font-medium">
                  Dynamic monthly returns, depending on real-time market performance. 
                </p>
              </div>
              <h3 className="text-[#F1F2FF] text-base font-semibold mb-2">Risk Level:
              <span className="px-1 text-[#FF6B7C] font-medium text-sm inline-block mt-2">
                 Medium to High
              </span>
              </h3>
              
            </div>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
};

export default AboutInvestmentsPage;