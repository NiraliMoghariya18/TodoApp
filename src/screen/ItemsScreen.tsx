import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';
import moment from 'moment';
import { rh, rw } from '../utils/responsive';
import { rf } from '../utils/fonts';
import { TodoItem } from './AddItemsScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { removeTodo, setTodos } from '../redux/slice/todoSlice';
import { images } from '../utils/image';
import colors from '../utils/color';
import { StaticScreenProps } from '@react-navigation/native';

type FilterType = 'ALL' | 'COMPLETED' | 'PENDING';

type Props = StaticScreenProps<{}>;
const ItemsScreen = ({ navigation }: any) => {
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [searchText, setSearchText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  // const items = useSelector((state: RootState) => state.todo.items);
  const { items } = useSelector((state: RootState) => state.todo);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const userTodos = items.filter(
    (item: TodoItem) => item.userId === currentUser?.id,
  );

  //   const userTodos = useMemo(() => {
  //   return items.filter(
  //     item => item.userId === currentUser?.id
  //   );
  // }, [items, currentUser]);

  useEffect(() => {
    if (!isLoaded) return;

    const saveData = async () => {
      await dispatch(setTodos(items));
      setIsLoaded(true);
    };

    saveData();
  }, [items, isLoaded]);

  const handleEdit = (item: TodoItem) => {
    navigation.navigate('AddItems', {
      item,
      isEdit: true,
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          dispatch(removeTodo(id));
        },
      },
    ]);
  };

  const getDateLabel = (dateStr: string) => {
    const date = moment(dateStr);
    if (date.isSame(moment(), 'day')) return 'Today';
    if (date.isSame(moment().subtract(1, 'day'), 'day')) return 'Yesterday';
    return date.format('DD MMM YYYY');
  };

  const totalCount = userTodos.length;
  const completedCount = userTodos.filter(
    (i: TodoItem) => i.isCompleted,
  ).length;

  const pendingCount = userTodos.filter((i: TodoItem) => !i.isCompleted).length;

  const FILTER_CARDS = [
    {
      key: 'ALL',
      label: 'All',
      count: totalCount,
      icon: images.tool,
    },
    {
      key: 'COMPLETED',
      label: 'Completed',
      count: completedCount,
      icon: images.checked,
    },
    {
      key: 'PENDING',
      label: 'Pending',
      count: pendingCount,
      icon: images.pending,
    },
  ];

  const filteredItems = userTodos.filter((item: TodoItem) => {
    if (filter === 'COMPLETED') return item.isCompleted;
    if (filter === 'PENDING') return !item.isCompleted;
    return true;
  });

  const searchedItems = filteredItems.filter((item: TodoItem) => {
    const query = searchText.trim().toLowerCase();
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.assignedTo.toLowerCase().includes(query)
    );
  });

  const sortedItems = [...searchedItems].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );

  const onPressable = (item: TodoItem) => {
    navigation.navigate('ItemsDetails', { item });
  };
  const onPressAddItems = () => {
    navigation.navigate('AddItems');
  };

  const renderItem = ({ item, index }: { item: TodoItem; index: number }) => {
    const currentDateLabel = getDateLabel(item.createdAt);
    const prevDateLabel =
      index > 0 ? getDateLabel(sortedItems[index - 1].createdAt) : null;
    const showDateHeader = index === 0 || currentDateLabel !== prevDateLabel;

    return (
      <View key={item.id}>
        {showDateHeader && (
          <View style={styles.dateHeader}>
            <Text style={styles.dateHeaderText}>{currentDateLabel}</Text>
          </View>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.cardWrapper,
            pressed && styles.cardPressed,
          ]}
          onPress={() => onPressable(item)}
        >
          <Card style={styles.modernCard}>
            <View
              style={[
                styles.statusStrip,
                {
                  backgroundColor: item.isCompleted
                    ? colors.softPurple
                    : colors.darkOrange,
                },
              ]}
            />
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: item.isCompleted
                    ? colors.softGray
                    : colors.peachCream,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusTextModern,
                  {
                    color: item.isCompleted
                      ? colors.softPurple
                      : colors.darkOrange,
                  },
                ]}
              >
                {item.isCompleted ? 'Completed' : 'Pending'}
              </Text>
            </View>

            <Card.Content style={styles.modernContent}>
              <Text style={styles.modernTitle} numberOfLines={1}>
                {item.title}
              </Text>

              <Text style={styles.modernDescription} numberOfLines={2}>
                Description: {item.description}
              </Text>

              <Text style={styles.dateText} numberOfLines={1}>
                CreatedAt:
                {moment(item.createdAt).format('DD-MM-YYYY hh:mm A')}
              </Text>
            </Card.Content>

            <Card.Actions style={styles.actions}>
              <Pressable onPress={() => handleEdit(item)}>
                <Image
                  source={images.edit}
                  style={styles.itemIcon}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable onPress={() => handleDelete(item.id)}>
                <Image
                  source={images.bin}
                  style={styles.itemIcon}
                  resizeMode="contain"
                />
              </Pressable>
            </Card.Actions>
          </Card>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.flex}>
      <View style={styles.searchView}>
        <Searchbar
          icon="magnify"
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchbar}
        />
      </View>
      <View style={styles.filterContainer}>
        {FILTER_CARDS.map(type => (
          <Pressable
            key={type.key}
            style={[
              styles.filterCard,
              filter === type.key && styles.filterActive,
            ]}
            onPress={() => setFilter(type.key as FilterType)}
          >
            <View style={styles.filterCarditemIcon}>
              <Image
                source={type.icon}
                style={[
                  styles.filterCardimage,
                  {
                    tintColor:
                      filter === type.key ? colors.white : colors.black,
                  },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.filterText,
                  filter === type.key && styles.filterTextActive,
                ]}
              >
                {type.count}
              </Text>
            </View>
            <Text
              style={[
                styles.filterText,
                { marginBottom: rh(1) },
                filter === type.key && styles.filterTextActive,
              ]}
            >
              {type.key}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={sortedItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: rw(4) }}
      />

      <Pressable style={styles.fab} onPress={() => onPressAddItems()}>
        <Image
          source={images.add}
          style={styles.addImage}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {
    padding: rw(4),
    paddingBottom: rh(10),
  },
  flex: {
    flex: 1,
  },
  searchView: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: rw(1),
    marginBottom: rh(1),
    width: '100%',
    alignItems: 'center',
  },
  searchbar: {
    width: '95%',
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray,
  },

  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: rw(2.5),
  },

  filterCard: {
    flex: 1,
    marginHorizontal: rw(1),
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    padding: rw(2),
    gap: rh(1),
  },

  filterCarditemIcon: {
    marginTop: rh(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '65%',
  },

  filterCardimage: {
    width: rw(8),
    height: rh(4),
    tintColor: colors.white,
  },

  filterActive: {
    backgroundColor: colors.softPurple,

    shadowColor: colors.darkBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    elevation: 6,
  },

  filterText: {
    textAlign: 'center',
    fontSize: rf(13),
    fontWeight: '600',
  },

  filterTextActive: {
    color: colors.white,
  },

  dateText: {
    fontSize: rf(10),
    color: colors.gray,
  },

  actions: {
    justifyContent: 'flex-end',
    paddingRight: rw(4),
    marginTop: rh(-2),
  },

  itemIcon: {
    width: rw(5),
    height: rh(3),
  },

  dateHeader: {
    alignItems: 'center',
    marginVertical: rh(1),
  },

  dateHeaderText: {
    backgroundColor: colors.IceBlue,
    paddingHorizontal: rw(4),
    paddingVertical: rh(1),
    borderRadius: 20,
    fontSize: rf(11),
    fontWeight: '600',
    color: colors.darkGray,
  },

  fab: {
    position: 'absolute',
    bottom: rh(4),
    right: rw(6),
    width: rw(16),
    height: rw(16),
    borderRadius: rw(8),
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  addImage: {
    width: rw(7),
    height: rw(7),
    tintColor: colors.white,
  },

  cardWrapper: {
    marginBottom: rh(1.5),
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],

    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 8,
  },

  modernCard: {
    borderRadius: 20,
    backgroundColor: colors.white,
    marginBottom: rh(2),
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  statusStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  statusBadge: {
    position: 'absolute',
    // top: rh(0.5),
    right: rw(4),
    paddingHorizontal: rw(3),
    paddingVertical: rh(0.5),
    marginTop: rh(1),
    borderRadius: 20,
  },

  statusTextModern: {
    fontSize: rf(11),
    fontWeight: '600',
  },

  modernContent: {
    paddingLeft: rw(5),
    paddingRight: rw(5),
    marginTop: rh(3.5),
  },

  modernTitle: {
    fontSize: rf(18),
    fontWeight: '700',
    color: colors.black,
  },

  modernDescription: {
    fontSize: rf(13),
    color: colors.darkGray,
    marginTop: rh(0.8),
    marginBottom: rh(0.8),
  },
});
