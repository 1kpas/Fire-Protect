import { Button, Text } from "@shopify/polaris";

export default function Config(){
    return (<div style={{background: "white", padding: 20}}>
        <Text variant="heading2xl" as="h2">Plano de assinatura</Text>
        <div style={{display: "flex", flexDirection: "row", gap: 10}}>
            <Button primary>Mudar para plano anual</Button>
            <Button plain>Cancelar</Button>
        </div>
    </div>)
}