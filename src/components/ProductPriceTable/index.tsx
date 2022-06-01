import { Flex, Spinner, Text, VStack } from "@chakra-ui/react"
import { useQueryPrecosProduto } from "../../hooks/servicesHooks/useQueryPrecosProduto"
import { ProductPriceTableHeader } from "./ProductPriceTableHeader"
import { ProductPriceTableRow } from "./ProductPriceTableRow"

interface TabelaPrecoProdutosProps {
  idProduto: number,
}


export function ProductPricesTable({ idProduto }: TabelaPrecoProdutosProps) {
  const { isLoading, isError, data: precos, error, isIdle } = useQueryPrecosProduto({ idProduto })

  if (isLoading || isIdle) {
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
      <ProductPriceTableHeader>
        {
          precos.map((e, index) => (<ProductPriceTableRow key={index} description={e.lancamentos_padrao?.nome} price={e.valor} />))
        }
      </ProductPriceTableHeader>
      <Text fontSize="xs" fontWeight="normal" >Sujeito a alteração sem aviso prévio.</Text>
    </VStack>
  )
}