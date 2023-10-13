import { authenticate, MONTHLY_PLAN } from "../shopify.server";

export async function loader({request}) {
  try {
    const { billing } = await authenticate.admin(request); // Substitua 'request' pelo objeto de solicitação apropriado

    const billingCheck = await billing.require({
      plans: [MONTHLY_PLAN],
      onFailure: async () => billing.request({ plan: MONTHLY_PLAN }),
    });

    const subscription = billingCheck.appSubscriptions[0];
    const cancelledSubscription = await billing.cancel({
      subscriptionId: subscription.id,
      isTest: true,
      prorate: true,
    });

    // Lógica adicional (por exemplo, atualizar o estado do plano no front-end)

    return cancelledSubscription;
  } catch (error) {
    throw error;
  }
}
