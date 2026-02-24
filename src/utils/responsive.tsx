import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const rw = (value: number) => wp(`${value}%`);
export const rh = (value: number) => hp(`${value}%`);
