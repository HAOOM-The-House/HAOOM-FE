import { atom } from 'jotai'

export const SearchTextAtom = atom<string>('')

export const pinLongitudeAtom = atom<number>(0)
export const pinLatitudeAtom = atom<number>(0)
