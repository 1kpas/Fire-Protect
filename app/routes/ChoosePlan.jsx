import { useSubmit } from "@remix-run/react";
import { Card, Page, Layout, TextContainer, Button, Stack } from "@shopify/polaris";

import { BASIC_PLAN, STANDARD_PLAN, PREMIUM_PLAN } from '../shopify.server';

export default function ChoosePlan({ currentPlan }) {
  const submit = useSubmit();

  const cardStyle = {
    backgroundColor: '#f4f6f8',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px'
  };

  const buttonStyle = {
    backgroundColor: '#5c6ac4',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const PlanCard = ({ title, benefits, onSelect, isCurrentPlan }) => (
    <div style={cardStyle}>
      <div style={titleStyle}>{title}</div>
      {benefits.map((benefit, index) => <p key={index}>{benefit}</p>)}
      <Button primary onClick={onSelect} style={buttonStyle}>{isCurrentPlan ? 'Cancelar Plano' : 'Escolher este Plano'}</Button>
    </div>
  );

  const selectPlan = (plan) => () => {
    console.log("Plano selecionado:", plan);
    // submit({ plan }, { method: "POST" });
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Stack vertical>
            <PlanCard 
              title="Plano Básico"
              benefits={["Benefício 1", "Benefício 2", "Benefício 3"]}
              onSelect={selectPlan(BASIC_PLAN)}
              isCurrentPlan={currentPlan === BASIC_PLAN}
            />
            <PlanCard 
              title="Plano Padrão"
              benefits={["Benefício 1", "Benefício 2", "Benefício 3"]}
              onSelect={selectPlan(STANDARD_PLAN)}
              isCurrentPlan={currentPlan === STANDARD_PLAN}
            />
            <PlanCard 
              title="Plano Premium"
              benefits={["Benefício 1", "Benefício 2", "Benefício 3"]}
              onSelect={selectPlan(PREMIUM_PLAN)}
              isCurrentPlan={currentPlan === PREMIUM_PLAN}
            />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
