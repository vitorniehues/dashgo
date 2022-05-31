import { Flex, Icon, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import { useAuthContext } from "../../hooks/contextHooks/useAuthContext";
import { useQueryPessoasAutorizadas } from "../../hooks/servicesHooks/useQueryPessoasAutorizadas";
import { SearchBoxModal } from "./SearchBoxModal";

interface PessoaOperacao {
  id: number,
  nome: string,
}

export function SearchBox() {
  const { idPessoaOperacao } = useAuthContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isSuccess, data: pessoasAutorizadas } = useQueryPessoasAutorizadas()

  // function handleInputOnChage(value: string) {
  //   const newList = constList.filter((e) =>
  //     e.nome
  //       .toLowerCase()
  //       .includes(value.toLowerCase())
  //   )
  //   setList(newList)
  // }

  console.log('idPessoa: ', idPessoaOperacao)

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
        {
          isSuccess && idPessoaOperacao ? (
            pessoasAutorizadas
              .find(e => e.id === idPessoaOperacao)
              .nome
          ) : (
            'Carregando...'
          )}
      </Text>
      <Spacer />

      <Icon as={RiSearchLine} fontSize="20" />
      <SearchBoxModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

