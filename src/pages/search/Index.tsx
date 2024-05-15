import ScreenLayout from '@/components/ScreenLayout'
import { BottomTabNavParams } from '@/navigators/BottomTabNav'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'

type SearchNavProps = BottomTabNavigationProp<BottomTabNavParams, 'SearchNav'>
export default function SearchMain() {
  const navigation = useNavigation<SearchNavProps>()
  const onPressBackBtn = () => {
    navigation.navigate('HomeNav')
  }
  return (
    <ScreenLayout>
      <Header onPressLeftIcon={onPressBackBtn} title="지점 찾기" />
    </ScreenLayout>
  )
}
