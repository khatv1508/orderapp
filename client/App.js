import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./screens/home";
import MenuScreen from "./screens/menu";
import SettingScreen from "./screens/setting";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import MyTheme from "./theme/myTheme";
import { store } from './store/store';
import { Provider } from 'react-redux';
import MySnackBar from "./component/snack-bar/snack-bar";
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icons = {
                "Home": 'home',
                "Menu": 'ios-fast-food',
                "Setting": 'ios-settings'
              };

              // const getTitleByRouteName = () => {
              //   switch (route.name){
              //     case "Home": return "Trang chủ";
              //     case "Menu": return "Thực đơn";
              //     case "Setting": return "Cài đặt";
              //   }
              // }
        
              return (
                <View>
                  <Ionicons
                    name={icons[route.name]}
                    color={color}
                    size={size}
                  />
                </View>
              );
            },
          })}
        >
          <Tab.Screen name="Home"  component={HomeScreen} 
            options={{
              title: 'Trang chủ'
            }}
          />
          <Tab.Screen name="Menu" component={MenuScreen} 
            options={{
              title: 'Thực đơn'
            }}
          />
          <Tab.Screen name="Setting" component={SettingScreen}
            options={{
              title: 'Cài đặt'
            }}
          />
        </Tab.Navigator>
        <MySnackBar />
      </NavigationContainer>
    </Provider>
    
  );
}
