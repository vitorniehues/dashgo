import { Tr, Td } from "@chakra-ui/react";

interface ProductTabPanelItemProps {
    description: string,
    price: number,
}

export function ProductTabPanelItem({ description, price }: ProductTabPanelItemProps) {
    return (
        <Tr>
            <Td>
                {description}
            </Td>
            <Td>
                {price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2, style: 'currency', currency: 'BRL'
                })}
            </Td>
        </Tr>
    )
}