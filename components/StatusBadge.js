import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'livre':
        return { label: 'Livre', color: Colors.status.livre };
      case 'ocupada':
        return { label: 'Ocupada', color: Colors.status.ocupada };
      case 'manutencao':
        return { label: 'Em manutenção', color: Colors.status.manutencao };
      default:
        return { label: status, color: Colors.gray };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.color }]}>
      <Text style={styles.text}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default StatusBadge;
