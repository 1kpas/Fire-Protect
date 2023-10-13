import { Button, Text } from "@shopify/polaris";
import { MONTHLY_PLAN, authenticate } from "~/shopify.server";

export const loader = async ({request}) => {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.require({
    plans: [MONTHLY_PLAN],
    onFailure: async () => billing.request({ plan: MONTHLY_PLAN }),
  });

  const subscription = billingCheck.appSubscriptions[0];
  await billing.cancel({
    subscriptionId: subscription.id,
    isTest: true,
    prorate: true,
   });

}

export default function Config() {
  
  

  return (
    <div style={{ background: "white", padding: 20 }}>
      <Text variant="heading2xl" as="h2">
        Plano de assinatura
      </Text>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Button primary>Mudar para plano anual</Button>
        <Button plain onClick={loader}>
          Cancelar Plano
        </Button>
      </div>
    </div>
  );
}
