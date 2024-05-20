import { api } from './Network'

async function getServerStatus(): Promise<string> {
  const { data } = await api.get(`/health`)
  return data
}

export { getServerStatus }
