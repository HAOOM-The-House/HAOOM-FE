import { clientId, clientSecret } from '@/constants/env'
import axios from 'axios'
import { SERVER_URL, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from '@env'

const api = axios.create({
  baseURL: SERVER_URL,
  validateStatus: (status) => {
    return status < 300
  },
})

const reversegeocodeURL = 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode'
const geocodeAPI = axios.create({
  baseURL: reversegeocodeURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
    'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
  },
  validateStatus: (status) => {
    return status < 300
  },
})

export { api, geocodeAPI }
