import { Context } from 'hono';
import {
	cashfreePaymentService,
	cashfreePayoutService,
} from '../services/cashfree';

export const createOrder = async (c: Context) => {
	const cashfree = cashfreePaymentService(c);
	try {
		const headers = c.get('headers_payments');
		const orderData = await c.req.json();
		// console.log(orderData);
		// we are creating the order here.
		const result = await cashfree.createOrder({ orderData, headers });
		const payment_session = result.response.data.payment_session_id;
		console.log(payment_session);
		// logs orderid and details in postgres for further analysis.
		// creating a orderPay session.
		const orderPayResult = await cashfree.orderPay({
			payment_session,
			orderData,
			headers,
		});
		const combinedResult = {
			...result.response.data,
			...orderPayResult.data,
		};
		return c.json({
			success: true,
			status: 200,
			result: combinedResult,
			message: result.message,
			requestId: headers['x-request-id'],
		});
		// trycatch for postgres successfully payment. Or after webhook confirmation.
	} catch (error) {
		return c.json(
			{
				success: false,
				error: error.message,
				// message: 'in payments controller',
			},
			500
		);
	}
};

export const resendOTP = async (c: Context) => {
	const cashfree = cashfreePaymentService(c);
	try {
		const headers = c.get('headers_payments');
		const cf_payment_id = c.req.param('cf_payment_id');
		// const { otp } = await c.req.body;

		const submit = await cashfree.resendOTP({
			headers,
			cf_payment_id,
		});

		return c.json({
			success: true,
			status: 200,
			result: submit.data,
			requestId: headers['x-request-id'],
		});
	} catch (error: unknown) {
		return c.json(
			{
				success: false,
				status: error.status,
				error: error.message,
			},
			500
		);
	}
};
