import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, SafeAreaView, Platform, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ROOMS } from '../../data/rooms';
import SalaCard from '../../components/SalaCard';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function RoomsScreen() {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const { theme, toggleTheme, colors } = useTheme();
  
  const [filtroAndar, setFiltroAndar] = useState('Todos');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);

  const andares = ['Todos', 1, 2, 3, 4, 5, 6, 7];
  const statusOpcoes = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Livres', value: 'livre' },
    { label: 'Ocupadas', value: 'ocupada' },
    { label: 'Manutenção', value: 'manutencao' },
  ];

  const salasFiltradas = ROOMS.filter(sala => {
    const andarMatch = filtroAndar === 'Todos' || sala.andar === filtroAndar;
    const statusMatch = filtroStatus === 'Todos' || sala.status === filtroStatus;
    return andarMatch && statusMatch;
  });

  const getStatusLabel = (statusValue) => {
    const opcao = statusOpcoes.find(o => o.value === statusValue);
    return opcao ? opcao.label : 'Todos';
  };

  const selecionarStatus = (value) => {
    setFiltroStatus(value);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header Customizado */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <View style={styles.headerTop}>
            <Image
              source={require('../../assets/images/fiapp_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.headerTextContainer}>
              <Text style={[styles.title, { color: colors.primary }]}>FIAP FreeRooms</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Olá, {user?.name?.split(' ')[0]}</Text>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={toggleTheme} style={styles.actionButton}>
                <Ionicons 
                  name={theme === 'light' ? 'moon-outline' : 'sunny-outline'} 
                  size={24} 
                  color={colors.primary} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={signOut} style={styles.actionButton}>
                <Ionicons name="log-out-outline" size={24} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bloco de Filtros */}
        <View style={[styles.filtersContainer, { backgroundColor: colors.surface }]}>
          {/* Filtro de Andar */}
          <Text style={[styles.filterTitle, { color: colors.text }]}>ESCOLHA O ANDAR:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollFilters}>
            <View style={styles.filterGroup}>
              {andares.map(andar => (
                <TouchableOpacity
                  key={andar}
                  onPress={() => setFiltroAndar(andar)}
                  style={[
                    styles.filterChip, 
                    { backgroundColor: colors.background, borderColor: colors.border },
                    filtroAndar === andar && { backgroundColor: colors.primary, borderColor: colors.primary }
                  ]}
                >
                  <Text style={[
                    styles.filterChipText, 
                    { color: colors.text },
                    filtroAndar === andar && { color: '#fff', fontWeight: 'bold' }
                  ]}>
                    {andar === 'Todos' ? 'Todos' : `${andar}º`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Filtro de Disponibilidade Lado a Lado Esticado */}
          <View style={[styles.statusRow, { backgroundColor: colors.surface }]}>
            <Text style={[styles.filterTitleInline, { color: colors.text }]}>DISPONIBILIDADE:</Text>
            <TouchableOpacity 
              style={[styles.dropdownFull, { backgroundColor: theme === 'light' ? '#fde8e8' : '#331111', borderColor: colors.border }]} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={[styles.dropdownTextFull, { color: colors.primary }]}>{getStatusLabel(filtroStatus)}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal de Seleção */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable 
            style={styles.modalOverlay} 
            onPress={() => setModalVisible(false)}
          >
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <Text style={[styles.modalTitle, { color: colors.primary }]}>Filtrar Status</Text>
              {statusOpcoes.map((opcao) => (
                <TouchableOpacity
                  key={opcao.value}
                  style={[
                    styles.modalOption,
                    { borderBottomColor: colors.border },
                    filtroStatus === opcao.value && { backgroundColor: theme === 'light' ? '#fff5f5' : '#221111' }
                  ]}
                  onPress={() => selecionarStatus(opcao.value)}
                >
                  <Text style={[
                    styles.modalOptionText,
                    { color: colors.text },
                    filtroStatus === opcao.value && { color: colors.primary, fontWeight: 'bold' }
                  ]}>
                    {opcao.label}
                  </Text>
                  {filtroStatus === opcao.value && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity 
                style={styles.modalCloseBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalCloseBtnText, { color: colors.textSecondary }]}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Lista de Salas */}
        <FlatList
          data={salasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SalaCard
              sala={item}
              onPress={() => router.push({ pathname: '/details/[id]', params: { id: item.id } })}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color={colors.textSecondary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Nenhuma sala encontrada.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    gap: 15,
  },
  logo: {
    width: 60,
    height: 40,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
  filtersContainer: {
    padding: 15,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  filterTitleInline: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginRight: 10,
  },
  scrollFilters: {
    marginBottom: 5,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  dropdownFull: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  dropdownTextFull: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  modalContent: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 15,
  },
  modalCloseBtn: {
    marginTop: 15,
    padding: 12,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    textAlign: 'center',
  }
});
