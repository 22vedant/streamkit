export const cashfreeConfig = (env: any) => {
	if (!env) {
		throw new Error('Environment variables not accessible');
	}

	if (!env.CASHFREE_CLIENT_ID || !env.CASHFREE_CLIENT_SECRET) {
		throw new Error('Required Cashfree environment variables are missing');
	}

	return {
		clientId: env.CASHFREE_CLIENT_ID,
		clientSecret: env.CASHFREE_CLIENT_SECRET,
		environment: env.CASHFREE_ENVIRONMENT || 'sandbox',
		baseUrl:
			env.CASHFREE_ENVIRONMENT === 'production'
				? 'https://api.cashfree.com'
				: 'https://sandbox.cashfree.com',
		webhookSecret: env.CASHFREE_CLIENT_SECRET,
		//we have use cashfree_client_secret as the webhook secret provided by them doesn't work properly and gives incorrect results
	};
};

export const requiredHeaders = [
	'x-client-id',
	'x-client-secret',
	// 'x-request-id',
	// 'x-idempotency-key',
	'content-type',
];
