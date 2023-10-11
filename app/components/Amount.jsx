import {
    Text, VerticalStack, HorizontalStack
  } from '@shopify/polaris';
  
  const intervalTranslation = {
    'EVERY_30_DAYS': 'month',
  };
  
  const Amount = ({ currency, amount, cycle, percentagePerOrder }) => {
    return (
      <VerticalStack align="center">
        <HorizontalStack align="center" blockAlign="center" gap="1">
          <Text as="p" variant="bodySm">{currency}</Text>
          <Text as="p" variant="bodyLg" fontWeight="bold">{amount}</Text>
          <Text as="p" variant="bodySm">
            / {intervalTranslation[cycle]} and {percentagePerOrder}% per order
          </Text>
        </HorizontalStack>
      </VerticalStack>
    )
  };
  
  export default Amount;