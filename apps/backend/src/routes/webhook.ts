import { Context, Hono } from 'hono';
import { handlePaymentWebhook } from '../utils/webhook-handler';
export const webhooks = new Hono();

webhooks.get('/', (c: Context) => {
	return c.json({
		message: 'Works fine',
	});
});

webhooks.post('/payments-response', handlePaymentWebhook);
