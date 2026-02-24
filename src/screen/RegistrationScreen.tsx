import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { rw, rh } from '../utils/responsive';
import { rf } from '../utils/fonts';
import CustomTextInput from '../components/CustomTextInput';
import Button from '../components/Button';
import { registerUser } from '../redux/slice/authSlice';
import moment from 'moment';
import colors from '../utils/color';

const RegistrationScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    fullName?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!fullName.trim()) {
      newErrors.fullName = 'FullName To is required';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onLogin = () => {
    if (!validate()) return;

    dispatch(
      registerUser({
        fullName,
        email,
        password,
        id: moment().toISOString(),
      }),
    );
    navigation.navigate('LoginScreen');
  };

  const onChangeFullName = (text: string) => {
    setFullName(text);
    if (errors.fullName) {
      setErrors(prev => ({ ...prev, fullName: '' }));
    }
  };

  const onChangeEmail = (text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const onChangeConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Get Started!</Text>
          <Text style={styles.subTitle}>
            Create an account to manage your tasks efficiently.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.subFormContainer}>
            <CustomTextInput
              label="FullName"
              value={fullName}
              onChangeText={onChangeFullName}
              error={errors.fullName}
            />

            <CustomTextInput
              label="Email"
              value={email}
              onChangeText={onChangeEmail}
              error={errors.email}
            />

            <CustomTextInput
              label="Password"
              value={password}
              onChangeText={onChangePassword}
              error={errors.password}
            />

            <CustomTextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              error={errors.confirmPassword}
            />

            <Button
              title="Registration"
              style={styles.button}
              onPress={onLogin}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  textContainer: {
    paddingTop: rh(10),
    paddingBottom: rh(10),
    justifyContent: 'center',
    paddingHorizontal: rw(5),
  },
  title: {
    fontSize: rf(25),
    fontWeight: 'bold',
    marginBottom: rh(1),
    textAlign: 'left',
    color: colors.white,
  },
  subTitle: {
    fontSize: rf(15),
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.white,
  },
  formContainer: {
    backgroundColor: colors.white,
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: rh(5),
    paddingHorizontal: rw(5),
    minHeight: '100%',
    marginTop: rh(3),
  },
  subFormContainer: {
    paddingHorizontal: rw(5),
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: rh(3),
  },
  button: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: rh(2.5),
    paddingVertical: rh(2),
    borderRadius: 50,
  },
});

export default RegistrationScreen;
