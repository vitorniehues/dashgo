import { Box, Button, Flex, Heading, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { BasePage } from "../../components/BasePage";
import { Pagination } from "../../components/Pagination";
import { ProductTabPanel } from "../../components/ProductsTable/ProductTabPanel";
import { ProductTab } from "../../components/ProductsTable/ProductTab";
import { ProductTabPanelItem } from "../../components/ProductsTable/ProductTabPanelItem";

export default function ProductsList() {
    return (

        <BasePage>
            <Box flex="1" borderRadius={0} bg="gray.800" p="8">
                <Flex mb="8" justify="space-between" align="center">
                    <Heading size="lg" fontWeight="normal" >Produtos</Heading>
                    <Text fontSize="xs" fontWeight="normal" >Sujeito a alteração sem aviso prévio.</Text>
                </Flex>
                <Tabs variant="solid-rounded" size="md" isFitted>
                    <TabList>
                        <ProductTab>Gasolina Comum</ProductTab>
                        <ProductTab>Gasolina Aditivada</ProductTab>
                        <ProductTab>Diesel S500</ProductTab>
                        <ProductTab>Diesel S10</ProductTab>
                    </TabList>
                    <TabPanels>
                        <ProductTabPanel >
                            <ProductTabPanelItem description="Dinheiro" price={5.50} />
                            <ProductTabPanelItem description="TEF Crédito" price={5.55} />
                            <ProductTabPanelItem description="Nota a Cobrar" price={5.60} />
                        </ProductTabPanel>
                        <ProductTabPanel >
                            <ProductTabPanelItem description="Dinheiro" price={5.51} />
                            <ProductTabPanelItem description="TEF Frota" price={5.56} />
                            <ProductTabPanelItem description="Pgto com crédito de antecipação" price={5.61} />
                        </ProductTabPanel>
                        <ProductTabPanel >
                            <ProductTabPanelItem description="Dinheiro" price={4.50} />
                            <ProductTabPanelItem description="TEF Crédito" price={4.55} />
                            <ProductTabPanelItem description="Nota a Cobrar" price={4.60} />
                        </ProductTabPanel>
                        <ProductTabPanel >
                            <ProductTabPanelItem description="Dinheiro" price={4.60} />
                            <ProductTabPanelItem description="TEF Débito" price={4.65} />
                            <ProductTabPanelItem description="Cheque pré-datato (30 dias)" price={4.70} />
                        </ProductTabPanel>
                    </TabPanels>
                </Tabs>
                <Pagination />
            </Box>
        </BasePage >
    )
}