import { Card, VerticalStack, Divider } from '@shopify/polaris';
// import Header from '../components/Header';
import Feature from '../components/Feature';
import Amount from '../components/Amount';

export default function Index() {

  const plan = {
    features: [
      "FUnção 1",
      "FUnção 2"
    ]
  }

  return (
    <Card>
      <VerticalStack gap="3">
        {/* <Header
          shopId={shopId}
          plan={plan}
          isCurrent={isSelectedPlan}
        /> */}
        <Divider />
        <VerticalStack inlineAlign="start" gap="1">
          {plan.features.map((feature, index) => {
            return <Feature key={`feature-${index}`} content={feature} />
          })}
        </VerticalStack>
        <Divider />
        <Amount
          currency={"USD"}
          amount={plan.monthlyPrice}
          percentagePerOrder={plan.percentagePerOrder}
          cycle="EVERY_30_DAYS"
        />
      </VerticalStack>
    </Card>
  )
};
