import { Box, Button, Flex, Heading, Icon, TabList, TabPanels, Tabs, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Checkbox, SimpleGrid, Text, VStack, ModalFooter, CheckboxGroup, FormControl } from "@chakra-ui/react";
import { BasePage } from "../../components/BasePage";
import { ProductTabPanel } from "../../components/ProductsTable/ProductTabPanel";
import { ProductTab } from "../../components/ProductsTable/ProductTab";
import { ProductTabPanelItem } from "../../components/ProductsTable/ProductTabPanelItem";
import { RiEditBoxFill, RiSendPlaneFill } from "react-icons/ri";
import { useState } from "react";

export default function ProductsList() {
  return (
    <BasePage>
      <Box flex="1" bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal" >Produtos</Heading>
          <CustomModal />
        </Flex>
        <Tabs variant="solid-rounded" size="md" isFitted>
          <TabList>
            <ProductTab>Gasolina Comum</ProductTab>
            <ProductTab>Gasolina Aditivada</ProductTab>
            <ProductTab>Diesel S500</ProductTab>
            <ProductTab>Diesel S10</ProductTab>
          </TabList>
          <TabPanels>
            <ProductTabPanel >
              <ProductTabPanelItem description="Dinheiro" price={5.50} />
              <ProductTabPanelItem description="TEF Crédito" price={5.55} />
              <ProductTabPanelItem description="Nota a Cobrar" price={5.60} />
            </ProductTabPanel>
            <ProductTabPanel >
              <ProductTabPanelItem description="Dinheiro" price={5.51} />
              <ProductTabPanelItem description="TEF Frota" price={5.56} />
              <ProductTabPanelItem description="Pgto com crédito de antecipação" price={5.61} />
            </ProductTabPanel>
            <ProductTabPanel >
              <ProductTabPanelItem description="" price={4.50} />
            </ProductTabPanel>
            <ProductTabPanel >
              <ProductTabPanelItem description="Dinheiro" price={4.60} />
              <ProductTabPanelItem description="TEF Débito" price={4.65} />
              <ProductTabPanelItem description="Cheque pré-datato (30 dias)" price={4.70} />
            </ProductTabPanel>
          </TabPanels>
        </Tabs>
        <Text fontSize="xs" fontWeight="normal" >Sujeito a alteração sem aviso prévio.</Text>
      </Box>
    </BasePage >
  )
}

function CustomModal() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(values) {
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
        <ModalContent bg="gray.700" action="#" onSubmit={handleSubmit} as="form">
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