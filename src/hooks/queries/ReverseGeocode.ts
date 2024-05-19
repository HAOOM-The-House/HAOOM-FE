import { getAddress } from '@/apis/ReverseGeocode'
import { pinLatitudeAtom, pinLongitudeAtom } from '@/states/searchAtom'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

function useGetAddress() {
  const [longitude] = useAtom(pinLongitudeAtom)
  const [latitude] = useAtom(pinLatitudeAtom)
  const { data } = useQuery({
    queryKey: ['getAddress', latitude, longitude],
    queryFn: () => getAddress({ longitude, latitude }),
    enabled: longitude !== 0 && latitude !== 0,
  })
  return { data }
}

export { useGetAddress }
