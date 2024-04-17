import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeMain from '@/pages/home/Index'

const Stack = createStackNavigator()

export default function HomeNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeMain} />
    </Stack.Navigator>
  )
}
