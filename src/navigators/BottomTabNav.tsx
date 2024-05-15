import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNav from './HomeNav'
import AskNav from './AskNav'
import SearchNav from './SearchNav'
import styled from 'styled-components/native'
import { colors } from '@/utils/colors'
import HomeIcon from '@/assets/images/SVGs/Home.svg'
import MapIcon from '@/assets/images/SVGs/Map.svg'
import InquireIcon from '@/assets/images/SVGs/Inquire.svg'

export type BottomTabNavParams = {
  HomeNav: undefined
  SearchNav: undefined
  AskNav: undefined
}

const Tab = createBottomTabNavigator<BottomTabNavParams>()

export default function BottomTabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.main,
        tabBarStyle: {
          height: 82,
          borderTopColor: 'rgba(112, 115, 124, 0.16)',
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tab.Screen
        name="HomeNav"
        component={HomeNav}
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
        name="AskNav"
        component={AskNav}
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
