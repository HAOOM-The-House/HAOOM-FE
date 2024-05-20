import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchMain from '@/pages/search/Index'
import SearchMap from '@/pages/search/SearchWithMap'
import SearchStore from '@/pages/search/ProductList'
import SearchProduct from '@/pages/search/ProductDetail'

export type SearchNavParams = {
  SearchMain: undefined
  SearchMap: undefined
  SearchStore: { storeId: number }
  SearchProduct: { productId: number; number: string; storeName: string }
}

const Stack = createStackNavigator<SearchNavParams>()

export default function SearchNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchMain} />
      <Stack.Screen name="SearchMap" component={SearchMap} />
      <Stack.Screen name="SearchStore" component={SearchStore} />
      <Stack.Screen name="SearchProduct" component={SearchProduct} />
    </Stack.Navigator>
  )
}
