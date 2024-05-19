import { clientId, clientSecret } from '@/constants/env'
import axios from 'axios'

const reversegeocodeURL = 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode'
export const geocodeAPI = axios.create({
  baseURL: reversegeocodeURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-NCP-APIGW-API-KEY-ID': clientId,
    'X-NCP-APIGW-API-KEY': clientSecret,
  },
  validateStatus: (status) => {
    return status < 300
  },
})
