import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { ROOMS } from '../../data/rooms';
import StatusBadge from '../../components/StatusBadge';
import BotaoCustomizado from '../../components/BotaoCustomizado';
import { useApp } from '../../context/AppContext';

export default function RoomDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { favorites, toggleFavorite, addToHistory } = useApp();
  
  const sala = ROOMS.find(r => r.id === id);
  const isFavorited = favorites.includes(id);

  // Adiciona ao histórico quando a tela carrega
  useEffect(() => {
    if (sala) {
      addToHistory(sala);
    }
  }, [id]);

  if (!sala) {
    return (
      <View style={styles.container}>
        <Text>Sala não encontrada.</Text>
      </View>
    );
  }

  const handleReportProblem = () => {
    Alert.alert(
      "Reportar Problema",
      `Você deseja reportar um problema na ${sala.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => Alert.alert("Sucesso", "Problema reportado com sucesso!") 
        }
      ]
    );
  };

  const handleToggleFavorite = () => {
    toggleFavorite(sala.id);
    Alert.alert(
      !isFavorited ? "Favoritado" : "Removido",
      !isFavorited ? "Sala adicionada aos favoritos!" : "Sala removida dos favoritos."
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.nome}>{sala.nome}</Text>
          <StatusBadge status={sala.status} />
        </View>
        <Text style={styles.location}>Bloco {sala.bloco} - {sala.andar}º Andar</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações da Sala</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Ionicons name="people" size={24} color={Colors.primary} />
            <Text style={styles.infoLabel}>Capacidade</Text>
            <Text style={styles.infoValue}>{sala.capacidade} pessoas</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="snow" size={24} color={sala.possuiArCondicionado ? Colors.primary : Colors.gray} />
            <Text style={styles.infoLabel}>Ar Condicionado</Text>
            <Text style={styles.infoValue}>{sala.possuiArCondicionado ? 'Sim' : 'Não'}</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="videocam" size={24} color={sala.possuiProjetor ? Colors.primary : Colors.gray} />
            <Text style={styles.infoLabel}>Projetor</Text>
            <Text style={styles.infoValue}>{sala.possuiProjetor ? 'Sim' : 'Não'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <BotaoCustomizado 
          title={isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"} 
          type={isFavorited ? "secondary" : "primary"}
          onPress={handleToggleFavorite}
        />
        <BotaoCustomizado 
          title="Reportar Problema" 
          type="secondary" 
          onPress={handleReportProblem}
          style={styles.btnReport}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  location: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 2,
  },
  actions: {
    padding: 24,
    gap: 8,
  },
  btnReport: {
    marginTop: 0,
  }
});
