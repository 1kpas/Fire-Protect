import { LoaderArgs, redirect } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";

export const loader = async ({ request }: LoaderArgs) => {
  const { billing } = await authenticate.admin(request);
  await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true,
    onFailure: async () => billing.request({ plan: MONTHLY_PLAN }),
  });

  return redirect('/app/home')
};
