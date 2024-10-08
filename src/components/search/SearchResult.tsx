import styled from 'styled-components/native'
import LocationIcon from '@/assets/images/SVGs/Location.svg'
import { colors } from '@/utils/colors'
import { getNumber } from '@/utils/number'
import { getDistance } from '@/utils/distance'

interface SearchResultProps {
  name: string
  distance: number
  number: string
  onPress: () => void
}

export default function SearchResult({ name, distance, number, onPress }: SearchResultProps) {
  return (
    <Container onPress={onPress}>
      <LocationIcon width={20} height={20} />
      <TextContainer>
        <Name>{name}</Name>
        <Detail>
          {getDistance(distance)} / {getNumber(number)}
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
