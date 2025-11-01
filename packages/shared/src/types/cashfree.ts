export type Bindings = {
	CASHFREE_API_VERSION: string;
	CASHFREE_ENVIRONMENT: string;
	CASHFREE_CLIENT_ID: string;
	CASHFREE_CLIENT_SECRET: string;
	CASHFREE_WEBHOOK_SECRET: string;
};

export type BenificiaryParams = {
	beneficiary_id: string;
	bank_account_number: string;
	bank_ifsc: string;
};
