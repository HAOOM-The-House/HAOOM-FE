import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import { SearchNavParams } from '@/navigators/SearchNav'
import { colors } from '@/utils/colors'
import { screenWidth } from '@/utils/dimensions'
import { useIsFocused } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import { useEffect } from 'react'
import styled from 'styled-components/native'
import { tabVisibilityAtom } from '@/states/globalAtom'
import { useAtom } from 'jotai'

const dummydata = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'Third Item',
  },
  {
    title: 'Third Item',
  },
  {
    title: 'Third Item',
  },
]
type ItemProps = { title: string }

type ProductListProps = StackScreenProps<SearchNavParams, 'SearchStore'>

export default function ProductList({ navigation }: ProductListProps) {
  const isFocused = useIsFocused()
  const [, setTabVisibility] = useAtom(tabVisibilityAtom)

  const onPressProduct = () => {
    navigation.navigate('SearchProduct')
  }
  const onPressBackBtn = () => {
    navigation.goBack()
  }

  useEffect(() => {
    isFocused && setTabVisibility(false)
  }, [isFocused])

  const Item = ({ title }: ItemProps) => <ImgWrapper onPress={onPressProduct} />
  return (
    <ScreenLayout>
      <Container>
        <Header showLeftIcon={true} onPressLeftIcon={onPressBackBtn} />
        <TextContainer>
          <Name>하움 삼성점</Name>
          <DetailContainer>
            <Detail>서울시 강남구 삼성동</Detail>
            <Detail>02-1234-5678</Detail>
          </DetailContainer>
        </TextContainer>
        <ImageContainer
          data={dummydata}
          renderItem={(ItemProps) => <Item title={String(ItemProps)} />}
          contentContainerStyle={{ gap: 12 }}
          columnWrapperStyle={{ gap: 12 }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        ></ImageContainer>
      </Container>
    </ScreenLayout>
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
const ImageContainer = styled.FlatList`
  flex: 1;
  padding: 20px;
`

const width = screenWidth / 2 - 26
const ImgWrapper = styled.TouchableOpacity`
  background-color: #d9d9d9;
  border-radius: 6px;
  aspect-ratio: 0.7;
  width: ${`${width}px`};
`
