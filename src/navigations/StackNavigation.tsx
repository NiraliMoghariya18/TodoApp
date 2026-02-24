import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemsDetails from '../screen/ItemsDetails';
import DrawerNavigation from './DrawerNavigation';
import LoginScreen from '../screen/LoginScreen';
import RegistrationScreen from '../screen/RegistrationScreen';
import MainScreen from '../screen/MainScreen';
import colors from '../utils/color';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Stack = createStackNavigator();

export default function StackNavigation() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerBackTitle: '',
    //   headerTintColor: '#ffffff',
    //   headerStyle: {
    //     backgroundColor: '#282468ea',
    //     paddingVertical: rh(3),
    //     paddingHorizontal: rw(5),
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //   },
    // }}
    >
      {!isLoggedIn ? (
        <>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="DrawerNavigation"
            component={DrawerNavigation}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ItemsDetails"
            component={ItemsDetails}
            options={{
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
