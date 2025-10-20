import { cashfreeConfig } from '../config/cashfree';
import axios from 'axios';

export const cashfreeService = (c: any) => {
	const config = cashfreeConfig(c.env);
	// console.log(`${config.baseUrl}/pg/orders`);
	const createOrder = async ({
		orderData,
		headers,
	}: {
		orderData: object;
		headers: any;
	}) => {
		try {
			// const jsonOrderData = JSON.stringify(orderData);
			const response = await axios.post(
				`${config.baseUrl}/pg/orders`,
				orderData,
				{
					headers: {
						...headers,
						'x-api-version': '2025-01-01',
					},
				}
			);

			// const data = response.data;

			return {
				response,
				message: 'in cashfree services',
			};
		} catch (error: unknown) {
			throw new Error(`CAshfree API error: ${error.message}`);
		}
	};

	const getOrder = async ({
		orderId,
		headers,
	}: {
		orderId: string;
		headers: any;
	}) => {
		const response = await axios.get(
			`${config.baseUrl}/pg/orders/${orderId}`,
			{
				headers: {
					...headers,
					'x-api-version': '2025-01-01',
				},
			}
		);

		return response.data;
	};

	const terminateOrder = async ({
		orderId,
		headers,
	}: {
		orderId: string;
		headers: any;
	}) => {
		const response = await axios.patch(
			`${config.baseUrl}/pg/orders/${orderId}`,
			{
				order_status: 'TERMINATED',
			},
			{
				headers: {
					...headers,
					'x-api-version': '2025-01-01',
				},
			}
		);

		return response.data;
	};

	const orderPay = async ({
		payment_session,
		orderData,
		headers,
	}: {
		payment_session: string;
		orderData: object;
		headers: any;
	}) => {
		try {
			const response = await axios.post(
				`${config.baseUrl}/pg/orders/sessions`,
				{
					payment_session_id: payment_session,
					...orderData,
				},
				{
					headers: {
						...headers,
						'x-api-version': '2025-01-01',
					},
				}
			);

			return response;
		} catch (error: unknown) {
			console.log(orderData);
			throw new Error(`Message: ${error.message}`);
		}
	};

	const submitOTP = async ({
		headers,
		cf_payment_id,
		otp,
	}: {
		headers: any;
		cf_payment_id: string;
		otp: string;
	}) => {
		try {
			const response = await axios.post(
				`${config.baseUrl}/pg/orders/pay/authenticate/${cf_payment_id}`,
				{ action: 'SUBMIT_OTP', otp },
				{
					headers: {
						...headers,
						'x-api-version': '2025-01-01',
					},
				}
			);

			return response;
		} catch (error: unknown) {
			throw new Error(`Error: ${error.message}`);
		}
	};

	const resendOTP = async ({
		headers,
		cf_payment_id,
	}: {
		headers: any;
		cf_payment_id: string;
	}) => {
		try {
			const response = await axios.post(
				`${config.baseUrl}/pg/orders/pay/authenticate/${cf_payment_id}`,
				{ action: 'RESEND_OTP' },
				{
					headers: {
						...headers,
						'x-api-version': '2025-01-01',
					},
				}
			);

			return response;
		} catch (error: unknown) {
			throw new Error(`Error: ${error.message}`);
		}
	};

	return {
		createOrder,
		getOrder,
		terminateOrder,
		orderPay,
		submitOTP,
		resendOTP,
	};
};
