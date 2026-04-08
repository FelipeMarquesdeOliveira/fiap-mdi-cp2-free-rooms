import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, SafeAreaView, Platform, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { ROOMS } from '../../data/rooms';
import SalaCard from '../../components/SalaCard';

export default function RoomsScreen() {
  const router = useRouter();
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Customizado */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image
              source={require('../../assets/images/fiapp_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>FIAP FreeRooms</Text>
              <Text style={styles.subtitle}>Campus Paulista - Salas</Text>
            </View>
          </View>
        </View>

        {/* Bloco de Filtros */}
        <View style={styles.filtersContainer}>
          {/* Filtro de Andar */}
          <Text style={styles.filterTitle}>ESCOLHA O ANDAR:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollFilters}>
            <View style={styles.filterGroup}>
              {andares.map(andar => (
                <TouchableOpacity
                  key={andar}
                  onPress={() => setFiltroAndar(andar)}
                  style={[styles.filterChip, filtroAndar === andar && styles.filterChipActive]}
                >
                  <Text style={[styles.filterChipText, filtroAndar === andar && styles.filterChipTextActive]}>
                    {andar === 'Todos' ? 'Todos' : `${andar}º`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Filtro de Disponibilidade Lado a Lado Esticado */}
          <View style={styles.statusRow}>
            <Text style={styles.filterTitleInline}>DISPONIBILIDADE:</Text>
            <TouchableOpacity 
              style={styles.dropdownFull} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.dropdownTextFull}>{getStatusLabel(filtroStatus)}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.primary} />
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
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filtrar Status</Text>
              {statusOpcoes.map((opcao) => (
                <TouchableOpacity
                  key={opcao.value}
                  style={[
                    styles.modalOption,
                    filtroStatus === opcao.value && styles.modalOptionActive
                  ]}
                  onPress={() => selecionarStatus(opcao.value)}
                >
                  <Text style={[
                    styles.modalOptionText,
                    filtroStatus === opcao.value && styles.modalOptionTextActive
                  ]}>
                    {opcao.label}
                  </Text>
                  {filtroStatus === opcao.value && (
                    <Ionicons name="checkmark" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity 
                style={styles.modalCloseBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseBtnText}>CANCELAR</Text>
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
              <Ionicons name="search-outline" size={48} color={Colors.gray} />
              <Text style={styles.emptyText}>Nenhuma sala encontrada.</Text>
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
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    width: 90,
    height: 60,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  filtersContainer: {
    padding: 15,
    backgroundColor: '#fff',
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
    color: Colors.text,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  filterTitleInline: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.text,
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
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#eee',
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    color: Colors.text,
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#fff',
  },
  dropdownFull: {
    flex: 1, // Faz o botão esticar e ocupar todo o resto da linha
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fde8e8',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fad2d2',
  },
  dropdownTextFull: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
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
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.primary,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionActive: {
    backgroundColor: '#fff5f5',
  },
  modalOptionText: {
    fontSize: 15,
    color: Colors.text,
  },
  modalOptionTextActive: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  modalCloseBtn: {
    marginTop: 15,
    padding: 12,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: Colors.gray,
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
    color: Colors.textSecondary,
    textAlign: 'center',
  }
});
