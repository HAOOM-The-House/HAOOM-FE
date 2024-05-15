import { atom } from 'jotai'
import * as Location from 'expo-location'

export const locationAtom = atom<Location.LocationObject | null>(null)
