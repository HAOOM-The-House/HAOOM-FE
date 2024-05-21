import Divider from '@/components/Divider'
import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import SearchBar from '@/components/search/SearchBar'
import SearchResult from '@/components/search/SearchResult'
import SearchTip from '@/components/search/SearchTip'
import { useGetStoreListByKeyword, useGetStoreListByPin } from '@/hooks/queries/Store'
import { BottomTabNavParams } from '@/navigators/BottomTabNav'
import { SearchNavParams } from '@/navigators/SearchNav'
import { SearchTextAtom, pinCoordinateAtom, searchByAtom } from '@/states/searchAtom'
import { colors } from '@/utils/colors'
import { getCurrentCoordinate } from '@/utils/location'
import { Coord } from '@mj-studio/react-native-naver-map'
import { StackScreenProps } from '@react-navigation/stack'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'

type SearchMainProps = StackScreenProps<SearchNavParams, 'SearchMain'>
export default function SearchMain({ navigation }: SearchMainProps) {
  const [searchText, setSearchText] = useAtom(SearchTextAtom)
  const [searchBy] = useAtom(searchByAtom)
  const [, setCoordinate] = useAtom(pinCoordinateAtom)

  const { data: storeListByKeyword } = useGetStoreListByKeyword()
  const { data: storeListByPin } = useGetStoreListByPin()
  const storeList = searchBy === 'keyword' ? storeListByKeyword?.data : storeListByPin?.data

  const onPressResult = (storeId: number) => {
    navigation.navigate('SearchStore', { storeId })
  }

  const onPressFindWithCurrentLocation = () => {
    navigation.navigate('SearchMap')
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  useEffect(() => {
    getCurrentCoordinate().then((current: Coord) => setCoordinate(current))
  }, [])

  return (
    <ScreenLayout>
      <TouchableWithoutFeedback onPress={dismissKeyboard} style={{ flex: 1 }}>
        <Container>
          <Header showLeftIcon={false} title="지점 찾기" />
          <SearchContainer>
            <SearchBar value={searchText} setValue={setSearchText} />
            <TouchableOpacity onPress={onPressFindWithCurrentLocation}>
              <FindAddressText>현재 위치로 주소 찾기</FindAddressText>
            </TouchableOpacity>
          </SearchContainer>
          <Divider height={8} />
          <ResultContainer>
            {searchText.length === 0 ? (
              <SearchTip />
            ) : (
              <ResultWrapper>
                {storeList?.map((storeInfo) => (
                  <SearchResult
                    name={storeInfo.name}
                    distance={storeInfo.distance}
                    number={storeInfo.phoneNumber}
                    onPress={() => onPressResult(storeInfo.id)}
                    key={storeInfo.id}
                  />
                ))}
              </ResultWrapper>
            )}
          </ResultContainer>
        </Container>
      </TouchableWithoutFeedback>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
`
const SearchContainer = styled.View`
  width: 100%;
  padding: 0 20px;
  gap: 14px;
  align-items: center;
  padding-bottom: 14px;
`
const FindAddressText = styled.Text`
  font-family: 'Regular';
  color: ${colors.black};
  font-size: 16px;
`
const ResultContainer = styled.View`
  width: 100%;
  padding: 0 20px;
`
const ResultWrapper = styled.View``
