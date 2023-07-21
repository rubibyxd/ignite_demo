import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
// import { Icon } from "../components"
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { translate } from "../i18n"
import { DemoCommunityScreen, DemoShowroomScreen, DemoDebugScreen } from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import About from "app/screens/About"

export type DemoTabParamList = {
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined,
  About: undefined,
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()


  return (
    <Tab.Navigator
    screenOptions={({ navigation }) => ({
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: [$tabBar, { height: bottom + 70 }],
      tabBarActiveTintColor: colors.text,
      tabBarInactiveTintColor: colors.text,
      tabBarLabelStyle: [$tabBarLabel, { color: navigation.isFocused() ? colors.primaryColor : colors.text }],
      tabBarItemStyle: [$tabBarItem, { borderTopColor: navigation.isFocused() ? colors.primaryColor : colors.tabBarBackground }]
    })}
    >
      <Tab.Screen
        name="DemoShowroom"
        component={DemoShowroomScreen}
        options={{
          tabBarLabel: translate("demoNavigator.homeTab"),
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon name="home" color={focused ? colors.tint : colors.text} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoCommunity"
        component={DemoCommunityScreen}
        options={{
          tabBarLabel: translate("demoNavigator.depositTab"),
          tabBarIcon: ({ focused }) => (
            <EntypoIcon name="wallet" color={focused ? colors.tint : colors.text} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoPodcastList"
        component={DemoPodcastListScreen}
        options={{
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: translate("demoNavigator.loginTab"),
          tabBarIcon: ({ focused }) => (
            <EntypoIcon name="login" color={focused ? colors.tint : colors.text} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator.registerTab"),
          tabBarIcon: ({ focused }) => (
            <FontAwesome5Icon name="user-plus" color={focused ? colors.tint : colors.text} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: translate("demoNavigator.serviceTab"),
          tabBarIcon: ({ focused }) => (
            <FontAwesome5Icon name="headset" color={focused ? colors.tint : colors.text} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.tabBarBackground,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.sm,
  borderTopWidth: 3,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
