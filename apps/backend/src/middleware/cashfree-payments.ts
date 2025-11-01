import { createMiddleware } from 'hono/factory';
import { cashfreePaymentsConfig, requiredHeaders } from '../config/cashfree';
import { Context } from 'hono';

type RequiredHeader =
	| 'x-client-id'
	| 'x-client-secret'
	| 'x-request-id'
	| 'x-idempotency-key'
	| 'content-type';

export const cashfreePaymentsMiddleware = createMiddleware(
	async (c: Context, next) => {
		try {
			const config = cashfreePaymentsConfig(c.env);
			const headers: Record<RequiredHeader, string> = {} as any;
			const missing = [];

			for (const header of requiredHeaders) {
				const value = c.req.header(header);
				if (!value) {
					missing.push(header);
				} else {
					headers[header as RequiredHeader] = value;
				}
			}

			if (missing.length > 0) {
				return c.json(
					{
						success: false,
						error: 'Missing required headers',
						missing,
					},
					401
				);
			}

			if (
				headers['x-client-id'] !== config.clientId ||
				headers['x-client-secret'] !== config.clientSecret
			) {
				return c.json(
					{
						success: false,
						error: 'Invalid Credentials',
					},
					401
				);
			}

			c.set('headers_payments', headers);
			await next();
		} catch (error: unknown) {
			return c.json(
				{
					success: false,
					error: error.message,
					message: 'bruh',
				},
				500
			);
		}
	}
);
