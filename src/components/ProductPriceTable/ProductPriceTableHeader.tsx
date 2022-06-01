import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ProductTablePanelProps {
  children: ReactNode
}

export function ProductPriceTableHeader({ children }: ProductTablePanelProps) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>
            Forma de Pagamento
          </Th>
          <Th isNumeric>
            Preço
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {children}
      </Tbody>
    </Table>
  )
}