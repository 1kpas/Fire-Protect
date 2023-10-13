import { LoaderArgs, redirect } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";

export const loader = async ({ request }: LoaderArgs) => {
  const { billing } = await authenticate.admin(request);
  await billing.require({
    plans: [MONTHLY_PLAN],
    onFailure: () => billing.request({ plan: MONTHLY_PLAN }),
    isTest: true,
  });

  return redirect('/app/config')
};
