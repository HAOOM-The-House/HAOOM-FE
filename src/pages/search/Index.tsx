import { Store } from '@/apis/Store'
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
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'

type SearchMainProps = StackScreenProps<SearchNavParams, 'SearchMain'>
export default function SearchMain({ navigation }: SearchMainProps) {
  const [searchText, setSearchText] = useAtom(SearchTextAtom)
  const [searchBy, setSearchBy] = useAtom(searchByAtom)
  const [, setCoordinate] = useAtom(pinCoordinateAtom)

  const [storeList, setStoreList] = useState<Store[]>()
  const {
    data: storeListByKeyword,
    isLoading: isLoadingByKeyword,
    hasNextPage: hasNextPageByKeyword,
    fetchNextPage: fetchNextPageByKeyword,
  } = useGetStoreListByKeyword()
  const {
    data: storeListByPin,
    isLoading: isLoadingByPin,
    hasNextPage: hasNextPageByPin,
    fetchNextPage: fetchNextPageByPin,
    refetch,
  } = useGetStoreListByPin()

  const onPressResult = (storeId: number) => {
    navigation.navigate('SearchStore', { storeId })
  }

  const onPressFindWithCurrentLocation = () => {
    setSearchBy('pin')
    navigation.navigate('SearchMap')
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  useEffect(() => {
    getCurrentCoordinate().then((current: Coord) => setCoordinate(current))
  }, [])

  useEffect(() => {
    if (searchBy === 'keyword') {
      const dataArr = storeListByKeyword?.pages.map((page) => page.data).flat()
      setStoreList(dataArr)
    }
  }, [storeListByKeyword])

  useEffect(() => {
    if (searchBy === 'pin') {
      const dataArr = storeListByPin?.pages.map((page) => page.data).flat()
      setStoreList(dataArr)
    }
  }, [storeListByPin])

  const renderItem = ({ item: { id, name, phoneNumber, distance } }: { item: Store }) => (
    <SearchResult name={name} distance={distance} number={phoneNumber} onPress={() => onPressResult(id)} key={id} />
  )

  const getMoreItem = () => {
    if (searchBy === 'keyword' && hasNextPageByKeyword && !isLoadingByKeyword) fetchNextPageByKeyword()
    if (searchBy === 'pin' && hasNextPageByPin && !isLoadingByPin) fetchNextPageByPin()
  }

  const showActivityIndicator = () => {
    if (searchBy === 'keyword')
      return hasNextPageByKeyword ? (
        <Loader>
          <ActivityIndicator size={'small'} />
        </Loader>
      ) : null
    else
      return hasNextPageByPin ? (
        <Loader>
          <ActivityIndicator size={'small'} />
        </Loader>
      ) : null
  }

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
          {searchText.length === 0 ? (
            <SearchTip />
          ) : (
            <FlatList
              data={storeList}
              renderItem={renderItem}
              style={{ flex: 1, paddingHorizontal: 20 }}
              onEndReached={getMoreItem}
              onEndReachedThreshold={0}
              ListFooterComponent={showActivityIndicator}
            />
          )}
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
const Loader = styled.View`
  width: 100%;
  padding: 20px;
`
