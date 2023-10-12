import { authenticate, MONTHLY_PLAN } from "../shopify.server";
import Index from "./home";

export const loader2 = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true,
    onFailure: async () => billing.request({ plan: MONTHLY_PLAN })
  });

  if(billingCheck){
    <Index/>
  }
};