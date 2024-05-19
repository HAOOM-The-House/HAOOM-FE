import { getAddress } from '@/apis/ReverseGeocode'
import { pinCoordinateAtom } from '@/states/searchAtom'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

function useGetAddress() {
  const [coordinate] = useAtom(pinCoordinateAtom)
  const { data } = useQuery({
    queryKey: ['getAddress', coordinate],
    queryFn: () => getAddress(coordinate),
    enabled: coordinate.latitude !== 0 && coordinate.longitude !== 0,
  })
  return { data }
}

export { useGetAddress }
