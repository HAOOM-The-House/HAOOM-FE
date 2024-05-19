import BottomTabNav from '@/navigators/BottomTabNav'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { useAtom } from 'jotai'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { pinLatitudeAtom, pinLongitudeAtom } from '@/states/searchAtom'

if (__DEV__) {
  require('./ReactotronConfig')
}

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function App() {
  const [, setPinLongitude] = useAtom(pinLongitudeAtom)
  const [, setPinLatitude] = useAtom(pinLatitudeAtom)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync()
      setPinLatitude(location.coords.latitude)
      setPinLongitude(Math.abs(location.coords.longitude))
    })()
  }, [])

  const [fontsLoaded, fontError] = useFonts({
    Thin: require('./src/assets/fonts/Pretendard-Thin.otf'), // 100
    ExtraLight: require('./src/assets/fonts/Pretendard-ExtraLight.otf'), //200
    Light: require('./src/assets/fonts/Pretendard-Light.otf'), // 300
    Regular: require('./src/assets/fonts/Pretendard-Regular.otf'), // 400
    Medium: require('./src/assets/fonts/Pretendard-Medium.otf'), // 500
    SemiBold: require('./src/assets/fonts/Pretendard-SemiBold.otf'), // 600
    Bold: require('./src/assets/fonts/Pretendard-Bold.otf'), // 700
    ExtraBold: require('./src/assets/fonts/Pretendard-ExtraBold.otf'), //800
    Black: require('./src/assets/fonts/Pretendard-Black.otf'), // 900
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <BottomTabNav />
        </NavigationContainer>
      </View>
    </QueryClientProvider>
  )
}
