import { Context } from "hono";
import {
  cashfreePaymentsConfig,
  cashfreePayoutsConfig,
} from "../config/cashfree";
import { BenificiaryParams } from "@streamkit/shared/src/types/cashfree";
import axios from "axios";

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
            "x-api-version": "2024-01-01",
          },
        },
      );

      return response;
    } catch (error: unknown) {
      console.log(headers);
      console.log(beneficiary_data);

      if (axios.isAxiosError(error)) {
        console.log("Response Status:", error.response?.status);
        console.log("Response Data:", error.response?.data);
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
            "x-api-version": "2024-01-01",
          },
        },
      );

      return response;
    } catch (error: unknown) {
      throw new Error(`Error: ${error.message}`);
    }
  };

  const deleteBeneficiary = async ({
    headers,
    beneficiary_id,
  }: {
    headers: any;
    beneficiary_id: object;
  }) => {
    try {
      const response = await axios.delete(
        `${config.baseUrl}/payout/beneficiary?beneficiary_data=${beneficiary_id}`,
        {
          headers: {
            ...headers,
            "x-api-version": "2024-01-01",
          },
        },
      );

      return response;
    } catch (error: unknown) {
      console.log(headers);

      if (axios.isAxiosError(error)) {
        console.log("Response Status:", error.response?.status);
        console.log("Response Data:", error.response?.data);
      }

      throw new Error(`Error: ${error.message}`);
    }
  };

  /***
	 *	The transfer body looks like this:
	 *	{
	 		transfer_id: string
			transfer_amount: number. Decimal values are allowed
			beneficiary_details: object {
				beneficiary_id: string,
				beneficiary_name: string,
				beneficiary_instrument_details: {
					bank_account_number: string,
					bank_ifsc: string,
					vpa: string,
					card_details: object {
						beneficiary_email: string,
						beneficiary_phone: string,
						beneficiary_address: string,
						beneficiary_city: string,
						beneficiary_state: string,
						beneficiary_postal_code: string,
					}
				},
				transfer_mode: string, // default is bank_transfer
				transfer_remarks: string // Stream Payments for date
			}
	 * 	}
	 *
	 * Before initiating a transfer, please check if the transfer_id is present in DB. If not found, initiate the payout.
	 *
	 * Charge a minimal fee for on-demand payout initiated by the streamer.
	 */

  const standardTransfer = async ({
    headers,
    transfer_data,
  }: {
    headers: any;
    transfer_data: object;
  }) => {
    try {
      const response = await axios.post(
        `${config.baseUrl}/payout/transfers`,
        transfer_data,
        {
          headers: {
            ...headers,
            "x-api-version": "2024-01-01",
          },
        },
      );

      return c.json({
        response,
        status: response.status,
        status_code: response.data["status_code"],
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Response Status:", error.response?.status);
        console.log("Response Data:", error.response?.data);
      }

      throw new Error(`Error: ${error.message}`);
    }
  };

  // implement batch transfer and setup a cron job to transfer all funds collected during the day and transfer it at the end of the day. i.e. 00:00 AM
  return {
    createBeneficiary,
    checkBeneficiary,
    deleteBeneficiary,
    standardTransfer,
    // batchTransfer
  };
};
