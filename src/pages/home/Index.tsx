import ScreenLayout from '@/components/ScreenLayout'
import { Image, Text } from 'react-native'
import styled from 'styled-components/native'

export default function HomeMain() {
  return (
    <ScreenLayout>
      <Header>
        <Image
          source={require('@/assets/images/PNGs/logo.png')}
          style={{ height: 46, width: 100, resizeMode: 'contain' }}
        />
      </Header>
      <Container>
        <MainText>COMING SOON</MainText>
      </Container>
    </ScreenLayout>
  )
}

const Header = styled.View`
  width: 100%;
  height: 46px;
  justify-content: flex-start;
  padding-left: 14px;
`
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
const MainText = styled.Text`
  color: #b4b4b5;
  font-size: 20px;
  font-family: 'SemiBold';
`
