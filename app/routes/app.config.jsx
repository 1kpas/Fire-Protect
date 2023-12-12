import { useSubmit } from "@remix-run/react";
import { Card, Page, Layout, TextContainer, Button } from "@shopify/polaris"; // Removemos TextStyle da importação

import { BASIC_PLAN, STANDARD_PLAN, PREMIUM_PLAN } from '../shopify.server';

export default function ChoosePlan() {
  const submit = useSubmit();

  const PlanCard = ({ title, benefits, onSelect }) => (
    <Card sectioned>
      <TextContainer>
        <h2>{title}</h2> {/* Utilizamos um cabeçalho h2 em vez de TextStyle */}
        {benefits.map((benefit, index) => (
          <p key={index}>{benefit}</p>
        ))}
      </TextContainer>
      <Button onClick={onSelect}>Escolher este plano</Button>
    </Card>
  );

  const selectPlan = (plan) => () => {
    // Aqui será adicionada a lógica de atualização do plano
    console.log("Plano selecionado:", plan);
    // Por exemplo: submit({ plan }, { method: "POST" });
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <PlanCard 
            title="Plano Básico" 
            benefits={[
              "Benefício 1 do Plano Básico",
              "Benefício 2 do Plano Básico",
              "Benefício 3 do Plano Básico",
              "Benefício 4 do Plano Básico",
              "Benefício 5 do Plano Básico"
            ]}
            onSelect={selectPlan(BASIC_PLAN)}
          />
        </Layout.Section>
        <Layout.Section secondary>
          <PlanCard 
            title="Plano Padrão" 
            benefits={[
              "Benefício 1 do Plano Padrão",
              "Benefício 2 do Plano Padrão",
              "Benefício 3 do Plano Padrão",
              "Benefício 4 do Plano Padrão",
              "Benefício 5 do Plano Padrão"
            ]}
            onSelect={selectPlan(STANDARD_PLAN)}
          />
        </Layout.Section>
        <Layout.Section>
          <PlanCard 
            title="Plano Premium" 
            benefits={[
              "Benefício 1 do Plano Premium",
              "Benefício 2 do Plano Premium",
              "Benefício 3 do Plano Premium",
              "Benefício 4 do Plano Premium",
              "Benefício 5 do Plano Premium"
            ]}
            onSelect={selectPlan(PREMIUM_PLAN)}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
