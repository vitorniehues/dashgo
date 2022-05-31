import { Flex, Spinner, Text, VStack } from "@chakra-ui/react"
import { useQueryPrecosProduto } from "../../hooks/servicesHooks/useQueryPrecosProduto"
import { ProductTabPanel } from "../ProductsTable/ProductTabPanel"
import { ProductTabPanelItem } from "../ProductsTable/ProductTabPanelItem"

interface TabelaPrecoProdutosProps {
  idProduto: number,
}


export default function TabelaPrecosProdutos({ idProduto }: TabelaPrecoProdutosProps) {
  const { isLoading, isError, data: precos, error } = useQueryPrecosProduto({ idProduto })

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" width="100%" height="32">
        <Spinner size="lg" />
      </Flex>
    )
  }

  if (isError) {
    console.log(error)
    return (
      <Flex>
        <Text>
          Erro.
        </Text>
      </Flex>
    )
  }

  return (
    <VStack>
      <ProductTabPanel>
        {
          precos.map((e, index) => (<ProductTabPanelItem key={index} description={e.lancamentos_padrao?.nome} price={e.valor} />))
        }
      </ProductTabPanel>
      <Text fontSize="xs" fontWeight="normal" >Sujeito a alteração sem aviso prévio.</Text>
    </VStack>
  )
}