import { api, apiResponse } from './Network'

interface ContactNumber extends apiResponse {
  data: string
}

async function getContactNumber(): Promise<ContactNumber> {
  const { data } = await api.get(`/v1/contact`)
  return data
}

export { getContactNumber }
