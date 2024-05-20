import { api, apiResponse } from './Network'

interface StoreListResponse extends apiResponse {
  data: Store[]
  pageIdx: number
  pageSize: number
  hasNext: boolean
}

interface Store {
  id: number
  name: string
  phoneNumber: string
  distance: number
}

async function getStoreListByKeyword(keyword: string, latitude: number, longitude: number): Promise<StoreListResponse> {
  const { data } = await api.get(`/v1/shops/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`)
  return data
}
async function getStoreListByPin(latitude: number, longitude: number): Promise<StoreListResponse> {
  const { data } = await api.get(`/v1/shops?latitude=${latitude}&longitude=${longitude}`)
  return data
}

export { getStoreListByKeyword, getStoreListByPin }
