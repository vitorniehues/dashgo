import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { BasePage } from "../../components/BasePage";
import { Pagination } from "../../components/Pagination";

export default function UserList() {
    return (
        <BasePage >
            <Box flex="1" borderRadius={0} bg="gray.800" p="8">
                <Flex mb="8" justify="space-between" align="center">
                    <Heading size="lg" fontWeight="normal" > Usuários</Heading>
                    <Link href="users/create" passHref>
                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                            leftIcon={<Icon as={RiAddLine} />}
                        >
                            Criar novo
                        </Button>
                    </Link>
                </Flex>

                <Table colorScheme="whiteAlpha">
                    <Thead>
                        <Tr>
                            <Th px="6" color="gray.300" width="8">
                                <Checkbox colorScheme="blue" />
                            </Th>
                            <Th>Usuário</Th>
                            <Th>Data de Cadastro</Th>
                            <Th width="8"></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td px="6">
                                <Checkbox colorScheme="blue" />
                            </Td>
                            <Td>
                                <Box fontWeight="bold">Morgana Torres</Box>
                                <Box fontSize="sm" color="gray.300">morgana@postopresidente.com</Box>
                            </Td>
                            <Td>27/04/2022</Td>
                            <Td>
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="purple"
                                    leftIcon={<Icon as={RiPencilLine} />}
                                >
                                    Editar
                                </Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
                <Pagination />
            </Box>
        </BasePage>
    )
}