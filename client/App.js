import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./screens/home";
import MenuScreen from "./screens/menu";
import SettingScreen from "./screens/setting";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import MyTheme from "./theme/myTheme";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons = {
              "Trang chủ": 'home',
              "Thực đơn": 'ios-fast-food',
              "Cài đặt": 'ios-settings'
            };
      
            return (
              <Ionicons
                name={icons[route.name]}
                color={color}
                size={size}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Trang chủ" component={HomeScreen} />
        <Tab.Screen name="Thực đơn" component={MenuScreen} />
        <Tab.Screen name="Cài đặt" component={SettingScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
