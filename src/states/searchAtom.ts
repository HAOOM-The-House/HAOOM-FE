import { Coord } from '@mj-studio/react-native-naver-map'
import { atom } from 'jotai'

export const SearchTextAtom = atom<string>('')

export const pinCoordinateAtom = atom<Coord>({
  longitude: 0,
  latitude: 0,
})
