# Investment Flow Documentation

## How Money Works in Nivesh Returns

This document explains the complete lifecycle of money in the platform, from user deposits to admin-managed investments.

## Flow Diagram

```
User Deposits ₹10,000
       ↓
Wallet Balance = ₹10,000
       ↓
User Buys Plan (₹5,000)
       ↓
Wallet Balance = ₹5,000 (awaiting admin)
       ↓
Admin Approves Investment
       ↓
Subscription Status = "active"
Investment Balance = ₹5,000 (locked)
       ↓
Cron Job (Daily at Midnight)
       ↓
Monthly Returns Credited → Wallet Balance += ₹500
       ↓
After N months (Plan Duration)
       ↓
Plan Matures → Principal Returned
Wallet Balance += ₹5,000
       ↓
User Requests Withdrawal
       ↓
Admin Approves → Money Sent to Bank
Wallet Balance -= withdrawn amount
```

## Platform Fund Metrics

The `PlatformFund` model tracks aggregate metrics across the entire platform:

- **Total Deposited**: All user deposits via Razorpay
- **Total Invested**: Money locked in active subscriptions
- **Total Returns Distributed**: Monthly profits paid to users
- **Total Withdrawn**: Money transferred to user bank accounts
- **Available for Investment**: `Deposited - Invested - Returns - Withdrawn`

### Admin View

Admins see these metrics on the dashboard. The "Available for Investment" represents **real cash** that can be invested in external markets/instruments.

## User Wallet States

### Wallet Balance
- Available for withdrawal
- Can be used to purchase plans
- Receives monthly returns
- Receives principal on maturity

### Investment Balance (Locked)
- Money currently in active plans
- Cannot be withdrawn until maturity or cancellation approval
- Tracked per subscription

## Subscription States

1. **awaiting_approval**: User purchased, money deducted, waiting for admin
2. **active**: Admin approved, returns start accruing
3. **cancellation_requested**: User wants to exit, admin reviewing
4. **completed**: Plan matured, principal returned
5. **rejected**: Admin denied (money refunded)

## Cron Job Behavior

Runs daily at `00:00` (midnight):

```javascript
for each active subscription:
  if (today >= nextReturnDate):
    credit monthly return to wallet
    update nextReturnDate to +1 month
    log in returnsHistory
    update PlatformFund.totalReturnsDistributed
  
  if (today >= endDate && !matured):
    return principal to wallet
    mark matured = true
    status = "completed"
    reduce PlatformFund.totalInvested
```

## Admin Workflow

### When User Purchases Plan:
1. Check subscription queue (`/admin/subscriptions?filter=awaiting_approval`)
2. Verify user KYC status
3. Approve → money officially invested
4. Reject → refund to wallet

### When User Requests Cancellation:
1. Review cancellation request
2. Approve → return principal to wallet
3. Reject → keep subscription active

### When User Requests Withdrawal:
1. Check wallet balance >= requested amount
2. Verify bank details
3. Approve → initiate payout (Razorpay Payouts API)
4. Update user wallet and PlatformFund.totalWithdrawn

## Security Considerations

- Users cannot withdraw locked investment funds
- Admin approval required for all plan activations
- Withdrawal requests create audit trail
- All transactions logged in Ledger model
- JWT tokens expire after 7 days

## Testing the Flow Locally

1. **Start backend**: `cd server && npm start`
2. **Register user**: Sign up via frontend
3. **Deposit money**: Use Razorpay test keys (test mode)
4. **Buy plan**: Select plan, purchase with wallet balance
5. **Login as admin**: Use admin credentials
6. **Approve subscription**: Navigate to admin panel
7. **Simulate returns**: Manually adjust `nextReturnDate` in DB to trigger cron
8. **Request withdrawal**: As user, request withdrawal
9. **Approve withdrawal**: As admin, approve request

## Environment Setup

Ensure these are set in `server/.env`:

```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_secret
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
```

## Database Seeding (Optional)

To create initial plans, run in MongoDB:

```javascript
db.plans.insertMany([
  {
    name: "Starter Plan",
    amount: 13500,
    monthlyReturn: 10, // 10% of principal
    isPercentage: true,
    durationMonths: 12
  },
  {
    name: "Growth Plan",
    amount: 25000,
    monthlyReturn: 2500,
    isPercentage: false,
    durationMonths: 6
  }
]);
```
