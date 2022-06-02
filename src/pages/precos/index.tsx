import { Box, Button, Flex, Heading, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Checkbox, SimpleGrid, Text, ModalFooter, CheckboxGroup, Spinner } from "@chakra-ui/react";
import { BasePage } from "../../components/BasePage";
import { RiEditBoxFill, RiSendPlaneFill } from "react-icons/ri";
import { useState } from "react";
import { ProductRadioCardGroup } from "../../components/ProductRadioCard";
import { ProductPricesTable } from "../../components/ProductPriceTable";
import { useQueryPrecosProduto } from "../../hooks/servicesHooks/useQueryPrecosProduto";

export default function ProductsList() {
  const [idProduto, setIdProduto] = useState<number>(1000)

  const { isRefetching, } = useQueryPrecosProduto({ idProduto })

  function handleRadioOnChange(value: string) {
    setIdProduto(parseInt(value, 10))
  }


  //TODO retirar produtos do bando de dados

  const produtos = [
    {
      idProduto: 1000,
      nome: 'Gasolina Comum',
    },
    {
      idProduto: 1001,
      nome: 'Gasolina Aditivada',
    },
    {
      idProduto: 1003,
      nome: 'Diesel S500',
    },
    {
      idProduto: 1005,
      nome: 'Diesel S10',
    },
  ]

  return (
    <BasePage>
      <Box flex="1" bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal" >Produtos
            {isRefetching && <Spinner ml="4" />}
          </Heading>
          <CustomModal />
        </Flex>
        <Flex>
          <ProductRadioCardGroup produtos={produtos} onChange={handleRadioOnChange} />
        </Flex>
        <ProductPricesTable idProduto={idProduto} />
      </Box>
    </BasePage >
  )
}

function CustomModal() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(_values) {
    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSending(false)
    console.log('Enviado!')
    onClose()
  }
  return (
    <>
      <Button
        as="a"
        size="sm"
        fontSize="sm"
        colorScheme="blue"
        rightIcon={<Icon as={RiEditBoxFill} />}
        onClick={onOpen}
      >
        Solicitar revisão
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent bg="gray.700" onSubmit={handleSubmit} as="form">
          <ModalHeader>
            Solicitação de Revisão de Preços
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" m="2">Produtos</Text>
            <SimpleGrid columns={2} spacing="2" borderWidth="thin" borderRadius="lg" p="4" mb="4">
              <CheckboxGroup size="md">
                <Checkbox value="1000">Gasolina Comum</Checkbox>
                <Checkbox value="1001">Gasolina Aditivada</Checkbox>
                <Checkbox value="1003">Diesel Comum</Checkbox>
                <Checkbox value="1005">Diesel S10</Checkbox>
              </CheckboxGroup>
            </SimpleGrid>
            <Text fontSize="lg" m="2">Formas de pagamento</Text>
            <SimpleGrid columns={2} spacing="2" borderWidth="thin" borderRadius="lg" p="4">
              <CheckboxGroup size="md">
                <Checkbox>Dinheiro</Checkbox>
                <Checkbox>TEF Débito</Checkbox>
                <Checkbox>TEF Crédito</Checkbox>
                <Checkbox>Nota a cobrar</Checkbox>
              </CheckboxGroup>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              fontSize="md"
              colorScheme="blue"
              rightIcon={<Icon as={RiSendPlaneFill} />}
              type="submit"
              isLoading={isSending}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}