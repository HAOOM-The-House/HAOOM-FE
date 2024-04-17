import BottomTabNav from '@/navigators/BottomTabNav'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Black: require('./src/assets/fonts/Pretendard-Black.otf'),
    Bold: require('./src/assets/fonts/Pretendard-Bold.otf'),
    ExtraBold: require('./src/assets/fonts/Pretendard-ExtraBold.otf'),
    ExtraLight: require('./src/assets/fonts/Pretendard-ExtraLight.otf'),
    Light: require('./src/assets/fonts/Pretendard-Light.otf'),
    Medium: require('./src/assets/fonts/Pretendard-Medium.otf'),
    Regular: require('./src/assets/fonts/Pretendard-Regular.otf'),
    SemiBold: require('./src/assets/fonts/Pretendard-SemiBold.otf'),
    Thin: require('./src/assets/fonts/Pretendard-Thin.otf'),
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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <BottomTabNav />
      </NavigationContainer>
    </View>
  )
}
