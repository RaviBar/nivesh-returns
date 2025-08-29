import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [subs, setSubs] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/users").then(res => setUsers(res.data));
    axios.get("/api/admin/subscriptions").then(res => setSubs(res.data));
    axios.get("/api/admin/withdrawals").then(res => setWithdrawals(res.data));
  }, []);

  const approveKYC = (id) => axios.post(`/api/admin/kyc/${id}`, { status: "verified" });
  const rejectKYC = (id) => axios.post(`/api/admin/kyc/${id}`, { status: "rejected" });
  const approveSub = (id) => axios.post(`/api/admin/subscriptions/${id}/approve`);
  const rejectSub = (id) => axios.post(`/api/admin/subscriptions/${id}/reject`);
  const approveWithdrawal = (id) => axios.post(`/api/admin/withdrawals/${id}/approve`);
  const rejectWithdrawal = (id) => axios.post(`/api/admin/withdrawals/${id}/reject`);

  return (
    <div>
      <h2>Users</h2>
      {users.map(u => (
        <div key={u._id}>
          {u.email} - KYC: {u.kycStatus}
          <button onClick={() => approveKYC(u._id)}>Approve</button>
          <button onClick={() => rejectKYC(u._id)}>Reject</button>
        </div>
      ))}
      <h2>Subscriptions</h2>
      {subs.map(s => (
        <div key={s._id}>
          {s.user.email} - {s.plan.name} - Status: {s.status}
          <button onClick={() => approveSub(s._id)}>Approve</button>
          <button onClick={() => rejectSub(s._id)}>Reject</button>
        </div>
      ))}
      <h2>Withdrawals</h2>
      {withdrawals.map(w => (
        <div key={w._id}>
          {w.user.email} - Amount: {w.amount} - Status: {w.status}
          <button onClick={() => approveWithdrawal(w._id)}>Approve</button>
          <button onClick={() => rejectWithdrawal(w._id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}