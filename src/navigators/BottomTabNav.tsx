import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNav from './HomeNav'
import AskNav from './AskNav'
import SearchNav from './SearchNav'

const Tab = createBottomTabNavigator()

export default function BottomTabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeNav" component={HomeNav} />
      <Tab.Screen name="SearchNav" component={AskNav} />
      <Tab.Screen name="AskNav" component={SearchNav} />
    </Tab.Navigator>
  )
}
