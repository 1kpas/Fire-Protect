import { BillingInterval } from "@shopify/shopify-api";

export const billingConfig = {
  "My plan": {
    amount: 5.0,
    currencyCode: "USD",
    interval: BillingInterval.Usage,
    usageTerms: "One dollar per button click",
  },
};