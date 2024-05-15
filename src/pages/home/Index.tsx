import ScreenLayout from '@/components/ScreenLayout'
import {
  NaverMapCircleOverlay,
  NaverMapMarkerOverlay,
  NaverMapPathOverlay,
  NaverMapPolygonOverlay,
  NaverMapView,
  Region,
} from '@mj-studio/react-native-naver-map'
import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import * as Location from 'expo-location'
import { useAtom } from 'jotai'
import { locationAtom } from '@/states/location'
import styled from 'styled-components/native'

const jejuRegion: Region = {
  latitude: 33.20530773,
  longitude: 126.14656715029,
  latitudeDelta: 0.38,
  longitudeDelta: 0.8,
}

export default function HomeMain() {
  const [location, setLocation] = useAtom(locationAtom)

  useEffect(() => {
    getDefaultLocation()
  }, [])

  const getDefaultLocation = async () => {
    try {
      const currentLocation = await Location.getLastKnownPositionAsync()
      setLocation(currentLocation)
    } catch (error) {
      console.log(`location loading error: ${error}`)
    }
  }

  return (
    <ScreenLayout>
      <NaverMapView style={{ flex: 1 }} initialRegion={jejuRegion}>
        <NaverMapMarkerOverlay
          latitude={33.20530773}
          longitude={126.14656715029}
          onTap={() => console.log(1)}
          anchor={{ x: 0, y: 1 }}
          width={40}
          height={50}
        />
      </NaverMapView>
    </ScreenLayout>
  )
}
