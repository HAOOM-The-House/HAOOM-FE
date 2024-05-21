import { getContactNumber } from '@/apis/Inquire'
import { useSuspenseQuery } from '@tanstack/react-query'

function useGetContactNumber() {
  const { data } = useSuspenseQuery({
    queryKey: ['getContactNumber'],
    queryFn: () => getContactNumber(),
  })
  const number = String(data?.data)
  return { number }
}

export { useGetContactNumber }
