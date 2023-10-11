import { Card, VerticalStack, Divider } from '@shopify/polaris';
// import Header from '../components/Header';
import Feature from '../components/Feature';
import Amount from '../components/Amount';

const Plan = ({
  plan,
  shopId,
  current
}) => {
  const currentName = current?.name ?? 'notsubscribed'
  const isSelectedPlan = currentName.includes(plan.name);

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

export default Plan;