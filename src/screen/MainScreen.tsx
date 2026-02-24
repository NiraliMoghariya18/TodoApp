import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { images } from '../utils/image';
import { rh, rw } from '../utils/responsive';
import { rf } from '../utils/fonts';
import Button from '../components/Button';
import colors from '../utils/color';

const MainScreen = ({ navigation }: any) => {
  const onregister = () => {
    navigation.navigate('RegistrationScreen');
  };
  const onlogin = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.todolist}>
        <Image source={images.todo} style={styles.todoimage} />
      </View>
      <View style={{ marginTop: rh(5) }}>
        <Text style={styles.header}>WelCome</Text>
        <Text style={styles.text}>Create Your ToDo List</Text>
      </View>
      <View style={{ marginTop: rh(5) }}>
        <Button
          title="registration"
          style={styles.button}
          onPress={() => onregister()}
        />
      </View>
      <View>
        <Text style={styles.text2}>
          Already have an account?{' '}
          <Text style={styles.login} onPress={() => onlogin()}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.white,
    fontSize: rf(15),
  },
  text2: { color: colors.white, fontSize: rf(14) },
  login: {
    color: colors.drawerHighlight,
    fontSize: rf(14),
    fontWeight: 'bold',
  },
  todolist: {
    width: rw(40),
    height: rw(40),
    borderRadius: rw(40) / 2,
    backgroundColor: colors.goldenBeige,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  todoimage: {
    position: 'absolute',
    width: rw(30),
    height: rh(17),
    left: rw(4),
    resizeMode: 'contain',
  },
  header: {
    fontSize: rf(30),
    color: colors.white,
    fontWeight: '700',
    marginBottom: rh(1),
  },
  button: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: rh(2.5),
    paddingVertical: rh(2),
    borderRadius: 50,
  },
});

export default MainScreen;
