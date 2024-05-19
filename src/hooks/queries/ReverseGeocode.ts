import { getAddress } from '@/apis/ReverseGeocode'
import { pinLatitudeAtom, pinLongitudeAtom } from '@/states/searchAtom'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

function useGetAddress() {
  const [longitude] = useAtom(pinLongitudeAtom)
  const [latitude] = useAtom(pinLatitudeAtom)
  const { data } = useQuery({
    queryKey: ['getAddress'],
    queryFn: () => getAddress({ longitude, latitude }),
  })
  return { data }
}

export { useGetAddress }
