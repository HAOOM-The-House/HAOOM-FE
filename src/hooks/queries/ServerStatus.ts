import { getServerStatus } from '@/apis/ServerStatus'
import { useQuery } from '@tanstack/react-query'

function useGetServerStatus() {
  const { data } = useQuery({
    queryKey: ['getServerStatus'],
    queryFn: () => getServerStatus(),
  })
  return { data }
}

export { useGetServerStatus }
