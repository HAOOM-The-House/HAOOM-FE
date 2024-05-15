import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchMain from '@/pages/search/Index'

export type SearchNavParams = {
  SearchMain: undefined
}

const Stack = createStackNavigator<SearchNavParams>()

export default function SearchNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchMain} />
    </Stack.Navigator>
  )
}
