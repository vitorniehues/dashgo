import { TabPanel, Table, Thead, Tr, Th, Tbody, Td, Heading, Tfoot, Text, Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ProductTabPanelItem } from "./ProductTabPanelItem";

interface ProductTablePanelProps {
  children: ReactNode
}

export function ProductTabPanel({ children, ...rest }: ProductTablePanelProps) {
  return (
    <TabPanel {...rest}>
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
        <Tfoot >
          <Box mt="6">
            <Text fontSize="xs" fontWeight="normal" >Sujeito a alteração sem aviso prévio.</Text>
          </Box>
        </Tfoot>
      </Table>
    </TabPanel>
  )
}