import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import { CustomDrawerContent } from './CustomDrawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { rw } from '../utils/responsive';
import CustomHeader from './CustomHeader';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        // headerTintColor: 'white',
        // headerStyle: {
        //   backgroundColor: '#26236e',
        // },
        drawerStyle: {
          width: rw(80),
        },
        header: props => <CustomHeader {...props} />,
      }}
    >
      <Drawer.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Items';
          return {
            title: routeName,
          };
        }}
      />
    </Drawer.Navigator>
  );
}
