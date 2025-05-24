import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EmailVerificationPage from './pages/EmailVerification';
import Profile from './pages/UserDashboards/Profile';
import EditProfilePage from './pages/UserDashboards/EditProfile';
import InvestmentsPage from './pages/UserDashboards/Investments';
import WalletPage from './pages/UserDashboards/Wallet';
import DashboardWithdrawals from './pages/UserDashboards/Withdrawals';
import DashboardAboutInvestments from './pages/UserDashboards/AboutInvestments';
import UserDashboardLayout from "./layouts/UserDashboardLayout";
import Layout from "./layouts/Layout";
const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
    </Route>
    <Route element={<UserDashboardLayout />}>
        <Route path="/user/dashboard/profile" element={<Profile />} />
        <Route path="/user/dashboard/edit-profile" element={<EditProfilePage />} />
        <Route path="/user/dashboard/investments" element={<InvestmentsPage />} />
        <Route path="/user/dashboard/wallet" element={<WalletPage />} />
        <Route path="/user/dashboard/withdrawals" element={<DashboardWithdrawals />} />
        <Route path="/user/dashboard/about-investments" element={<DashboardAboutInvestments />} />
    </Route>
  </Routes>
);

export default AppRoutes;