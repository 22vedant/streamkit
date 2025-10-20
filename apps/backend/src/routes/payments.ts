import { Hono } from 'hono';
import { cashfreeAuthMiddleware } from '../middleware/cashfree';
import { createOrder, resendOTP } from '../controllers/paymentController';

export const payments = new Hono();

payments.use('*', cashfreeAuthMiddleware);

payments.get('/test', (c) =>
	c.json({
		message: 'Authorized access 😈',
	})
);

payments.post('/create-order', createOrder);

payments.post('/resend-otp', resendOTP);
