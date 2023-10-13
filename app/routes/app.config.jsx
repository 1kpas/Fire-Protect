import { Button, Text } from "@shopify/polaris";
import { loader } from "./subscriptionUtils"; // Substitua pelo local correto do seu arquivo

export default function Config() {
  const handleCancelPlan = async () => {
    try {
      await loader(); // Função para cancelar o plano
      alert("Plano cancelado com sucesso!"); // Exiba uma mensagem de sucesso
    } catch (error) {
      console.error("Erro ao cancelar o plano:", error);
      alert("Erro ao cancelar o plano. Por favor, tente novamente.");
    }
  };

  return (
    <div style={{ background: "white", padding: 20 }}>
      <Text variant="heading2xl" as="h2">
        Plano de assinatura
      </Text>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Button primary>Mudar para plano anual</Button>
        <Button plain onClick={handleCancelPlan}>
          Cancelar Plano
        </Button>
      </div>
    </div>
  );
}
