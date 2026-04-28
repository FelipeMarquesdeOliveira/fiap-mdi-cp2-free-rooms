import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const StatusBadge = ({ status }) => {
  const { colors } = useTheme();

  const getStatusConfig = () => {
    switch (status) {
      case 'livre':
        return { label: 'Livre', color: colors.status.livre };
      case 'ocupada':
        return { label: 'Ocupada', color: colors.status.ocupada };
      case 'manutencao':
        return { label: 'Em manutenção', color: colors.status.manutencao };
      default:
        return { label: status, color: colors.textSecondary };
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
