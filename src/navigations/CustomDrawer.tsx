import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { rh, rw } from '../utils/responsive';
import { rf } from '../utils/fonts';
import { images } from '../utils/image';
import colors from '../utils/color';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slice/authSlice';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const drawerState = props.state;
  const tabState = drawerState.routes[drawerState.index]?.state;
  const activeTab = tabState?.routeNames?.[tabState?.index ?? 0];
  console.log(activeTab, '===========');
  const dispatch = useDispatch();
  const onPressLogout = () => {
    dispatch(logoutUser());
  };

  const onPressItems = () => {
    props.navigation.navigate('TabNavigation', {
      screen: 'Items',
    });
  };
  const onPressAddItems = () => {
    props.navigation.navigate('TabNavigation', {
      screen: 'AddItems',
    });
  };
  const onPressApiCall = () => {
    props.navigation.navigate('TabNavigation', {
      screen: 'ApiCall',
    });
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={images.todo} style={styles.todoList} />
        <Text style={styles.appName}>ToDoApp</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.item, activeTab === 'Items' && styles.activeItem]}
          onPress={() => onPressItems()}
        >
          <Image source={images.items} style={styles.itemIcon} />
          <Text style={styles.itemText}>Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.item, activeTab === 'AddItems' && styles.activeItem]}
          onPress={() => onPressAddItems()}
        >
          <Image source={images.addItems} style={styles.itemIcon} />
          <Text style={styles.itemText}>AddItems</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.item, activeTab === 'ApiCall' && styles.activeItem]}
          onPress={() => onPressApiCall()}
        >
          <Image source={images.api} style={styles.itemIcon} />
          <Text style={styles.itemText}>ApiCall</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.item,
          activeTab === 'Logout' && styles.activeItem,
          { marginTop: rh(50) },
        ]}
        onPress={() => onPressLogout()}
      >
        <Image source={images.logout} style={styles.itemIcon} />
        <Text style={[styles.itemText, { fontSize: rf(15) }]}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: rh(3),
    paddingHorizontal: rw(5),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoList: {
    width: rw(12),
    height: rw(12),
    marginRight: rw(4),
    resizeMode: 'contain',
  },
  appName: {
    color: colors.white,
    fontSize: rf(22),
    fontWeight: '700',
  },
  menu: {
    flex: 1,
    paddingTop: rh(2),
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rh(1.8),
    paddingHorizontal: rw(5),
    borderRadius: rw(2),
    marginHorizontal: rw(3),
    marginBottom: rh(0.8),
  },
  activeItem: {
    backgroundColor: colors.drawerHighlight,
  },
  itemIcon: {
    width: rw(8),
    height: rw(8),
    marginRight: rw(4),
    resizeMode: 'contain',
  },
  itemText: {
    fontSize: rf(15),
    color: colors.black,
    fontWeight: '500',
  },
});
