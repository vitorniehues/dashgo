
import { Flex, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalProps, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/contextHooks/useAuthContext";
import { useQueryPessoasAutorizadas } from "../../hooks/servicesHooks/useQueryPessoasAutorizadas";
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
  const { isSuccess, isError, data: pessoasAutorizadas } = useQueryPessoasAutorizadas()
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setFilter('')
  }, [isOpen])

  function handleItemListOnClick(id: number) {
    setIdPessoaOperacao(id)
    onClose()
  }

  function loading() {
    return (
      <Flex py="16" borderTop="gray.50" justifyContent="center" borderTopWidth="thin">
        <Spinner size="lg" />
      </Flex>
    )
  }

  function CustomListItem({ id, nome, ...rest }: IPessoa) {
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
        {nome}
      </ListItem>
    )
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
            onChange={(e) => setFilter(e.target.value)}
          />
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt="0" pb="4">
          {
            isSuccess ? (
              <List borderTop="gray.50" borderTopWidth="thin" pt="4" spacing="2">
                {
                  pessoasAutorizadas
                    .filter((pessoa) =>
                      pessoa.nome
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                    )
                    .map(e => (<CustomListItem key={e.id} id={e.id} nome={e.nome} />))
                }
              </List>
            ) : isError ? (
              <Text>
                Erro ao carregar lista de pessoas autorizadas.
              </Text>
            ) : (
              loading()
            )
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

