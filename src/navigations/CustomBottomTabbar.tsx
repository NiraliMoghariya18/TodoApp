// CustomBottomTabbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { rw, rh } from '../utils/responsive';
import { images } from '../utils/image';
import colors from '../utils/color';

const CustomBottomTabbar = ({ state, navigation }: any) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;

        let iconSource;

        if (route.name === 'Items') {
          iconSource = images.items;
        } else if (route.name === 'AddItems') {
          iconSource = images.addItems;
        } else if (route.name === 'ApiCall') {
          iconSource = images.api;
        }
        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabButton}
            onPress={onPress}
          >
            <View style={styles.innerContainer}>
              <Image
                source={iconSource}
                style={[
                  styles.image,
                  {
                    tintColor: isFocused ? colors.primaryDark : colors.darkGray,
                  },
                ]}
                resizeMode="contain"
              />

              <Text
                style={[
                  {
                    color: isFocused ? colors.primaryDark : colors.gray,
                    fontWeight: isFocused ? '600' : '500',
                  },
                  styles.text,
                ]}
              >
                {route.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTabbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: rh(10),
    backgroundColor: colors.white,
    elevation: 8,
  },

  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: rw(6),
    height: rh(3),
  },
  text: { fontSize: 12 },
});
