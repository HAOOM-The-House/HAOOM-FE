import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import { SearchNavParams } from '@/navigators/SearchNav'
import { tabVisibilityAtom } from '@/states/globalAtom'
import { SearchTextAtom, pinCoordinateAtom } from '@/states/searchAtom'
import { colors } from '@/utils/colors'
import { NaverMapMarkerOverlay, NaverMapView, NaverMapViewRef } from '@mj-studio/react-native-naver-map'
import { useIsFocused } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/native'
import PinIcon from '@/assets/images/SVGs/Location.svg'
import { screenHeight, screenWidth } from '@/utils/dimensions'
import { pixelToDpConverter } from '@/utils/pixel'
import { useGetAddress } from '@/hooks/queries/ReverseGeocode'
import { LayoutChangeEvent } from 'react-native'
import { getAddress } from '@/utils/address'
import { Region } from '@/apis/ReverseGeocode'

type SearchWithMapProps = StackScreenProps<SearchNavParams, 'SearchMap'>

export default function SearchWithMap({ navigation }: SearchWithMapProps) {
  const mapRef = useRef<NaverMapViewRef>(null)
  const [mapHeight, setMapHeight] = useState<number>(0)
  const isFocused = useIsFocused()

  const { data: addressInfo } = useGetAddress()

  const [, setTabVisibility] = useAtom(tabVisibilityAtom)
  const [, setSearchText] = useAtom(SearchTextAtom)

  const onPressBackBtn = () => {
    navigation.goBack()
  }

  const [address, setAddress] = useState<string>('')
  const onPressSettingBtn = () => {
    const address = getAddress(addressInfo?.results[0].region as Region)
    setSearchText(address)
    navigation.goBack()
  }

  useEffect(() => {
    isFocused && setTabVisibility(false)
  }, [isFocused])

  const [pinCoordinate, setPinCoordinate] = useAtom(pinCoordinateAtom)
  const getCoordinate = async () => {
    const data = await mapRef.current?.screenToCoordinate({
      screenX: pixelToDpConverter(screenWidth / 2),
      screenY: pixelToDpConverter((mapHeight - 118) / 2 + 118),
    })
    const latitude = Number(data?.latitude)
    const longitude = Number(data?.longitude)
    setPinCoordinate({ latitude, longitude })
  }

  const getMapHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setMapHeight(height)
  }

  useEffect(() => {
    const address = getAddress(addressInfo?.results[0].region as Region)
    setAddress(address)
  }, [addressInfo])

  return (
    <ScreenLayout>
      <Container>
        <Header title="지도에서 위치 찾기" showLeftIcon onPressLeftIcon={onPressBackBtn} />
        <MapContainer onLayout={getMapHeight}>
          <NaverMapView
            style={{ flex: 1 }}
            ref={mapRef}
            mapPadding={{ bottom: 118 }}
            onCameraChanged={getCoordinate}
            initialCamera={{ ...pinCoordinate, zoom: 15 }}
          >
            <NaverMapMarkerOverlay latitude={33} longitude={127} />
          </NaverMapView>
          <Pin width={35} height={43} />
        </MapContainer>
        <BottomContainer>
          <TextContainer>
            <Address>{address}</Address>
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
const left = screenWidth / 2 - 17.5
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
const Address = styled.Text`
  font-family: 'Medium';
  font-size: 16px;
  color: ${colors.black};
  height: 20px;
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
