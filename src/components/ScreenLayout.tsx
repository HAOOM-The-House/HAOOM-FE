import styled from 'styled-components/native'
import React from 'react'
import { Platform } from 'react-native'
import { StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ScreenLayoutProps {
  children: React.ReactNode
  background?: string
}

export default function ScreenLayout({ children, background = 'white' }: ScreenLayoutProps) {
  const insets = useSafeAreaInsets()
  return (
    <ScreenContainer
      style={{
        backgroundColor: background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
      }}
    >
      {children}
    </ScreenContainer>
  )
}

export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`
