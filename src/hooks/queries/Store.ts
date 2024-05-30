import {
  ProductDetail,
  StoreDetail,
  getProductInfo,
  getStoreInfo,
  getStoreListByKeyword,
  getStoreListByPin,
} from '@/apis/Store'
import { SearchTextAtom, pinCoordinateAtom, searchByAtom } from '@/states/searchAtom'
import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

function useGetStoreListByKeyword() {
  const [searchText] = useAtom(SearchTextAtom)
  const [coordinate] = useAtom(pinCoordinateAtom)
  const [searchBy] = useAtom(searchByAtom)

  const fetchStoreList = ({ pageParam = 0 }) =>
    getStoreListByKeyword(searchText, coordinate.latitude, coordinate.longitude, pageParam)

  return useInfiniteQuery({
    queryKey: ['getStoreListByKeyword', searchText],
    queryFn: fetchStoreList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
    enabled: searchText !== undefined && searchText.length !== 0 && searchBy === 'keyword',
  })
}

function useGetStoreListByPin() {
  const [coordinate] = useAtom(pinCoordinateAtom)
  const [searchBy] = useAtom(searchByAtom)

  const fetchStoreList = ({ pageParam = 0 }) => getStoreListByPin(coordinate.latitude, coordinate.longitude, pageParam)

  return useInfiniteQuery({
    queryKey: ['getStoreListByPin'],
    queryFn: fetchStoreList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
    enabled: false,
  })
}

function useGetStoreInfo(storeId: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['getStoreInfo', storeId],
    queryFn: () => getStoreInfo(storeId),
  })

  const storeInfo = data?.data as StoreDetail
  return { storeInfo }
}
function useGetProductInfo(productId: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['getProductInfo', productId],
    queryFn: () => getProductInfo(productId),
  })

  const productInfo = data?.data as ProductDetail
  return { productInfo }
}

export { useGetStoreListByKeyword, useGetStoreListByPin, useGetStoreInfo, useGetProductInfo }
