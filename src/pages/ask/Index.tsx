import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import { BottomTabNavParams } from '@/navigators/BottomTabNav'
import { colors } from '@/utils/colors'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'

type AskMainProps = BottomTabNavigationProp<BottomTabNavParams, 'AskMain'>

export default function AskMain() {
  const navigation = useNavigation<AskMainProps>()
  const onPressBackBtn = () => {
    navigation.navigate('HomeNav')
  }

  return (
    <ScreenLayout>
      <Header title="가맹문의" onPressLeftIcon={onPressBackBtn} />
      <Container>
        <Description>가맹점 문의에 대한 궁금하신 사항은{'\n'}하단 연락처로 문의해주세요!</Description>
        <NumberContainer>
          <Number>010-1234-5678</Number>
        </NumberContainer>
      </Container>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  gap: 20px;
  align-items: center;
  justify-content: center;
`
const Description = styled.Text`
  font-family: 'Medium';
  font-size: 17px;
  color: ${colors.black};
  text-align: center;
  line-height: 23px;
`
const NumberContainer = styled.View`
  border-radius: 6px;
  width: 100%;
  background-color: #f6f7f8;
  align-items: center;
  justify-content: center;
  height: 50px;
`
const Number = styled.Text`
  color: ${colors.black};
  font-size: 20px;
  font-family: 'Bold';
`
