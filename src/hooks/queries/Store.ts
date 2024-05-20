import {
  ProductDetail,
  StoreDetail,
  getProductInfo,
  getStoreInfo,
  getStoreListByKeyword,
  getStoreListByPin,
} from '@/apis/Store'
import { SearchTextAtom, pinCoordinateAtom, searchByAtom } from '@/states/searchAtom'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
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
