import { Context } from 'hono';
import {
	cashfreePaymentsConfig,
	cashfreePayoutsConfig,
} from '../config/cashfree';
import { BenificiaryParams } from '@streamkit/shared/src/types/cashfree';
import axios from 'axios';

export const cashfreePaymentService = (c: any) => {
	const config = cashfreePaymentsConfig(c.env);
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

export const cashfreePayoutService = (c: Context) => {
	const config = cashfreePayoutsConfig(c.env);
	const createBeneficiary = async ({
		headers,
		beneficiary_data,
	}: {
		headers: any;
		beneficiary_data: object;
	}) => {
		try {
			const response = await axios.post(
				`${config.baseUrl}/payout/beneficiary`,
				beneficiary_data,
				{
					headers: {
						...headers,
						'x-api-version': '2024-01-01',
					},
				}
			);

			return response;
		} catch (error: unknown) {
			console.log(headers);
			console.log(beneficiary_data);

			if (axios.isAxiosError(error)) {
				console.log('Response Status:', error.response?.status);
				console.log('Response Data:', error.response?.data);
			}

			throw new Error(`Error: ${error.message}`);
		}
	};
	const checkBeneficiary = async ({
		headers,
		// beneficiary_params,
		beneficiary_id,
	}: {
		headers: any;
		// beneficiary_params: BenificiaryParams;
		beneficiary_id: string;
	}) => {
		try {
			// const { beneficiary_id } = beneficiary_params;
			const response = await axios.get(
				`${config.baseUrl}/payout/beneficiary?beneficiary_id=${beneficiary_id}`,
				{
					headers: {
						...headers,
						'x-api-version': '2024-01-01',
					},
				}
			);

			return response;
		} catch (error: unknown) {
			throw new Error(`Error: ${error.message}`);
		}
	};

	return {
		createBeneficiary,
		checkBeneficiary,
	};
};
