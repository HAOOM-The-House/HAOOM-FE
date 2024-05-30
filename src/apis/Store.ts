import { Coord } from '@mj-studio/react-native-naver-map'
import { api, apiResponse } from './Network'

interface StoreListResponse extends apiResponse {
  data: Store[]
  pageIdx: number
  pageSize: number
  hasNext: boolean
}

export interface Store {
  id: number
  name: string
  phoneNumber: string
  distance: number
}

interface StoreInfoResponse extends apiResponse {
  data: StoreDetail
}

export interface StoreDetail {
  name: string
  phoneNumber: string
  address: Address
  location: Coord
  products: Product[]
}

interface Address {
  sido: string
  sigungu: string
  emd: string
  detail: string
  fullNm: string
}

export interface Product {
  id: number
  name: string
  thumbnailUrl: string
}

interface ProductInfoResponse {
  data: ProductDetail
}
export interface ProductDetail {
  name: string
  content: string
  imgUrls: string[]
}

async function getStoreListByKeyword(
  keyword: string,
  latitude: number,
  longitude: number,
  pageIdx: number,
  pageSize: number = 15
): Promise<StoreListResponse> {
  const { data } = await api.get(
    `/v1/shops/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}&pageIdx=${pageIdx}&pageSize=${pageSize}`
  )
  return data
}

async function getStoreListByPin(latitude: number, longitude: number): Promise<StoreListResponse> {
  const { data } = await api.get(`/v1/shops?latitude=${latitude}&longitude=${longitude}`)
  return data
}

async function getStoreInfo(storeId: number): Promise<StoreInfoResponse> {
  const { data } = await api.get(`/v1/shops/${storeId}`)
  return data
}
async function getProductInfo(productId: number): Promise<ProductInfoResponse> {
  const { data } = await api.get(`/v1/products/${productId}`)
  return data
}

export { getStoreListByKeyword, getStoreListByPin, getStoreInfo, getProductInfo }
