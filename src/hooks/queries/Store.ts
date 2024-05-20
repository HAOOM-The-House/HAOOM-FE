import { getStoreListByKeyword, getStoreListByPin } from '@/apis/Store'
import { SearchTextAtom, pinCoordinateAtom, searchByAtom } from '@/states/searchAtom'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

function useGetStoreListByKeyword() {
  const [searchText] = useAtom(SearchTextAtom)
  const [coordinate] = useAtom(pinCoordinateAtom)
  const [searchBy] = useAtom(searchByAtom)

  const { data } = useQuery({
    queryKey: ['getStoreListByKeyword', searchText],
    queryFn: () => getStoreListByKeyword(searchText, coordinate.latitude, coordinate.longitude),
    enabled: searchText.length !== 0 && searchBy === 'keyword',
  })
  return { data }
}

function useGetStoreListByPin() {
  const [coordinate] = useAtom(pinCoordinateAtom)
  const [searchBy] = useAtom(searchByAtom)

  return useQuery({
    queryKey: ['getStoreListByPin'],
    queryFn: () => getStoreListByPin(coordinate.latitude, coordinate.longitude),
    enabled: false,
  })
}

export { useGetStoreListByKeyword, useGetStoreListByPin }
