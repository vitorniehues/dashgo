import ms from "ms"
import { useQuery } from "react-query"
import { sigService } from "../../services/sigService"

interface Pessoa {
  id: number,
  nome: string,
}

export function useQueryPessoas(filter: string) {
  return useQuery(['pessoas', filter], async () => {
    const { data } = await sigService.get(`pessoas?filter=${filter}`)
    return data
  },
    {
      enabled: Boolean(filter && filter.length >= 3),
      refetchOnWindowFocus: false,
      cacheTime: ms('15s')
    })
}


