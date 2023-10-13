import { LoaderArgs } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";

export const loader = async ({ request }: LoaderArgs) => {
  const { billing } = await authenticate.admin(request);
  await billing.require({
    plans: [MONTHLY_PLAN],
    onFailure: async () => await billing.request({ plan: MONTHLY_PLAN }),
    isTest: true,
  });

};

export default function Index(){
  return <div style={{width: 200, height: 200, background: 'red'}}></div>
}