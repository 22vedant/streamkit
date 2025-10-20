import { Context } from 'hono';
import { cashfreeConfig } from '../config/cashfree';
import crypto from 'node:crypto';

const validateWebhookSignature = ({
	body,
	signature,
	secret,
}: {
	body: string;
	signature: string;
	secret: string;
}) => {
	const expectedSignature = crypto
		.createHmac('sha256', secret)
		.update(body)
		.digest('base64');

	console.log({
		received: signature,
		expected: expectedSignature,
		matches: signature === expectedSignature,
	});
	return signature === expectedSignature ? true : false;
};

export const handlePaymentWebhook = async (c: Context) => {
	try {
		const signature = c.req.header('x-webhook-signature');
		const timestamp = c.req.header('x-webhook-timestamp');

		const body = await c.req.text();
		const newBody = timestamp + body;
		const { clientSecret } = cashfreeConfig(c.env);
		// Validate signature
		if (
			!validateWebhookSignature({
				body: newBody,
				signature,
				secret: clientSecret,
			})
		) {
			return c.json({ error: 'Invalid signature' }, 401);
		}
		// const data = JSON.parse(body);
		// Add your business logic here
		// Update database, send notifications, etc.

		return c.json({ success: true });
	} catch (error: unknown) {
		return c.json({ error: error.message }, 500);
	}
};
