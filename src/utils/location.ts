import * as Location from 'expo-location'

export const getCurrentCoordinate = async () => {
  const location = await Location.getCurrentPositionAsync()
  const latitude = location.coords.latitude
  const longitude = Math.abs(location.coords.longitude)
  return { longitude, latitude }
}
