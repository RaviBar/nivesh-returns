import express from 'express';
import Plan from '../../models/Plan.js';

const router = express.Router();

// List all active plans (public)
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: 1 });
    res.json(plans.map(p => ({
      id: p._id,
      name: p.name,
      amount: p.amount,
      monthlyReturn: p.monthlyReturn,
      isPercentage: p.isPercentage,
      durationMonths: p.durationMonths
    })));
  } catch (err) {
    console.error('Failed to fetch plans:', err);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

export default router;