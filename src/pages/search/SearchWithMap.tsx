import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import { SearchNavParams } from '@/navigators/SearchNav'
import { tabVisibilityAtom } from '@/states/globalAtom'
import { SearchTextAtom } from '@/states/searchAtom'
import { colors } from '@/utils/colors'
import { NaverMapMarkerOverlay, NaverMapView, NaverMapViewRef } from '@mj-studio/react-native-naver-map'
import { useIsFocused } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import styled from 'styled-components/native'
import PinIcon from '@/assets/images/SVGs/Pin.svg'
import { screenHeight, screenWidth } from '@/utils/dimensions'
import { pixelToDpConverter } from '@/utils/pixel'

type SearchWithMapProps = StackScreenProps<SearchNavParams, 'SearchMap'>

export default function SearchWithMap({ navigation }: SearchWithMapProps) {
  const mapRef = useRef<NaverMapViewRef>(null)
  const isFocused = useIsFocused()
  const [, setTabVisibility] = useAtom(tabVisibilityAtom)
  const [, setSearchText] = useAtom(SearchTextAtom)

  const onPressBackBtn = () => {
    navigation.goBack()
  }

  const onPressSettingBtn = () => {
    setSearchText('강남구 삼성동')
    navigation.goBack()
  }

  useEffect(() => {
    isFocused && setTabVisibility(false)
  }, [isFocused])

  const getCoordinate = async () => {
    const data = await mapRef.current?.screenToCoordinate({
      screenX: pixelToDpConverter(screenWidth / 2 - 21),
      screenY: pixelToDpConverter(screenHeight / 2 + 118),
    })
    // return data
    console.log(data)
  }

  return (
    <ScreenLayout>
      <Container>
        <Header title="지도에서 위치 찾기" showLeftIcon onPressLeftIcon={onPressBackBtn} />
        <MapContainer>
          <NaverMapView style={{ flex: 1 }} ref={mapRef} mapPadding={{ bottom: 118 }} onCameraChanged={getCoordinate}>
            <NaverMapMarkerOverlay latitude={33} longitude={127} />
          </NaverMapView>
          <Pin color={colors.main} />
        </MapContainer>
        <BottomContainer>
          <TextContainer>
            <Name>하움 삼성점</Name>
            <Address>서울특별시 강남구 삼성동</Address>
          </TextContainer>
          <SettingBtn onPress={onPressSettingBtn}>
            <SettingText>선택한 위치로 설정</SettingText>
          </SettingBtn>
        </BottomContainer>
      </Container>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
  position: relative;
`
const MapContainer = styled.View`
  background-color: ${colors.grey};
  flex: 1;
  position: relative;
`
const left = screenWidth / 2 - 21
const bottom = screenHeight / 2
const Pin = styled(PinIcon)`
  position: absolute;
  left: ${`${left}px`};
  bottom: ${`${bottom}px`};
`
const BottomContainer = styled.View`
  padding: 20px;
  gap: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 118px;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${colors.white};
`
const TextContainer = styled.View`
  gap: 4px;
`
const Name = styled.Text`
  font-family: 'Medium';
  font-size: 16px;
  color: ${colors.black};
`
const Address = styled.Text`
  font-family: 'Regular';
  font-size: 15px;
  color: #888;
`
const SettingBtn = styled.TouchableOpacity`
  border-radius: 6px;
  background-color: ${colors.main};
  padding: 12px;
  width: 100%;
  align-items: center;
`
const SettingText = styled.Text`
  color: ${colors.white};
  font-family: 'Bold';
  font-size: 16px;
`
