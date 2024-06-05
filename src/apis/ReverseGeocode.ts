import { Coord } from '@mj-studio/react-native-naver-map'
import { geocodeAPI } from './Network'

interface APIresponse {
  status: {
    code: number
    name: string
    message: string
  }
  results: Address[]
}
interface Address {
  name: string
  code: {
    id: string
    type: string
    mappingId: string
  }
  region: Region
}
export interface Region {
  area0: Area
  area1: Area
  area2: Area
  area3: Area
  area4: Area
}

interface Area {
  name: string
  coords: {
    center: {
      crs: string
      x: number
      y: number
    }
  }
}

async function getAddress({ longitude, latitude }: Coord): Promise<APIresponse> {
  const { data } = await geocodeAPI.get(
    `/v2/gc?request=coordsToaddr&coords=${latitude},${longitude}&sourcecrs=epsg:4326&output=json&orders=admcode`
  )
  return data
}

export { getAddress }
