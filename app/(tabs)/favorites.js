import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { ROOMS } from '../../data/rooms';
import SalaCard from '../../components/SalaCard';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useApp();
  const { colors, theme } = useTheme();
  
  const favoritedRooms = ROOMS.filter(sala => favorites.includes(sala.id));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {favoritedRooms.length > 0 ? (
        <FlatList
          data={favoritedRooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SalaCard 
              sala={item} 
              onPress={() => router.push({ pathname: '/details/[id]', params: { id: item.id } })}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={[styles.iconCircle, { backgroundColor: colors.surface }]}>
            <Ionicons name="heart-outline" size={60} color={colors.primary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Nenhuma sala favoritada</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            As salas que você favoritar aparecerão aqui para acesso rápido.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  }
});

