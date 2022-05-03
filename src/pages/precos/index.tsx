import { Box, Button, Checkbox, Flex, Heading, Icon, Link, SimpleGrid, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";

export default function PrecosList() {
    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box flex="1" borderRadius={0} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal"> Preços Especiais</Heading>
                        <Text fontSize="xs" fontWeight="normal">Sujeitos a alteração sem aviso prévio.</Text>
                    </Flex>
                    <SimpleGrid flex="1" gap="2" minChildWidth="120px" >
                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                        >
                            Gasolina Comum
                        </Button>
                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                        >
                            Gasolina Aditivada
                        </Button>
                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                        >
                            Diesel Comum
                        </Button>
                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                        >
                            Diesel S10
                        </Button>
                    </SimpleGrid>

                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th>Forma de Pagamento</Th>
                                <Th>Valor</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Text fontWeight="bold">Nota a cobrar</Text>
                                </Td>
                                <Td>R$5.50</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Box fontWeight="bold">Dinheiro</Box>
                                </Td>
                                <Td>R$5.40</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>
            </Flex>

        </Box>
    )
}