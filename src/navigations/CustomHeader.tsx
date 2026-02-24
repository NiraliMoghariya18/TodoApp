import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { rh, rw } from '../utils/responsive';
import { images } from '../utils/image';
import { rf } from '../utils/fonts';
import colors from '../utils/color';

const CustomHeader = ({ route, options, navigation }: any) => {
  const title = getHeaderTitle(options, route.name);

  const onPressAddItems = () => {
    navigation.navigate('TabNavigation', {
      screen: 'AddItems',
    });
  };
  return (
    <View style={[styles.headerContainer, options.headerStyle]}>
      <View style={styles.left}>
        <DrawerToggleButton tintColor={colors.white} />
      </View>

      <Text style={[styles.headerTitle, options.headerTitleStyle]}>
        {title}
      </Text>
      <Pressable style={styles.pressable} onPress={() => onPressAddItems()}>
        <Image source={images.add} style={styles.icon} resizeMode="contain" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: rh(10),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingBottom: rh(1),
  },
  left: {
    position: 'absolute',
    left: rh(2),
  },
  headerTitle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: rf(13),
  },
  pressable: {
    position: 'absolute',
    right: rh(2),
    bottom: rh(0.5),
  },
  icon: {
    width: rw(6.5),
    height: rh(3),
    tintColor: colors.white,
    color: colors.white,
  },
});

export default CustomHeader;
