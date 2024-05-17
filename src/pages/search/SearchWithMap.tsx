import Header from '@/components/Header'
import ScreenLayout from '@/components/ScreenLayout'
import { colors } from '@/utils/colors'
import styled from 'styled-components/native'

export default function SearchWithMap() {
  const onPressBackBtn = () => {
    console.log(1)
  }

  return (
    <ScreenLayout>
      <Container>
        <Header title="지도에서 위치 찾기" onPressLeftIcon={onPressBackBtn} />
        <MapContainer />
        <BottomContainer>
          <TextContainer>
            <Name>하움 삼성점</Name>
            <Address>서울특별시 강남구 삼성동</Address>
          </TextContainer>
          <SettingBtn>
            <SettingText>선택한 위치로 설정</SettingText>
          </SettingBtn>
        </BottomContainer>
      </Container>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
`
const MapContainer = styled.View`
  background-color: ${colors.grey};
  flex: 1;
`
const BottomContainer = styled.View`
  padding: 20px;
  gap: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`
const TextContainer = styled.View`
  gap: 4px;
`
const Name = styled.Text`
  font-family: 'Medium';
  font-size: 16px;
  color: ${colors.black};
`
const Address = styled.Text`
  font-family: 'Regular';
  font-size: 15px;
  color: #888;
`
const SettingBtn = styled.TouchableOpacity`
  border-radius: 6px;
  background-color: ${colors.main};
  padding: 12px;
  width: 100%;
  align-items: center;
`
const SettingText = styled.Text`
  color: ${colors.white};
  font-family: 'Bold';
  font-size: 16px;
`
