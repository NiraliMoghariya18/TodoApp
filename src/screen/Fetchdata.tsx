import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, FetchDataSuccessPayload } from '../redux/actions/apiAction';
import { RootState, AppDispatch } from '../redux/store';

export const FetchData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.dataReducer,
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const renderItem = ({ item }: { item: FetchDataSuccessPayload }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>title:{item.name}</Text>
      <Text style={styles.body}>body:{item.body}</Text>
    </View>
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      scrollEnabled={false} // if you want it to scroll inside parent ScrollView
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  body: { fontSize: 16 },
});
