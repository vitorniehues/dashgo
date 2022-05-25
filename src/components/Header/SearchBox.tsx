import { Box, Flex, Icon, Input, List, ListItem, ListItemProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { consultaPessoasAutorizadas } from "../../services/sigService";

interface CustomListItemProps {
  id: number,
  title: string,
}

export function SearchBox() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('Presidente Combustíveis e Derivados de Petróleo Ltda')

  const [list, setList] = useState<CustomListItemProps[]>()
  let constList: CustomListItemProps[]

  function CustomListItem({ id, title, ...rest }: CustomListItemProps) {
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
        {...rest}
      >
        {title}
      </ListItem>
    )
  }

  function handleListOnClick({ id, title }: CustomListItemProps) {
    setName(title)
    onClose()
  }

  function handleOpenModal() {
    onOpen()
  }

  function handleInputOnChage(value: string) {
    const newList = constList.filter((e) =>
      e.title
        .toLowerCase()
        .includes(value.toLowerCase())
    )
    setList(newList)
  }

  useEffect(() => {
    async function featchData() {
      const res = await consultaPessoasAutorizadas()
      constList = res
      setList([res[0]])
      console.log(list)
    }

  }, [list])

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
                //list.map(e => (<CustomListItem key={e.id} id={e.id} title={e.title} />))
              }
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

