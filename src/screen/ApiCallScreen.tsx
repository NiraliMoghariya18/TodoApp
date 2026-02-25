import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  ScrollView,
} from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import colors from '../utils/color';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { commentsfetchdata, fetchdata } from '../redux/slice/apiSlice';
import { FetchData } from './Fetchdata';

const ApiCallScreen = () => {
  //   const [data, setData] = useState([]);
  const { data, postComments, loading, error } = useSelector(
    (state: RootState) => state.api,
  );
  const dispatch = useDispatch<AppDispatch>();

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://jsonplaceholder.typicode.com/comments',
  //       );
  //       const json = await response.json();
  //       setData(json);
  //       console.log(json);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  useEffect(() => {
    dispatch(fetchdata());
  }, []);
  useEffect(() => {
    dispatch(commentsfetchdata());
  }, []);

  function renderItem({
    item,
  }: {
    item: { id: number; name: string; email: string; body: string };
  }) {
    return (
      <View
        key={item.id}
        style={{
          margin: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 10,
          shadowColor: colors.softPurple,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.18,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Card.Content>
          <Text style={{ fontWeight: 'bold', paddingBottom: 10, fontSize: 24 }}>
            {item.name}
          </Text>
          <Text style={{ paddingBottom: 10, fontSize: 18 }}>
            Email: {item.email}
          </Text>
          <Text style={{ paddingBottom: 10, fontSize: 15 }}>
            Body: {item.body}
          </Text>
        </Card.Content>
      </View>
    );
  }
  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <View style={styles.container}>
      {/* <ScrollView>
        {data.map((movie: { id: number; name: string; email: string }) => (
          <View key={movie.id}>
            <Text style={{ fontWeight: 'bold' }}>{movie.name}</Text>
            <Text>{movie.email}</Text>
          </View>
        ))}
      </ScrollView> */}
      <ScrollView>
        <FlatList
          data={postComments}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            backgroundColor: colors.softPurple,
          }}
        >
          Comments
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
        <Text>CreateAction and CreateReducer use for Api Call</Text>
        <FetchData />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});

export default ApiCallScreen;
