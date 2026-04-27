import { Hono } from "hono";
import { cashfreePayoutsMiddleware } from "../middleware/cashfree-payouts";
import {
  addBeneficiary,
  checkBeneficiary,
  deleteBeneficiary,
} from "../controllers/payout-controller";

export const payouts = new Hono();

// payouts API
payouts.post("/beneficiary/create", cashfreePayoutsMiddleware, addBeneficiary);
payouts.post("/beneficiary/check", cashfreePayoutsMiddleware, checkBeneficiary);
payouts.post(
  "/beneficiary/delete",
  cashfreePayoutsMiddleware,
  checkBeneficiary,
);
