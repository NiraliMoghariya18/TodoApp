import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItemsScreen from '../screen/ItemsScreen';
import AddItemsScreen from '../screen/AddItemsScreen';
import CustomBottomTabbar from './CustomBottomTabbar';
import ApiCallScreen from '../screen/ApiCallScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabbar {...props} />}
      screenOptions={() => ({
        headerShown: false,

        // tabBarIcon: () => {
        //   let iconSource;

        //   if (route.name === 'Items') {
        //     iconSource = require('../assets/images/shopping-bag.png');
        //   } else if (route.name === 'AddItems') {
        //     iconSource = require('../assets/images/add-to-cart.png');
        //   }

        //   return (
        //     <Image
        //       source={iconSource}
        //       style={{ width: rw(6), height: rh(6) }}
        //       resizeMode="contain"
        //     />
        //   );
        // },
        // tabBarActiveTintColor: '#534eda',
        // tabBarInactiveTintColor: 'gray',
        // tabBarLabelStyle: {
        //   fontSize: rf(12),
        //   fontWeight: '600',
        // },
      })}
    >
      <Tab.Screen name="Items" component={ItemsScreen} />
      <Tab.Screen name="AddItems" component={AddItemsScreen} />
      <Tab.Screen name="ApiCall" component={ApiCallScreen} />
    </Tab.Navigator>
  );
}
