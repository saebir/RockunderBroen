import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { supabase } from './lib/supabase';


console.log('Supabase klient:', supabase);

import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/auth/ResetPasswordScreen';

import HomeScreen from './screens/home/HomeScreen';
import ProgramScreen from './screens/home/ProgramScreen';
import MapScreen from './screens/home/MapScreen'

import MadScreen from './screens/kort/MadScreen';
import BarScreen from './screens/kort/BarScreen';
import ScenerScreen from './screens/kort/ScenerScreen';
import MerchScreen from './screens/kort/MerchScreen';
import ToiletterScreen from './screens/kort/ToiletterScreen';

const Stack = createNativeStackNavigator();

//const linking = {
//prefixes: ['loginsite://'], // ← skal matche din app.json -> "scheme"
//config: {
//screens: {
//Login: 'login',
//Signup: 'signup',
//ForgotPassword: 'forgot-password',
//ResetPassword: 'reset-password', // ← loginsite://reset-password
//},
//},
//};

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Program" component={ProgramScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Mad" component={MadScreen} />
        <Stack.Screen name="Bar" component={BarScreen} />
        <Stack.Screen name="Scener" component={ScenerScreen} />
        <Stack.Screen name="Merch" component={MerchScreen} />
        <Stack.Screen name="Toiletter" component={ToiletterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

//linking={linking} skal stå i NavigationContaineren hvis der skal bruges deep linking