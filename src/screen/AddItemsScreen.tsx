import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../redux/slice/todoSlice';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Switch, TextInput, TouchableRipple } from 'react-native-paper';
import { rh, rw } from '../utils/responsive';
import { rf } from '../utils/fonts';
import { Dropdown } from 'react-native-element-dropdown';
import CustomTextInput from '../components/CustomTextInput';
import { images } from '../utils/image';
import { RootState } from '../redux/store';
import Button from '../components/Button';
import colors from '../utils/color';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  assignedTo: string;
  isCompleted: boolean;
  createdAt: string;
  editedAt: string | null;
  userId?: string;
}
interface formError {
  title?: string;
  category?: string;
  description?: string;
  assignedTo?: string;
}

const AddItemsScreen = ({ route, navigation }: any) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [errors, setErrors] = useState<formError>({});
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  type DropdownItem = {
    label: string;
    value: string;
  };

  const categories = [
    { label: 'Work', value: 'Work' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Study', value: 'Study' },
  ];

  const validate = () => {
    const newErrors: formError = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned To is required';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isEdit = route?.params?.isEdit;
  const editItem = route?.params?.item;

  console.log('editItem :>> ', editItem);
  useEffect(() => {
    if (isEdit && editItem) {
      setTitle(editItem.title);
      setDescription(editItem.description);
      setCategory(editItem.category);
      setAssignedTo(editItem.assignedTo);
      setIsCompleted(editItem.isCompleted);
      // if (editItem.createdAt) {
      setDate(new Date(editItem.createdAt));
      // }
    }
  }, [isEdit, editItem]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTitle('');
        setDescription('');
        setCategory('');
        setAssignedTo('');
        setIsCompleted(false);
        setErrors({});
        setDate(new Date());
      };
    }, []),
  );

  const onSave = () => {
    if (!validate() || !currentUser?.id) return;

    const now = moment().toISOString();

    const newItem: TodoItem = {
      id: isEdit ? editItem.id : Date.now().toString(),
      title,
      description,
      category,
      assignedTo,
      isCompleted,
      createdAt: isEdit ? editItem.createdAt : moment(date).toISOString(),
      editedAt: isEdit ? now : null,
      userId: currentUser.id,
    };

    if (isEdit) {
      dispatch(updateTodo(newItem));
    } else {
      dispatch(addTodo(newItem));
    }

    navigation.navigate('Items');
  };

  const onChangeTitle = (text: string) => {
    setTitle(text);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };
  const onChangeDescription = (text: string) => {
    setDescription(text);
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: '' }));
    }
  };

  const onChangeDropDown = (item: DropdownItem) => {
    setCategory(item.value);
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
    setIsFocus(false);
  };
  const onChangeAssignedTo = (text: string) => {
    setAssignedTo(text);
    if (errors.assignedTo) {
      setErrors(prev => ({ ...prev, assignedTo: '' }));
    }
  };
  const handleConfirmDate = (selectedDate: Date) => {
    setOpen(false);
    setDate(selectedDate);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView>
        <View style={styles.ScrollView}>
          <View style={styles.fieldWrapper}>
            <CustomTextInput
              label="Title"
              mode="outlined"
              multiline
              contentStyle={styles.contantStyle}
              style={styles.input}
              value={title}
              onChangeText={onChangeTitle}
              error={errors.title}
              dense={false}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <CustomTextInput
              label="Description"
              mode="outlined"
              multiline
              dense={false}
              value={description}
              contentStyle={styles.contantStyle}
              onChangeText={onChangeDescription}
              error={errors.description}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Dropdown
              style={[
                styles.input,
                {
                  borderWidth: isFocus ? 2 : 1,
                  borderColor: errors.category
                    ? colors.gray
                    : isFocus
                    ? colors.primaryDark
                    : colors.gray,
                },
                styles.dropdown,
              ]}
              placeholderStyle={styles.dropdownplaceholder}
              selectedTextStyle={styles.dropdownselectedtext}
              data={categories}
              labelField="label"
              valueField="value"
              placeholder="Select Category"
              value={category}
              onChange={onChangeDropDown}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
            <Text style={styles.errorText}>
              {errors.category ? errors.category : ' '}
            </Text>
          </View>
          <View style={styles.fieldWrapper}>
            <CustomTextInput
              label="Assigned To"
              mode="outlined"
              multiline
              contentStyle={styles.contantStyle}
              value={assignedTo}
              onChangeText={onChangeAssignedTo}
              error={errors.assignedTo}
              dense={false}
            />
          </View>
          <TouchableRipple
            onPress={() => setOpen(true)}
            rippleColor="transparent"
          >
            <View pointerEvents="none">
              <CustomTextInput
                label="Created Date"
                mode="outlined"
                multiline
                value={moment(date).format('DD-MM-YYYY')}
                editable={false}
                contentStyle={styles.fs}
                right={
                  <TextInput.Icon
                    icon={() => (
                      <Image source={images.calander} style={styles.image} />
                    )}
                    onPress={() => setOpen(true)}
                  />
                }
                dense={false}
              />
            </View>
          </TouchableRipple>
          <View style={styles.fieldWrapper}>
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={handleConfirmDate}
              minimumDate={
                isEdit && editItem?.createdAt
                  ? new Date(editItem.createdAt)
                  : undefined
              }
              maximumDate={new Date()}
              onCancel={() => setOpen(false)}
              mode="date"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Is Completed</Text>
            <Switch value={isCompleted} onValueChange={setIsCompleted} />
          </View>
        </View>
      </ScrollView>
      <View>
        <Button
          title={isEdit ? 'Update' : 'Save'}
          onPress={onSave}
          style={styles.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rw(3),
    justifyContent: 'space-between',
  },
  fieldWrapper: {
    marginBottom: rh(0),
  },
  ScrollView: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: rw(1),
  },
  contantStyle: {
    fontSize: rf(13),
    textAlignVertical: 'center',
  },
  input: {
    backgroundColor: colors.white,
  },
  button: {
    marginHorizontal: rw(4),
    marginBottom: rh(3),
    paddingVertical: rh(2),
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rh(3),
  },
  switchLabel: {
    fontSize: rf(14),
  },
  dropdown: {
    borderRadius: 6,
    paddingHorizontal: rw(3),
    paddingVertical: rh(2),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  dropdownplaceholder: {
    fontSize: rf(12),
    color: colors.darkGray,
  },
  dropdownselectedtext: {
    fontSize: rf(13),
    color: colors.black,
  },

  errorText: {
    color: colors.error,
    fontSize: rf(12),
    marginTop: rh(0.5),
    marginBottom: rh(1),
  },
  image: { width: rw(7), height: rh(3) },
  fs: { fontSize: rf(13) },
});

export default AddItemsScreen;
