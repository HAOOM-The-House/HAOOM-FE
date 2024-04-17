import BottomTabNav from '@/navigators/BottomTabNav'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import 'react-native-gesture-handler'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomTabNav />
      </NavigationContainer>
    </View>
  )
}
