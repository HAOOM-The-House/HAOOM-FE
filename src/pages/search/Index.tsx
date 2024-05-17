import Divider from '@/components/Divider'
import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import SearchBar from '@/components/search/SearchBar'
import SearchResult from '@/components/search/SearchResult'
import SearchTip from '@/components/search/SearchTip'
import { BottomTabNavParams } from '@/navigators/BottomTabNav'
import { colors } from '@/utils/colors'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'

type SearchNavProps = BottomTabNavigationProp<BottomTabNavParams, 'SearchNav'>
export default function SearchMain() {
  const navigation = useNavigation<SearchNavProps>()
  const [searchText, setSearchText] = useState<string>('')

  const onPressBackBtn = () => {
    navigation.navigate('HomeNav')
  }

  const onPressResult = () => {
    console.log(1)
  }

  const onPressFindWithCurrentLocation = () => {}
  const dismissKeyboard = () => {
    Keyboard.dismiss()
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
          <ResultContainer>
            {searchText.length === 0 ? (
              <SearchTip />
            ) : (
              <ResultWrapper>
                <SearchResult name="하움 삼성점" distance={159} number="021234567" onPress={onPressResult} />
                <SearchResult name="하움 삼성점" distance={159} number="021234567" onPress={onPressResult} />
                <SearchResult name="하움 삼성점" distance={159} number="021234567" onPress={onPressResult} />
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
