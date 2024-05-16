import styled from 'styled-components/native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

interface ScreenLayoutProps {
  children: React.ReactNode
  background?: string
}

export default function ScreenLayout({ children, background = 'white' }: ScreenLayoutProps) {
  return (
    <ScreenContainer style={{ backgroundColor: background }}>
      {Platform.OS === 'ios' && <StatusBar />}
      {children}
    </ScreenContainer>
  )
}

export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`
