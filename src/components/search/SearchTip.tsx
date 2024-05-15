import { colors } from '@/utils/colors'
import styled from 'styled-components/native'

export default function SearchTip() {
  return (
    <Container>
      <Title>검색 TIP</Title>
      <Description>
        <DescriptionWrapper>
          <Label>도로명 + 건물번호</Label>
          <Example>{'예) 하움로 10번길 15'}</Example>
        </DescriptionWrapper>
        <DescriptionWrapper>
          <Label>지역명 + 번지</Label>
          <Example>{'예) 하움동 4-16'}</Example>
        </DescriptionWrapper>
        <DescriptionWrapper>
          <Label>건물명, 아파트명</Label>
          <Example>{'예) 하움아파트'}</Example>
        </DescriptionWrapper>
      </Description>
    </Container>
  )
}

const Container = styled.View`
  width: 100%;
  gap: 15px;
  padding-top: 22px;
`
const Title = styled.Text`
  font-family: 'Bold';
  font-size: 18px;
  color: ${colors.black};
`
const Description = styled.View`
  gap: 14px;
`
const DescriptionWrapper = styled.View`
  gap: 5px;
`
const Label = styled.Text`
  font-family: 'Regular';
  font-size: 16px;
  color: ${colors.black};
`
const Example = styled.Text`
  font-family: 'Regular';
  font-size: 15px;
  color: #888;
`
