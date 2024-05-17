import { colors } from '@/utils/colors'
import styled from 'styled-components/native'
import PrevIcon from '@/assets/images/SVGs/LeftArrow.svg'

interface HeaderProps {
  title?: string
  onPressLeftIcon?: () => void
  showLeftIcon: boolean
}

export default function Header({ title, onPressLeftIcon, showLeftIcon }: HeaderProps) {
  return (
    <Container>
      {showLeftIcon ? <PrevIcon width={20} height={20} onPress={onPressLeftIcon} /> : <EmptyIcon />}
      <TitleText>{title}</TitleText>
      <EmptyIcon />
    </Container>
  )
}

const Container = styled.View`
  width: 100%;
  padding: 13px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const TitleText = styled.Text`
  font-size: 18px;
  font-family: 'Bold';
  color: ${colors.black};
`
const EmptyIcon = styled.View`
  height: 20px;
  width: 20px;
`
