# Testing Checklist

## Prerequisites
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:5173
- ✅ MongoDB connected

## Test Accounts
From database query:
- **User**: w2588783@gmail.com (existing user)
- **Admin**: ritik11@gmail.com (existing admin)
- **Admin**: ravibaraskar108@gmail.com (existing admin)

*Note: You'll need to reset passwords or use existing credentials*

## Testing Flow

### 1. User Registration & Login ✓
- [ ] Navigate to `/signup`
- [ ] Register new user
- [ ] Verify email validation
- [ ] Login with credentials
- [ ] Check JWT token stored

### 2. Wallet Operations ✓
- [ ] Navigate to `/user/dashboard/wallet`
- [ ] Click "Deposit" 
- [ ] Use Razorpay test mode (card: 4111 1111 1111 1111)
- [ ] Verify wallet balance updates
- [ ] Check transaction in ledger

### 3. Plan Purchase ✓
- [ ] Navigate to `/user/dashboard/plans`
- [ ] View available plans (fetched from `/api/plans`)
- [ ] Click "BUY NOW" on a plan
- [ ] Verify wallet deduction
- [ ] Check subscription status = "awaiting_approval"

### 4. View Investments ✓
- [ ] Navigate to `/user/dashboard/investments`
- [ ] Verify purchased plan appears
- [ ] Status should be "Awaiting Approval"
- [ ] Check summary cards (Total Invested, Earned, Active Plans)

### 5. Admin Login ✓
- [ ] Logout from user account
- [ ] Login with admin credentials
- [ ] Should redirect to `/admin/dashboard`

### 6. Admin Dashboard ✓
- [ ] View platform metrics
- [ ] Check "Pending Actions" cards
- [ ] Verify Platform Fund metrics:
  - Total Deposited
  - Total Invested
  - Available for Investment
  - Returns Distributed

### 7. Approve Subscription ✓
- [ ] Navigate to `/admin/subscriptions`
- [ ] Filter by "Awaiting Approval"
- [ ] Click "Approve Plan"
- [ ] Verify status changes to "Active"
- [ ] Check `nextReturnDate` is set

### 8. Verify Active Investment ✓
- [ ] Logout and login as user
- [ ] Navigate to `/user/dashboard/investments`
- [ ] Verify plan status = "Active"
- [ ] Check countdown timer to next return
- [ ] View maturity date

### 9. Request Withdrawal ✓
- [ ] Navigate to `/user/dashboard/wallet`
- [ ] Add bank details if not present
- [ ] Enter withdrawal amount
- [ ] Click "Request Withdrawal"
- [ ] Verify request created

### 10. Admin Approve Withdrawal ✓
- [ ] Login as admin
- [ ] Navigate to `/admin/withdrawals`
- [ ] View pending withdrawal
- [ ] Click "Approve"
- [ ] Verify user wallet debited
- [ ] Check PlatformFund.totalWithdrawn updated

### 11. Cancel Subscription ✓
- [ ] Login as user
- [ ] Navigate to investments
- [ ] Click "Request Cancellation" on active plan
- [ ] Login as admin
- [ ] Navigate to `/admin/subscriptions`
- [ ] Filter by "Cancellation Requested"
- [ ] Click "Approve Cancellation"
- [ ] Verify principal returned to user wallet

### 12. Cron Job Testing (Manual)
To test returns cron without waiting:

1. In MongoDB, update a subscription:
```javascript
db.subscriptions.updateOne(
  { status: "active" },
  { $set: { nextReturnDate: new Date() } }
)
```

2. Run cron manually in server terminal:
```javascript
import('./cron/returnsJob.js').then(m => m.creditMonthlyReturns())
```

3. Verify:
- [ ] User wallet credited with monthly return
- [ ] Ledger entry created
- [ ] `nextReturnDate` updated to +1 month
- [ ] `returnsHistory` array updated
- [ ] PlatformFund.totalReturnsDistributed increased

### 13. Plan Maturity Testing
1. Update subscription `endDate` to past:
```javascript
db.subscriptions.updateOne(
  { status: "active" },
  { $set: { endDate: new Date() } }
)
```

2. Run cron job
3. Verify:
- [ ] Principal returned to wallet
- [ ] Subscription marked `matured: true`
- [ ] Status = "completed"
- [ ] PlatformFund.totalInvested decreased

## API Endpoint Tests (via Postman/Thunder Client)

### Public Endpoints
```
GET  /api/plans
POST /api/auth/signup
POST /api/auth/login
```

### User Endpoints (with Bearer token)
```
GET  /api/wallet
POST /api/create-order
POST /api/deposit
POST /api/purchase-plan
GET  /api/investments
POST /api/wallet/withdraw
```

### Admin Endpoints (admin token required)
```
GET  /api/admin/dashboard-summary
GET  /api/admin/platform-fund
GET  /api/admin/subscriptions
POST /api/admin/subscriptions/:id/approve
GET  /api/admin/withdrawals
POST /api/admin/withdrawals/:id/approve
GET  /api/admin/users
```

## Common Issues

### Login 500 Error
- ✅ Fixed with try-catch in auth.js
- Check JWT_SECRET in .env
- Verify MongoDB connection

### CORS Error
- Check FRONTEND_ORIGIN in server/.env
- Ensure credentials: true in CORS config

### Wallet Not Updating
- Check PlatformFund model exists in DB
- Verify Razorpay webhook/callback
- Check Ledger entries

### Plans Not Loading
- Seed plans in MongoDB first
- Check /api/plans endpoint
- Verify planId sent in purchase

## Performance Checks
- [ ] Dashboard loads < 2s
- [ ] Plan purchase completes < 1s
- [ ] Admin panel responsive
- [ ] No console errors
- [ ] No React warnings (priority attribute fixed)

## Security Checks
- [ ] JWT expires after 7 days
- [ ] Passwords hashed with bcrypt
- [ ] Admin routes protected
- [ ] User can't access other users' data
- [ ] Withdrawal requires bank details
- [ ] Cannot withdraw locked investment funds
