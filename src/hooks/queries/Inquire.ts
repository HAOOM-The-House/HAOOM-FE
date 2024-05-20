import { getContactNumber } from '@/apis/Inquire'
import { useQuery } from '@tanstack/react-query'

function useGetContactNumber() {
  const { data } = useQuery({
    queryKey: ['getContactNumber'],
    queryFn: () => getContactNumber(),
  })
  const number = String(data?.data)
  return { number }
}

export { useGetContactNumber }
