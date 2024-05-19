import { getAddress } from '@/apis/ReverseGeocode'
import { useQuery } from '@tanstack/react-query'

function useGetAddress() {
  const longitude = 128.12345
  const latitude = 37.98776
  const { data } = useQuery({
    queryKey: ['getAddress'],
    queryFn: () => getAddress({ longitude, latitude }),
  })
  return { data }
}

export { useGetAddress }
