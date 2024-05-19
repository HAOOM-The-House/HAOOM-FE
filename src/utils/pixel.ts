import { PixelRatio } from 'react-native'

// https://reactnative.dev/docs/pixelratio
const pixelToDpConverter = (px: number) => {
  const pixelRatio = PixelRatio.get()
  return px / pixelRatio
}

export { pixelToDpConverter }
