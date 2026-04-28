import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import StatusBadge from './StatusBadge';

const SalaCard = ({ sala, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface }]} onPress={onPress}>
      <View style={styles.header}>
        <Text style={[styles.nome, { color: colors.text }]}>{sala.nome}</Text>
        <StatusBadge status={sala.status} />
      </View>
      
      <View style={styles.details}>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>Bloco {sala.bloco} - {sala.andar}º Andar</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="people-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>Capacidade: {sala.capacidade}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
  footer: {
    alignItems: 'flex-end',
    marginTop: 8,
  }
});

export default SalaCard;

