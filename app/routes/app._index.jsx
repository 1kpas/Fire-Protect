import { json, redirect } from "@remix-run/node";
import { MONTHLY_PLAN, authenticate } from "~/shopify.server";

export async function loader({ request }) {
    const { billing } = await authenticate.admin(request);
    const billingCheck = await billing.require({
      plans: [MONTHLY_PLAN],
      isTest: true,
      onFailure: async () => billing.request({ plan: MONTHLY_PLAN }),
    });
  
    if(billingCheck.hasActivePayment){
      redirect('/app/panel')
    }
  
    return json({ apiKey: process.env.SHOPIFY_API_KEY });
  }