import ms from "ms"
import { useQuery } from "react-query"
import { useAuthContext } from "../contextHooks/useAuthContext"
import { sigService } from "../../services/sigService"
import { useEffect } from "react"

interface PrecoProduto {
  cod_regra: number,
  lancamentos_padrao: { nome: string },
  produtos: { nome: string },
  valor: number
}

interface IUseQueryPrecoProdutosParms {
  idProduto: number
}

export function useQueryPrecosProduto({ idProduto }: IUseQueryPrecoProdutosParms) {
  const { idPessoaOperacao } = useAuthContext()

  return useQuery(['precosProduto:', idProduto, 'pessoa:', idPessoaOperacao], async () => {
    const url = `/pessoa/${idPessoaOperacao}/produto/${idProduto}/regrasvendas`

    const res = await sigService.get(url)
    return res.data as PrecoProduto[]
  }, {
    refetchOnWindowFocus: false,
    staleTime: ms('10s'),
    enabled: !!idPessoaOperacao
  })
}