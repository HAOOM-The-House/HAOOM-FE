import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import { SearchNavParams } from '@/navigators/SearchNav'
import { tabVisibilityAtom } from '@/states/globalAtom'
import { colors } from '@/utils/colors'
import { StackScreenProps } from '@react-navigation/stack'
import { useAtom } from 'jotai'
import { Suspense, useCallback } from 'react'
import styled from 'styled-components/native'
import * as Linking from 'expo-linking'
import { useGetProductInfo } from '@/hooks/queries/Store'
import { ActivityIndicator, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { screenHeight } from '@/utils/dimensions'

type ProductDetailProps = StackScreenProps<SearchNavParams, 'SearchProduct'>

export default function ProductDetail({ navigation, route }: ProductDetailProps) {
  const [, setTabVisibility] = useAtom(tabVisibilityAtom)
  const { productInfo } = useGetProductInfo(route.params.productId)

  const onPressBackBtn = () => {
    navigation.goBack()
  }

  const onPressInquireBtn = () => {
    Linking.openURL(`sms:${route.params.number}`)
  }

  useFocusEffect(useCallback(() => setTabVisibility(false), []))

  return (
    <ScreenLayout>
      <Suspense fallback={<ActivityIndicator size="small" />}>
        <Container>
          <Header showLeftIcon onPressLeftIcon={onPressBackBtn} />
          <TextContainer>
            <StoreName>{route.params.storeName}</StoreName>
            <ProductName>{productInfo.name}</ProductName>
          </TextContainer>
          <ImageContainer showsVerticalScrollIndicator={false}>
            {productInfo.imgUrls.map((path, i) => (
              <ImageWrapper
                key={path}
                style={{ paddingBottom: i === productInfo.imgUrls.length - 1 ? screenHeight * 0.1 : 0 }}
              >
                <Image
                  source={{ uri: path }}
                  style={{ width: '100%', aspectRatio: 0.7, resizeMode: 'cover', borderRadius: 6 }}
                />
              </ImageWrapper>
            ))}
          </ImageContainer>
          <BottomContainer>
            <InquireBtn onPress={onPressInquireBtn}>
              <InquireText>문의하기</InquireText>
            </InquireBtn>
          </BottomContainer>
        </Container>
      </Suspense>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
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
  padding: 0 20px 0 20px;
`
const ImageWrapper = styled.View`
  border-radius: 6px;
  width: 100%;
  aspect-ratio: 0.7;
  margin-bottom: 10px;
`
