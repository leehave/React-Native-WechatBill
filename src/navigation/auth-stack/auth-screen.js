import LoginScreen from '@screens/login-screen/login-screen';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
const AuthStack = createStackNavigator();

const AuthStackScreens = () => (
  <AuthStack.Navigator headerMode= "none" >
  <AuthStack.Screen name="LoginScreen" component = { LoginScreen } />
    </AuthStack.Navigator>
);

export default AuthStackScreens;