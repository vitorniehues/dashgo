import { Flex, Icon, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

interface CustomListItemProps {
  id: number,
  title: string,
}

export function SearchBox() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('Presidente Combustíveis e Derivados de Petróleo Ltda')

  const constList = [
    { id: 1, title: "Comercial de Combustíveis Presidente Ltda" },
    { id: 2, title: "Combustíveis Presidente Ltda" },
    { id: 3, title: "Presidente Combustíveis e Derivados de Petróleo Ltda" },
    { id: 4, title: "Posto Presidente" },
  ]
  const [list, setList] = useState<CustomListItemProps[]>(constList)

  function CustomListItem({ id, title }: CustomListItemProps) {
    return (
      <ListItem
        as="button"
        p="4"
        bg="gray.700"
        borderRadius="md"
        w="100%"
        textAlign="start"
        _hover={{ bg: "gray.500" }}
        onClick={() => handleListOnClick({ id, title })}
      >
        {title}
      </ListItem>
    )
  }

  function handleListOnClick({ id, title }: CustomListItemProps) {
    setName(title)
    onClose()
  }

  function handleInputOnChage(value: string): void {
    const newList = constList.filter((e) =>
      e.title
        .toLowerCase()
        .includes(value.toLowerCase())
    )
    setList(newList)
  }

  function handleOpenModal(): void {
    setList(constList)
    onOpen()
  }

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
      onClick={handleOpenModal}
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
              onChange={(e) => handleInputOnChage(e.target.value)}
            />
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody pt="0" pb="4">
            <List borderTop="gray.50" borderTopWidth="thin" pt="4" spacing="2">
              {
                list.map(({ id, title }) => {
                  return (<CustomListItem key={id} id={id} title={title} />)
                })
              }
            </List>

          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

