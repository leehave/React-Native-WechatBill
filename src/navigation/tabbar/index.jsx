import { Dimensions, Image, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import React, { useState } from "react";

import Charts from "../../pages/charts/index";
import Home from "../../pages/home/index";
import { IconManager } from '~/assets/json/iconManager'
import Modal from "../../pages/modal/index";
import None from "../../pages/common/None";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getPathDown } from "./curve";
import { scale } from "react-native-size-scaling";

const Tab = createBottomTabNavigator();
const NormalStack = createNativeStackNavigator();
export const NormalStackScreen = () => {
  return (
    <NormalStack.Navigator screenOptions={{ headerShown: false }}>
      <NormalStack.Group>
        <NormalStack.Screen name="BottomTabNavigator" component={BottomTabNavigator}></NormalStack.Screen>
      </NormalStack.Group>
      <NormalStack.Group screenOptions={{ presentation: 'modal' }}>
        <NormalStack.Screen name="Modal" screenOptions={({navigation}) => ({ 'mode': 'modal'})} component={Modal}></NormalStack.Screen>
      </NormalStack.Group>
    </NormalStack.Navigator>
  )
}
export const BottomTabNavigator = () => {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width);
  const returnpathDown = getPathDown(maxWidth, 60, 56);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
          tabBarActiveTintColor: '#63b27b',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "white",
          },
          tabBarIcon: ({ focused, color, size }) => (
            focused ? <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={IconManager.home_icon}
            /> : <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={IconManager.home_icon_s}
            />
          ),
          tabBarLabel: ({ focused }) => (
           focused ? <Text className="text-xs" style={{ color: '#63b27b', fontSize: 14 }}>明细</Text> : <Text className="text-xs text-black" style={{ fontSize: 14 }}>明细</Text>
          ),
        }}
      />
      <Tab.Screen
        name="None"
        component={None}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault()
            navigation.navigate("Modal", {mode: "modal"})
          }
        })}
        options={{
          headerShown: false,
          unmountOnBlur: false,
          tabBarItemStyle: {
            margin: 0,
            zIndex: -50,
          },
          tabBarIcon: () => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                width: 56,
                backgroundColor: "white",
                borderRadius: 35,
              }}
            >
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={IconManager.add_note}
              />
            </View>
          ),
          tabBarLabel: () => (
            <View>
              <Svg width={maxWidth} height={scale(60)}>
                <Path fill={"white"} {...{ d: returnpathDown }} />
              </Svg>
            </View>
          ),
          
        }}
      />
      <Tab.Screen
        name="Charts"
        component={Charts}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "white",
          },
          tabBarIcon: ({ focused, color, size }) => (
            focused ? <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={IconManager.charts_icon}
            /> : <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={IconManager.charts_icon_s}
            />
          ),
          tabBarLabel: ({ focused }) => (
            focused ? <Text className="text-xs" style={{ color: '#63b27b', fontSize: 14 }}>统计</Text> : <Text className="text-xs text-black" style={{ fontSize: 14 }}>统计</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};