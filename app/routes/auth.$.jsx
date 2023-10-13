import { redirect } from '@remix-run/node';
import shopify, { ANNUAL_PLAN, MONTHLY_PLAN, authenticate } from '~/shopify.server';

export async function loader({request}) {
  await shopify.authenticate.admin(request);

  const { billing } = await authenticate.admin(request);
  await billing.require({
    plans: [MONTHLY_PLAN, ANNUAL_PLAN],
    isTest: true,
    onFailure: async () => redirect('/select-plan'),
  });

  return null;
}
