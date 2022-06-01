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

  //TODO verificar o pq o nome da pessoa e recarregado na troca de pagina

  return (
    <Flex
      as="button"
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
    >
      <Text textAlign="left">
        {
          isSuccess && idPessoaOperacao ? (
            pessoasAutorizadas
              .find(e => e.id === idPessoaOperacao)
              .nome
          ) : (
            'Carregando...'
          )
        }
      </Text>
      <Spacer />

      <Icon as={RiSearchLine} fontSize="20" />
      <SearchBoxModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

