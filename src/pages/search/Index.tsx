import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import SearchBar from '@/components/search/SearchBar'
import { BottomTabNavParams } from '@/navigators/BottomTabNav'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

type SearchNavProps = BottomTabNavigationProp<BottomTabNavParams, 'SearchNav'>
export default function SearchMain() {
  const navigation = useNavigation<SearchNavProps>()
  const [searchText, setSearchText] = useState<string>('')

  const onPressBackBtn = () => {
    navigation.navigate('HomeNav')
  }
  return (
    <ScreenLayout>
      <Header onPressLeftIcon={onPressBackBtn} title="지점 찾기" />
      <SearchContainer>
        <SearchBar value={searchText} setValue={setSearchText} />
      </SearchContainer>
    </ScreenLayout>
  )
}

const SearchContainer = styled.View`
  width: 100%;
  padding: 0 20px;
`
