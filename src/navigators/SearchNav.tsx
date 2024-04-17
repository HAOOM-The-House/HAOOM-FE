import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchMain from '@/pages/search/Index'

const Stack = createStackNavigator()

export default function SearchNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchMain" component={SearchMain} />
    </Stack.Navigator>
  )
}
