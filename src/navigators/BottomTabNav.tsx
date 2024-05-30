import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchNav from './SearchNav'
import styled from 'styled-components/native'
import { colors } from '@/utils/colors'
import HomeIcon from '@/assets/images/SVGs/Home.svg'
import MapIcon from '@/assets/images/SVGs/Map.svg'
import InquireIcon from '@/assets/images/SVGs/Inquire.svg'
import AskMain from '@/pages/inquire/Index'
import { Platform } from 'react-native'
import { useAtom } from 'jotai'
import { tabVisibilityAtom } from '@/states/globalAtom'
import HomeMain from '@/pages/home/Index'

export type BottomTabNavParams = {
  HomeMain: undefined
  SearchNav: undefined
  AskMain: undefined
}

const Tab = createBottomTabNavigator<BottomTabNavParams>()

export default function BottomTabNav() {
  const [isTabVisible] = useAtom(tabVisibilityAtom)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.main,
        tabBarHideOnKeyboard: Platform.OS === 'android' ? true : false,
        tabBarStyle: {
          display: isTabVisible ? 'flex' : 'none',
          height: 82,
          paddingBottom: Platform.OS === 'android' ? 8 : 0,
          borderTopColor: 'rgba(112, 115, 124, 0.16)',
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tab.Screen
        name="HomeMain"
        component={HomeMain}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabWrapper>
              <HomeIcon color={focused ? colors.main : colors.grey} width={24} height={24} />
              <TabText style={{ color: focused ? colors.main : colors.grey }}>홈</TabText>
            </TabWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="SearchNav"
        component={SearchNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabWrapper>
              <MapIcon color={focused ? colors.main : colors.grey} width={24} height={24} />
              <TabText style={{ color: focused ? colors.main : colors.grey }}>지점찾기</TabText>
            </TabWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="AskMain"
        component={AskMain}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabWrapper>
              <InquireIcon color={focused ? colors.main : colors.grey} width={24} height={24} />
              <TabText style={{ color: focused ? colors.main : colors.grey }}>가맹문의</TabText>
            </TabWrapper>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const TabWrapper = styled.View`
  display: flex;
  gap: 6px;
  align-items: center;
  padding-top: 10px;
`
const TabText = styled.Text`
  font-family: 'Medium';
  font-size: 12px;
`
