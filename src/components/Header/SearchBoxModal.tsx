
import { Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalProps, Skeleton, Stack, Text } from "@chakra-ui/react"
import { useQuery } from "react-query"
import { useAuthContext } from "../../hooks/contextHooks/useAuthContext";
import { useQueryPessoasAutorizadas } from "../../hooks/servicesHooks/useQueryPessoasAutorizadas";
import { useQueryPrecosProduto } from "../../hooks/servicesHooks/useQueryPrecosProduto";
import { useDebounce } from "../../hooks/useDebounce";


interface SearchBoxModalProps {
  isOpen: boolean,
  onClose: () => void
}

interface IPessoa {
  id: number,
  nome: string,
}

export function SearchBoxModal({ isOpen, onClose }: SearchBoxModalProps) {

  const { setIdPessoaOperacao } = useAuthContext()

  //TODO talvez tenha que usar na funcao principal
  //const debouncedFilter = useDebounce(filter, 500);

  const { isLoading, isError, data: pessoasAutorizadas, error } = useQueryPessoasAutorizadas()

  if (isLoading) {
    return (
      <Stack spacing={4} borderTop="gray.50" borderTopWidth="thin" pt="4">
        <Skeleton isLoaded={!isLoading}>Texto</Skeleton>
        <Skeleton isLoaded={!isLoading}>Texto</Skeleton>
        <Skeleton isLoaded={!isLoading}>Texto</Skeleton>
        <Skeleton isLoaded={!isLoading}>Texto</Skeleton>
      </Stack>
    )
  }

  if (isError) {
    console.log('Erro ao carregar lista de pessoas autorizadas: ', error)
    return (
      <Text>
        Erro ao carregar lista de pessoas autorizadas.
      </Text>
    )
  }

  function CustomListItem({ id, nome: title, ...rest }: IPessoa) {
    return (
      <ListItem
        as="button"
        p="4"
        bg="gray.700"
        borderRadius="md"
        w="100%"
        textAlign="start"
        _hover={{ bg: "gray.500" }}
        onClick={() => handleItemListOnClick(id)}
        {...rest}
      >
        {title}
      </ListItem>
    )
  }

  function handleItemListOnClick(id: number) {
    setIdPessoaOperacao(id)
    onClose()
  }

  return (
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
          //onChange={(e) => handleInputOnChage(e.target.value)}
          />
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt="0" pb="4">
          <List borderTop="gray.50" borderTopWidth="thin" pt="4" spacing="2">
            {
              pessoasAutorizadas.map(e => (<CustomListItem key={e.id} id={e.id} nome={e.nome} />))
            }
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

