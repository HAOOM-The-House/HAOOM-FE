import styled from 'styled-components/native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

interface ScreenLayoutProps {
  children: React.ReactNode
  background?: string
}

export default function ScreenLayout({ children, background = 'white' }: ScreenLayoutProps) {
  return (
    <ScreenContainer style={{ backgroundColor: background }}>
      <StatusBar />
      {children}
    </ScreenContainer>
  )
}

export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`
