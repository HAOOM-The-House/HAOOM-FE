import styled from 'styled-components/native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

interface ScreenLayoutProps {
  children: React.ReactNode
}

export default function ScreenLayout({ children }: ScreenLayoutProps) {
  return (
    <ScreenContainer>
      <StatusBar />
      {children}
    </ScreenContainer>
  )
}

export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`
