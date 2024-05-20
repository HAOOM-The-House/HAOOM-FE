import { getStoreListByKeyword } from '@/apis/Store'
import { SearchTextAtom, pinCoordinateAtom } from '@/states/searchAtom'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

function useGetStoreListByKeyword() {
  const [searchText] = useAtom(SearchTextAtom)
  const [coordinate] = useAtom(pinCoordinateAtom)

  const latitude = Number(coordinate.latitude.toFixed(6))
  const longitude = Number(coordinate.longitude.toFixed(6))
  const { data } = useQuery({
    queryKey: ['getStoreListByKeyword', searchText],
    queryFn: () => getStoreListByKeyword(searchText, latitude, longitude),
    enabled: searchText.length !== 0,
  })
  return { data }
}

export { useGetStoreListByKeyword }
