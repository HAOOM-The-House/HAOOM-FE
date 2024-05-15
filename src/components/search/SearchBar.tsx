import { colors } from '@/utils/colors'
import styled from 'styled-components/native'
import SearchIcon from '@/assets/images/SVGs/Search.svg'
import CloseIcon from '@/assets/images/SVGs/Close.svg'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

interface SearchBarProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ value, setValue }: SearchBarProps) {
  const onPressResetBtn = () => {
    setValue('')
  }
  return (
    <Container>
      <SearchIcon width={16} height={16} />
      <Input
        placeholderTextColor="#a5a5a5"
        placeholder="도로명, 건물명 또는 지번으로 검색"
        autoFocus
        value={value}
        onChangeText={(input: string) => setValue(input)}
        autoCapitalize="none"
      />
      {value.length !== 0 && <CloseIcon onPress={onPressResetBtn} width={16} height={16} />}
    </Container>
  )
}

const Container = styled.View`
  width: 100%;
  border-radius: 6px;
  background-color: #f6f7f8;
  flex-direction: row;
  gap: 10px;
  padding: 12px 10px;
  align-items: center;
`
const Input = styled.TextInput`
  flex: 1;
  color: ${colors.black};
  font-size: 16px;
  font-family: 'Medium';
`
