import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useApp } from '../../context/AppContext';
import SalaCard from '../../components/SalaCard';

export default function HistoryScreen() {
  const router = useRouter();
  const { history } = useApp();

  return (
    <View style={styles.container}>
      {history.length > 0 ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.helperText}>Últimas salas visualizadas por você:</Text>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id + Math.random()} // Random apenas para garantir unicidade visual no histórico
            renderItem={({ item }) => (
              <SalaCard 
                sala={item} 
                onPress={() => router.push({ pathname: '/details/[id]', params: { id: item.id } })}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="time-outline" size={60} color={Colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Histórico vazio</Text>
          <Text style={styles.emptySubtitle}>
            As salas que você visualizar aparecerão aqui automaticamente.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  helperText: {
    padding: 20,
    paddingBottom: 0,
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  listContent: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  }
});
