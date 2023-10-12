import { authenticate, MONTHLY_PLAN } from "../shopify.server";
import { redirect } from "@remix-run/node";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true,
    onFailure: async () => billing.request({ plan: MONTHLY_PLAN })
  });

  return redirect("/home");
};
