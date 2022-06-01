import ms from "ms"
import { useQuery } from "react-query"
import { sigService } from "../../services/sigService"

interface Pessoa {
  id: number,
  nome: string,
}

async function getPessoasAutorizadas(): Promise<Pessoa[]> {
  const { data } = await sigService.get('pessoa/autorizadas')
  return data.map(e => {
    return {
      id: e.cod_pessoa,
      nome: e.nome
    }
  })
}


export function useQueryPessoasAutorizadas() {
  return useQuery(['pessoasAutorizadas'], getPessoasAutorizadas, {
    refetchOnWindowFocus: false,
    staleTime: ms('10s')
  })
}