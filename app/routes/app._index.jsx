import { redirect } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN, ANNUAL_PLAN } from "../shopify.server";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.require({
    plans: [MONTHLY_PLAN, ANNUAL_PLAN],
    isTest: true,
    onFailure:async () => redirect('/home'),
  });

  const subscription = billingCheck.appSubscriptions[0];
  console.log(`Shop is on ${subscription.name} (id ${subscription.id})`);

  // App logic
};
