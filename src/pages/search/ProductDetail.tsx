import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import { SearchNavParams } from '@/navigators/SearchNav'
import { tabVisibilityAtom } from '@/states/globalAtom'
import { colors } from '@/utils/colors'
import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import styled from 'styled-components/native'
import * as Linking from 'expo-linking'

type ProductDetailProps = StackScreenProps<SearchNavParams, 'SearchProduct'>

export default function ProductDetail({ navigation }: ProductDetailProps) {
  const isFocused = useIsFocused()
  const [, setTabVisibility] = useAtom(tabVisibilityAtom)

  useEffect(() => {
    isFocused && setTabVisibility(false)
  }, [isFocused])

  const onPressBackBtn = () => {
    navigation.goBack()
  }

  const phoneNumber = '01012345678'
  const onPressInquireBtn = () => {
    Linking.openURL(`sms:${phoneNumber}`)
  }

  return (
    <ScreenLayout>
      <Container>
        <Header showLeftIcon onPressLeftIcon={onPressBackBtn} />
        <TextContainer>
          <StoreName>하움 삼성점</StoreName>
          <ProductName>33패키지</ProductName>
        </TextContainer>
        <ImageContainer showsVerticalScrollIndicator={false}>
          <ImageWrapper />
          <ImageWrapper />
        </ImageContainer>
        <BottomContainer>
          <InquireBtn onPress={onPressInquireBtn}>
            <InquireText>문의하기</InquireText>
          </InquireBtn>
        </BottomContainer>
      </Container>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
  position: relative;
`
const TextContainer = styled.View`
  padding: 20px;
  gap: 4px;
`
const StoreName = styled.Text`
  font-family: 'Medium';
  font-size: 18px;
  color: ${colors.main};
`
const ProductName = styled.Text`
  font-family: 'Bold';
  font-size: 24px;
  color: ${colors.black};
`
const BottomContainer = styled.View`
  width: 100%;
  padding: 15px 20px;
  background-color: ${colors.white};
  position: absolute;
  bottom: 0;
`
const InquireBtn = styled.TouchableOpacity`
  background-color: ${colors.main};
  border-radius: 6px;
  padding: 12px;
  align-items: center;
`
const InquireText = styled.Text`
  font-family: 'Bold';
  font-size: 16px;
  color: ${colors.white};
`
const ImageContainer = styled.ScrollView`
  padding: 20px;
`
const ImageWrapper = styled.View`
  border-radius: 6px;
  width: 100%;
  background-color: #d9d9d9;
  aspect-ratio: 0.7;
  margin-bottom: 10px;
`
