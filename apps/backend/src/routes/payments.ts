import { Hono } from 'hono';
import { cashfreePaymentsMiddleware } from '../middleware/cashfree-payments';
import { cashfreePayoutsMiddleware } from '../middleware/cashfree-payouts';

import { createOrder, resendOTP } from '../controllers/payment-controller';
import {
	addBeneficiary,
	checkBeneficiary,
} from '../controllers/payout-controller';
export const payments = new Hono();

payments.get('/test', cashfreePaymentsMiddleware, (c) =>
	c.json({
		message: 'Authorized access 😈',
	})
);
// payments API
payments.post('/create-order', cashfreePaymentsMiddleware, createOrder);
payments.post('/resend-otp', cashfreePaymentsMiddleware, resendOTP);

// payouts API
payments.post('/create-ben', cashfreePayoutsMiddleware, addBeneficiary);
payments.post('/check-ben', cashfreePayoutsMiddleware, checkBeneficiary);
// payments.post('/payout', cashfreePayoutsMiddleware, );
