import { Tr, Td } from "@chakra-ui/react";

interface ProductTabPanelItemProps {
  description?: string,
  price: number,
}

export function ProductPriceTableRow({ description, price }: ProductTabPanelItemProps) {
  return (
    <Tr>
      <Td>
        {description ? description : "Todas as formas de pagamento"}
      </Td>
      <Td isNumeric>
        {price.toLocaleString("pt-BR", {
          minimumFractionDigits: 2, style: 'currency', currency: 'BRL'
        })}
      </Td>
    </Tr>
  )
}