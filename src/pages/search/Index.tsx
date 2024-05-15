import Divider from '@/components/Divider'
import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import SearchBar from '@/components/search/SearchBar'
import SearchTip from '@/components/search/SearchTip'
import { BottomTabNavParams } from '@/navigators/BottomTabNav'
import { colors } from '@/utils/colors'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

type SearchNavProps = BottomTabNavigationProp<BottomTabNavParams, 'SearchNav'>
export default function SearchMain() {
  const navigation = useNavigation<SearchNavProps>()
  const [searchText, setSearchText] = useState<string>('')

  const onPressBackBtn = () => {
    navigation.navigate('HomeNav')
  }

  const onPressFindWithCurrentLocation = () => {}
  return (
    <ScreenLayout>
      <Header onPressLeftIcon={onPressBackBtn} title="지점 찾기" />
      <SearchContainer>
        <SearchBar value={searchText} setValue={setSearchText} />
        <TouchableOpacity onPress={onPressFindWithCurrentLocation}>
          <FindAddressText>현재 위치로 주소 찾기</FindAddressText>
        </TouchableOpacity>
      </SearchContainer>
      <Divider height={8} />
      <ResultContainer>
        <SearchTip />
      </ResultContainer>
    </ScreenLayout>
  )
}

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
