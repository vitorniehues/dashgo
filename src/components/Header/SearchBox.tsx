import { Flex, Icon, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState('Presidente Combustíveis e Derivados de Petróleo Ltda')

    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxW={500}
            alignSelf="center"
            alignItems="center"
            color="gray.200"
            position="relative"
            bg="gray.800"
            borderRadius="full"
            onClick={onOpen}
            cursor="pointer"
        >
            <Text>
                {name}
            </Text>
            <Spacer />

            <Icon as={RiSearchLine} fontSize="20" />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior="inside"
                size="lg"
            >
                <ModalOverlay />
                <ModalContent bg="gray.800">
                    <ModalHeader>
                        <Input
                            color="gray.50"
                            variant="unstyled"
                            px="4"
                            mr="2"
                            placeholder="Digite para buscar"
                            _placeholder={{ color: "gray.400" }}
                        />
                        <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody pt="0">
                        <List borderTop="gray.50" borderTopWidth="thin" pt="4" spacing="2">
                            <CustomListItem texto="Presidente Combustíveis e Derivados de Petróleo Ltda" />
                            <CustomListItem texto="Combustíveis Presidente Ltda" />
                            <CustomListItem texto="Empresa 03" />
                            <CustomListItem texto="Empresa 04" />
                            <CustomListItem texto="Empresa 05" />
                            <CustomListItem texto="Empresa 06" />
                            <CustomListItem texto="Empresa 07" />
                            <CustomListItem texto="Empresa 08" />
                            <CustomListItem texto="Empresa 09" />
                            <CustomListItem texto="Empresa 10" />
                        </List>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

function CustomListItem({ texto }: { texto: string }) {
    return (
        <ListItem
            as="button"
            p="4"
            bg="gray.700"
            borderRadius="md"
            w="100%"
            textAlign="start"
            _hover={{ bg: "gray.500" }}
            onClick={handleListOnClick}
        >
            {texto}
        </ListItem>
    )
}

function handleListOnClick() {
    console.log("teste")
}