import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchMain from '@/pages/search/Index'
import SearchMap from '@/pages/search/SearchWithMap'

export type SearchNavParams = {
  SearchMain: undefined
  SearchMap: undefined
}

const Stack = createStackNavigator<SearchNavParams>()

export default function SearchNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchMain} />
      <Stack.Screen name="SearchMap" component={SearchMap} />
    </Stack.Navigator>
  )
}
