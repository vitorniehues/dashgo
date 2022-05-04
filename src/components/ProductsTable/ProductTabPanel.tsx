import { TabPanel, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
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
            </Table>
        </TabPanel>
    )
}