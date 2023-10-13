import { Button, ButtonGroup, Card, Text } from "@shopify/polaris";

export default function Config(){
    return (<Card>
        <Text variant="heading2xl" as="h2">Plano de assinatura</Text>
        <ButtonGroup>
            <Button primary>Mudar para plano anual</Button>
            <Button plain>Cancelar</Button>
        </ButtonGroup>
    </Card>)
}