import ScreenLayout from '@/components/ScreenLayout'
import {
  NaverMapCircleOverlay,
  NaverMapMarkerOverlay,
  NaverMapPathOverlay,
  NaverMapPolygonOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map'
import { Text } from 'react-native'

interface Region {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

const jejuRegion: Region = {
  latitude: 33.20530773,
  longitude: 126.14656715029,
  latitudeDelta: 0.38,
  longitudeDelta: 0.8,
}

export default function HomeMain() {
  return (
    <ScreenLayout>
      <NaverMapView style={{ flex: 1 }}>
        <NaverMapMarkerOverlay
          latitude={33.3565607356}
          longitude={126.48599018}
          onTap={() => console.log(1)}
          anchor={{ x: 0.5, y: 1 }}
          width={100}
          height={100}
        />
      </NaverMapView>
    </ScreenLayout>
  )
}
