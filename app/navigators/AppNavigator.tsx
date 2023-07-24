/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme, View, StyleSheet, Image, ViewStyle, Text } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import LinearGradient from 'react-native-linear-gradient';
import { Drawer } from 'react-native-drawer-layout';
import { DrawerIconButton } from "app/screens/DemoShowroomScreen/DrawerIconButton"
import { useSharedValue } from "react-native-reanimated"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined // @demo remove-current-line
  Demo: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */

const exitRoutes = Config.exitRoutes

function CustomHeaderBackground ({ children = null }) {
  // const { options, route, navigation } = props;
  return (
    <LinearGradient
      start={{x: 0, y: 0}} 
      end={{x: 1, y: 0}}
      colors={['#301F0B', '#E8C36B', '#301F0B']} // 使用線性漸變的顏色
      style={styles.linearGradient}
    >
      { children || null }
    </LinearGradient>
  );
}

// 樣式
const styles = StyleSheet.create({
  linearGradient: {
    // color: colors.white,
    margin: 0,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
  },
  logo: {
    display: 'flex',
    height: 30,
    margin: 0,
    objectFit: 'contain',
    paddingBottom: 30,
    paddingTop: 30,
    width: 100,
  }
});

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  // @demo remove-block-start
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()
  const [open, setOpen] = React.useState(false);
  const progress = useSharedValue(0)
  
  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  // @demo remove-block-end
  return (
    <Drawer
    open={open}
    onOpen={() => setOpen(true)}
    onClose={() => setOpen(false)}
    renderDrawerContent={() => {
      return <Text>Drawer content</Text>;
    }}
    drawerPosition={"right"}
    >
      <Stack.Navigator
        screenOptions={{ 
          headerShown: true, 
          header: () => 
            <View>
                <CustomHeaderBackground>
                  <View style={$navbar}>
                    <View>
                      <Image
                        style={styles.logo}
                        source={require('../../assets/logo/logo.png')}
                      />
                    </View>
                    <View>
                      <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />
                    </View>
                  </View>
              </CustomHeaderBackground>
            </View>
          ,
          headerBackVisible: false,
          navigationBarColor: colors.background 
        }}
        initialRouteName={isAuthenticated ? "Welcome" : "Login"} // @demo remove-current-line
      >
        {/* @demo remove-block-start */}
        {isAuthenticated ? (
          <>
            {/* @demo remove-block-end */}
            <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
            {/* @demo remove-block-start */}
            <Stack.Screen name="Demo" component={DemoNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Screens.LoginScreen} />
          </>
        )}
        {/* @demo remove-block-end */}
        {/** 🔥 Your screens go here */}
        {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
      </Stack.Navigator>
    </Drawer>
  )
})
const $navbar: ViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
}

// const $menuContainer: ViewStyle = {
//   paddingBottom: spacing.xs,
//   paddingTop: spacing.lg,
// }

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        {...props}
      >
          <AppStack />
      </NavigationContainer>
  )
})
