import { Region } from '@/apis/ReverseGeocode'

export const getAddress = (data: Region) => {
  if (data === undefined) return ''
  return `${data.area1.name} ${data.area2.name} ${data.area3.name} ${data.area4.name}`.trim()
}
