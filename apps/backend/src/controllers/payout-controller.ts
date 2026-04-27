import { Context } from "hono";
import { cashfreePayoutService } from "../services/cashfree";

export const addBeneficiary = async (c: Context) => {
  const cashfree = cashfreePayoutService(c);
  const headers = c.get("headers_payouts");

  if (!headers) {
    return c.json({
      message: "Headers are missing",
    });
  }
  try {
    // console.log(headers);

    const beneficiary_data = await c.req.json();
    const { beneficiary_id } = beneficiary_data;
    const response = await cashfree.checkBeneficiary({
      headers,
      beneficiary_id,
    });

    if (response.status == 404) {
      const ben_response = await cashfree.createBeneficiary({
        headers,
        beneficiary_data,
      });

      return c.json({
        success: true,
        status: 201,
        message: "Benificiary added",
        requestId: headers["x-request-id"],
      });
    }

    return c.json({
      message: "Beneficiary already exists",
      response,
      status: response.status,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const checkBeneficiary = async (c: Context) => {
  const cashfree = cashfreePayoutService(c);
  const headers = c.get("headers_payouts");

  if (!headers) {
    return c.json({
      message: "Headers are missing",
    });
  }
  try {
    const { beneficiary_id } = await c.req.json();
    const response = await cashfree.checkBeneficiary({
      headers,
      beneficiary_id,
    });

    return c.json({
      message: "User found",
      name: response.data["beneficiary_name"],
      beneficiary_id,
      status: c.status,
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const standardTransfer = async (c: Context) => {
  const cashfree = cashfreePayoutService(c);
  const headers = c.get("headers_payouts");

  if (!headers) {
    return c.json({
      message: "Headers are missing",
    });
  }
  try {
    const transfer_data = await c.req.json();
    const response = await cashfree.standardTransfer({
      headers,
      transfer_data,
    });

    return c.json({
      response,
      status: c.status,
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const deleteBeneficiary = async (c: Context) => {
  const cashfree = cashfreePayoutService(c);
  const headers = c.get("headers_payouts");
  if (!headers) {
    return c.json({
      message: "Headers are missing",
    });
  }
  try {
    const transfer_data = await c.req.json();
    const response = await cashfree.standardTransfer({
      headers,
      transfer_data,
    });

    return c.json({
      response,
      status: c.status,
    });
  } catch (error: unknown) {
    console.error(error);
  }
};
