import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AskMain from '@/pages/ask/Index'

const Stack = createStackNavigator()

export default function AskNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AskMain" component={AskMain} />
    </Stack.Navigator>
  )
}
