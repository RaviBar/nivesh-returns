import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EmailVerificationPage from './pages/EmailVerification';
import Profile from './pages/UserDashboards/Profile';
import PlansPage from './pages/UserDashboards/PlansPage';
import EditProfilePage from './pages/UserDashboards/EditProfile';
import InvestmentsPage from './pages/UserDashboards/Investments';
import WalletPage from './pages/UserDashboards/Wallet';
import DashboardWithdrawals from './pages/UserDashboards/Withdrawals';
import DashboardAboutInvestments from './pages/UserDashboards/AboutInvestments';
import UserDashboardLayout from "./layouts/UserDashboardLayout";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminDashboard from './pages/AdminDashboards/admin';
import ManageWithdrawals from './pages/AdminDashboards/manageWithdrawals';
import ManageSubscriptions from './pages/UserDashboards/ManageSubscriptions';
import ManageUsers from './pages/AdminDashboards/ManageUsers';
import Layout from "./layouts/Layout";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
    </Route>

    {/* User Dashboard Routes */}
    <Route element={<UserDashboardLayout />}>
        <Route path="/user/dashboard/profile" element={<Profile />} />
        <Route path="/user/dashboard/plans" element={<PlansPage />} />
        <Route path="/user/dashboard/edit-profile" element={<EditProfilePage />} />
        <Route path="/user/dashboard/investments" element={<InvestmentsPage />} />
        <Route path="/user/dashboard/wallet" element={<WalletPage />} />
        <Route path="/user/dashboard/withdrawals" element={<DashboardWithdrawals />} />
        <Route path="/user/dashboard/about-investments" element={<DashboardAboutInvestments />} />
    </Route>

    {/* Admin Dashboard Routes */}
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    <Route element={<AdminDashboardLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/subscriptions" element={<ManageSubscriptions />} />
        <Route path="/admin/withdrawals" element={<ManageWithdrawals />} />
        <Route path="/admin/users" element={<ManageUsers />} />
    </Route>

  </Routes>
);

export default AppRoutes;

