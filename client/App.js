import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from "./screens/home";
import MenuScreen from "./screens/menu";
import SettingScreen from "./screens/setting";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTheme from "./theme/myTheme";
import { store } from './store/store';
import { Provider } from 'react-redux';
import MySnackBar from "./component/snack-bar/snack-bar";
import OrderScreen from "./screens/order";
import BadgeIcon from "./component/badge-icon/badge-icon"; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              return (
                <BadgeIcon routeName={route.name} color={color} size={size}/>
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
          <Tab.Screen name="Order" component={OrderScreen}
            options={{
              title: 'Đặt món'
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
