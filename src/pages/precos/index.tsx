import { Box, Flex, Heading, HStack, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useRadioGroup } from "@chakra-ui/react";
import { BasePage } from "../../components/BasePage";
import { ProductButton, ProductRadioButton } from "../../components/Form/ProductButton";
import { Select } from "../../components/Form/Select";
import { SelectOption } from "../../components/Form/SelectOption";

export default function ProductsList() {
    return (

        <BasePage>
            <Box flex="1" borderRadius={0} bg="gray.800" p="8">
                <Flex mb="8" justify="space-between" align="center">
                    <Heading size="lg" fontWeight="normal" >Produtos</Heading>
                    <Text fontSize="xs" fontWeight="normal" >Sujeito a alteração sem aviso prévio.</Text>
                </Flex>
                <Tabs borderColor="white" borderRadius={2} align="start">
                    <TabList>
                        <Tab>Arla 32</Tab>
                        <Tab>Gasolina Comum</Tab>
                        <Tab>Gasolina Aditivada</Tab>
                        <Tab>Diesel S500</Tab>
                        <Tab>Diesel S10</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel><Box flex="1" borderRadius={0} bg="blue" p="8" /></TabPanel>
                        <TabPanel><Box flex="1" borderRadius={0} bg="blue" p="8" /></TabPanel>
                        <TabPanel><Box flex="1" borderRadius={0} bg="blue" p="8" /></TabPanel>
                        <TabPanel><Box flex="1" borderRadius={0} bg="gray.800" p="8" /></TabPanel>
                        <TabPanel><Box flex="1" borderRadius={0} bg="gray.800" p="8" /></TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </BasePage >
    )
}