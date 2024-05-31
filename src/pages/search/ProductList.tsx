import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import { SearchNavParams } from '@/navigators/SearchNav'
import { colors } from '@/utils/colors'
import { screenHeight, screenWidth } from '@/utils/dimensions'
import { StackScreenProps } from '@react-navigation/stack'
import { Suspense, useCallback } from 'react'
import styled from 'styled-components/native'
import { tabVisibilityAtom } from '@/states/globalAtom'
import { useAtom } from 'jotai'
import { useGetStoreInfo } from '@/hooks/queries/Store'
import { getNumber } from '@/utils/number'
import { Product } from '@/apis/Store'
import { ActivityIndicator, FlatList, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

type ProductListProps = StackScreenProps<SearchNavParams, 'SearchStore'>

export default function ProductList({ navigation, route }: ProductListProps) {
  const [, setTabVisibility] = useAtom(tabVisibilityAtom)

  const { storeInfo } = useGetStoreInfo(route.params.storeId)
  const addressFull = `${storeInfo?.address.sido} ${storeInfo?.address.sigungu} ${storeInfo?.address.doro}`

  const onPressProduct = (productId: number) => {
    navigation.navigate('SearchProduct', { productId, number: storeInfo.phoneNumber, storeName: storeInfo.name })
  }
  const onPressBackBtn = () => {
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      setTabVisibility(false)
      return () => {
        setTabVisibility(true)
      }
    }, [])
  )

  const renderItem = ({ item: { id, thumbnailUrl, name } }: { item: Product }) => (
    <ImgWrapper onPress={() => onPressProduct(id)}>
      <Image
        style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 6 }}
        source={{ uri: thumbnailUrl }}
      />
    </ImgWrapper>
  )

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <ScreenLayout>
        <Container>
          <Header showLeftIcon={true} onPressLeftIcon={onPressBackBtn} />
          <TextContainer>
            <Name>{storeInfo?.name}</Name>
            <DetailContainer>
              <Detail>{addressFull}</Detail>
              <Detail>{storeInfo?.address.detail}</Detail>
              <Detail>{getNumber(storeInfo?.phoneNumber)}</Detail>
            </DetailContainer>
          </TextContainer>
          {storeInfo.products.length !== 0 ? (
            <FlatList
              data={storeInfo.products}
              renderItem={renderItem}
              contentContainerStyle={{ gap: 12, paddingBottom: screenHeight * 0.05 }}
              columnWrapperStyle={{ gap: 12 }}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1, padding: 20 }}
            />
          ) : (
            <NoProductWrapper>
              <NoProduct>상품이 존재하지 않습니다.</NoProduct>
            </NoProductWrapper>
          )}
        </Container>
      </ScreenLayout>
    </Suspense>
  )
}

const Container = styled.View`
  flex: 1;
`
const TextContainer = styled.View`
  padding: 20px;
  gap: 16px;
`
const Name = styled.Text`
  font-family: 'Bold';
  font-size: 24px;
  color: ${colors.black};
`
const DetailContainer = styled.View``
const Detail = styled.Text`
  color: #888;
  font-family: 'Regular';
  font-size: 18px;
`
const width = screenWidth / 2 - 26
const ImgWrapper = styled.TouchableOpacity`
  border-radius: 6px;
  aspect-ratio: 0.7;
  width: ${`${width}px`};
`

const NoProductWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const NoProduct = styled.Text`
  font-family: 'Regular';
  font-size: 15px;
  color: #888;
`
