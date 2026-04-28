import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import SalaCard from '../../components/SalaCard';

export default function ReservationsScreen() {
  const router = useRouter();
  const { reservations, pastReservations, cancelReservation } = useApp();
  const { colors, theme } = useTheme();
  const [activeTab, setActiveTab] = useState('ativas'); 

  const dataToShow = activeTab === 'ativas' ? reservations : pastReservations;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Seletor de Abas */}
      <View style={[styles.tabSelector, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'ativas' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('ativas')}
        >
          <Text style={[styles.tabBtnText, { color: colors.textSecondary }, activeTab === 'ativas' && { color: '#fff' }]}>Ativas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'historico' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('historico')}
        >
          <Text style={[styles.tabBtnText, { color: colors.textSecondary }, activeTab === 'historico' && { color: '#fff' }]}>Histórico</Text>
        </TouchableOpacity>
      </View>

      {/* Texto auxiliar */}
      <Text style={[styles.helperText, { color: colors.textSecondary }]}>
        {activeTab === 'ativas' ? 'Suas reservas atuais:' : 'Salas que você já utilizou:'}
      </Text>

      {/* Lista condicional */}
      {dataToShow.length > 0 ? (
        <FlatList
          data={dataToShow}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <SalaCard 
                sala={item} 
                onPress={() => router.push({ 
                  pathname: '/details/[id]', 
                  params: { id: item.id, fromHistory: activeTab === 'historico' ? 'true' : 'false' } 
                })}
              />
              <View style={[
                styles.reservationDetails, 
                { backgroundColor: colors.surface, borderTopColor: colors.border },
                activeTab === 'historico' && { backgroundColor: theme === 'light' ? '#f9f9f9' : '#1c1c1e' }
              ]}>
                <View style={styles.dateTimeContainer}>
                  <Ionicons 
                    name={activeTab === 'ativas' ? "calendar-outline" : "checkmark-circle-outline"} 
                    size={16} 
                    color={activeTab === 'ativas' ? colors.primary : colors.success} 
                  />
                  <Text style={[styles.dateTimeText, { color: colors.text }]}>
                    {activeTab === 'ativas' ? `${item.dataReserva}` : `Utilizada em: ${item.dataReserva}`}
                  </Text>
                </View>
                
                {activeTab === 'ativas' && (
                  <TouchableOpacity 
                    style={[styles.cancelBtn, { borderColor: colors.border }]} 
                    onPress={() => cancelReservation(item.id)}
                  >
                    <Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>Cancelar</Text>
                  </TouchableOpacity>
                )}
                
                {activeTab === 'historico' && (
                  <View style={[styles.completedBadge, { backgroundColor: theme === 'light' ? '#e8f5e9' : '#1b2e1b' }]}>
                    <Text style={[styles.completedText, { color: colors.success }]}>CONCLUÍDO</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={[styles.iconCircle, { backgroundColor: colors.surface }]}>
            <Ionicons 
              name={activeTab === 'ativas' ? "calendar-outline" : "time-outline"} 
              size={60} 
              color={colors.textSecondary} 
            />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            {activeTab === 'ativas' ? 'Sem reservas ativas' : 'Sem histórico ainda'}
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {activeTab === 'ativas' 
              ? 'As salas que você reservar hoje aparecerão nesta aba.' 
              : 'Nenhum registro de uso passado encontrado.'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabSelector: {
    flexDirection: 'row',
    padding: 8,
    margin: 15,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  helperText: { paddingHorizontal: 20, paddingBottom: 5, fontSize: 13, fontWeight: '500' },
  listContent: { padding: 20, paddingTop: 10 },
  itemWrapper: { marginBottom: 10 },
  reservationDetails: {
    marginTop: -15,
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    marginBottom: 20,
    elevation: 2,
  },
  dateTimeContainer: { flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 },
  dateTimeText: { fontSize: 13, fontWeight: '500' },
  cancelBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1 },
  cancelBtnText: { fontSize: 12 },
  completedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  completedText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, marginTop: 40 },
  iconCircle: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 3 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  emptySubtitle: { fontSize: 14, textAlign: 'center' }
});

