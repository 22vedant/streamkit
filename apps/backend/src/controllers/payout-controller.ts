import { Context } from 'hono';
import { cashfreePayoutService } from '../services/cashfree';

export const addBeneficiary = async (c: Context) => {
	const cashfree = cashfreePayoutService(c);
	try {
		const headers = c.get('headers_payouts');
		// console.log(headers);

		const beneficiary_data = await c.req.json();

		const result = await cashfree.createBeneficiary({
			headers,
			beneficiary_data,
		});

		return c.json({
			success: true,
			status: 201,
			message: 'Benificiary added',
			requestId: headers['x-request-id'],
		});
	} catch (error) {
		throw new Error(`${error.message}`);
	}
};

export const checkBeneficiary = async (c: Context) => {
	const cashfree = cashfreePayoutService(c);
	try {
		const headers = c.get('headers_payouts');
		const { beneficiary_id } = await c.req.json();
		const result = await cashfree.checkBeneficiary({
			headers,
			beneficiary_id,
		});

		return c.json({
			message: 'User found',
			name: result.data['beneficiary_name'],
			beneficiary_id,
			status: c.status,
		});
	} catch (error: unknown) {
		throw new Error(`${error}`);
	}
};
