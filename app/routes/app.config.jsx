import { redirect } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { Button, Text } from "@shopify/polaris";

export async function action({ request }) {
  return redirect('/app/cancel-plan')
}

export default function Config() {
  const submit = useSubmit();
  const cancelPlan = () => submit({}, { replace: true, method: "POST" });
  

  return (
    <div style={{ background: "white", padding: 20 }}>
      <Text variant="heading2xl" as="h2">
        Plano de assinatura
      </Text>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Button primary>Mudar para plano anual</Button>
        <Button plain onClick={cancelPlan}>
          Cancelar Plano
        </Button>
      </div>
    </div>
  );
}
