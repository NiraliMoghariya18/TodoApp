import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import moment from 'moment';
import { rh, rw } from '../utils/responsive';
import { rf } from '../utils/fonts';
import colors from '../utils/color';

const ItemsDetails = ({ route }: any) => {
  const { item } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
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
                color: item.isCompleted ? colors.softPurple : colors.darkOrange,
              },
            ]}
          >
            {item.isCompleted ? 'Completed' : 'Pending'}
          </Text>
        </View>

        <Card.Title
          title={item.title}
          titleStyle={styles.cardTitleStyle}
          titleNumberOfLines={0}
        />

        <Card.Content style={styles.content}>
          <Text style={styles.description}>
            Description: {item.description}
          </Text>

          <Text style={styles.label}>Category: {item.category}</Text>

          <Text style={styles.label}>Assigned: {item.assignedTo}</Text>

          <Text style={styles.dateText}>
            Created: {moment(item.createdAt).format('DD-MM-YYYY hh:mm A')}
          </Text>

          {item.editedAt && (
            <Text style={styles.dateText}>
              Edited: {moment(item.editedAt).format('DD-MM-YYYY hh:mm A')}
            </Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default ItemsDetails;

const styles = StyleSheet.create({
  container: {
    padding: rw(4),
    paddingBottom: rh(10),
  },

  cardTitleStyle: {
    fontSize: rf(18),
    fontWeight: 'bold',
    marginTop: rh(5),
  },

  card: {
    borderRadius: 16,
    marginBottom: rh(1.5),

    backgroundColor: colors.white,

    shadowColor: colors.softPurple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,

    elevation: 6,
  },

  content: {
    gap: rh(0.5),
  },

  description: {
    fontSize: rf(14),
    color: colors.darkGray,
    marginBottom: rh(0.8),
  },

  label: {
    fontSize: rf(11),
    color: colors.gray,
  },

  dateText: {
    fontSize: rf(10),
    color: colors.gray,
  },

  statusTextModern: {
    fontSize: rf(11),
    fontWeight: '600',
  },
  statusBadge: {
    position: 'absolute',
    right: rw(4),
    paddingHorizontal: rw(3),
    paddingVertical: rh(0.5),
    borderRadius: 20,
    marginTop: rh(1.5),
  },
});
