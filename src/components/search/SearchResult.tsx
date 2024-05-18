import styled from 'styled-components/native'
import LocationIcon from '@/assets/images/SVGs/Location.svg'
import { colors } from '@/utils/colors'

interface SearchResultProps {
  name: string
  distance: number
  number: string
  onPress: () => void
}

export default function SearchResult({ name, distance, number, onPress }: SearchResultProps) {
  const getDistance = () => {
    if (distance >= 1000) {
      const kilometer = distance / 1000
      if (Number.isInteger(kilometer)) return String(kilometer) + 'KM'
      else return String(kilometer.toFixed(1)) + 'KM'
    } else {
      return String(distance) + 'M'
    }
  }

  const getNumber = () => {
    if (number.length === 8) {
      return number.replace(/(\d{4})(\d{4})/, '$1-$2')
    } else if (number.length === 9) {
      return number.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')
    } else if (number.length === 10) {
      return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    } else if (number.length === 11) {
      return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    } else {
      return number
    }
  }

  return (
    <Container onPress={onPress}>
      <LocationIcon width={20} height={20} />
      <TextContainer>
        <Name>{name}</Name>
        <Detail>
          {getDistance()} / {getNumber()}
        </Detail>
      </TextContainer>
    </Container>
  )
}

const Container = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  padding: 20px 0;
  flex-direction: row;
  gap: 5px;
`
const TextContainer = styled.View`
  gap: 4px;
`
const Name = styled.Text`
  font-family: 'Medium';
  font-size: 16px;
  color: ${colors.black};
`
const Detail = styled.Text`
  font-family: 'Regular';
  font-size: 15px;
  color: #888;
`
