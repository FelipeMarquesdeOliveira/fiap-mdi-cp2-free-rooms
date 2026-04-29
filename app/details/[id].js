import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ROOMS } from '../../data/rooms';
import StatusBadge from '../../components/StatusBadge';
import BotaoCustomizado from '../../components/BotaoCustomizado';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function RoomDetailsScreen() {
  const { id, fromHistory } = useLocalSearchParams();
  const router = useRouter();
  const { favorites, toggleFavorite, addReservation, pastReservations, cancelReservation, isSlotBlocked, getReportsBySala, addReport, removeReport } = useApp();
  const { colors, theme } = useTheme();
  const { user } = useAuth();

  const [isViewingHistory, setIsViewingHistory] = useState(fromHistory === 'true');
  const pastData = pastReservations.find(p => p.id === id);

  const sala = ROOMS.find(r => r.id === id);
  const isFavorited = favorites.includes(id);

  const [dataSelecionada, setDataSelecionada] = useState('');
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [modalFeedback, setModalFeedback] = useState({ visible: false, type: 'success', message: '', actionType: '' });
  const [modalReportsVisible, setModalReportsVisible] = useState(false);

  const [reportTitle, setReportTitle] = useState('');
  const [reportDesc, setReportDesc] = useState('');

  const techActivities = {
    "101": "Hackathon Interno: Desenvolvimento de MVP em React Native",
    "202": "Workshop de Cyber Security e Testes de Penetração",
    "301": "Laboratório de Data Science: Modelagem de Dados com Python",
    "601": "Aula Prática de IoT: Configuração de Sensores Arduino",
    "default": "Estudo de Arquitetura de Software e Design Patterns"
  };

  const currentTechActivity = techActivities[id] || techActivities.default;
  const horarios = ['Hoje, às 16:00', 'Hoje, às 19:00', 'Amanhã, às 10:00', 'Amanhã, às 14:00'];

  const salaReports = getReportsBySala(id);

  if (!sala) return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Sala não encontrada.</Text>
    </View>
  );

  const handleReserve = () => {
    if (!dataSelecionada) {
      setModalFeedback({
        visible: true,
        type: 'error',
        message: 'Selecione um horário disponível antes de reservar.'
      });
      return;
    }

    if (isSlotBlocked(sala.id, dataSelecionada)) {
      setModalFeedback({
        visible: true,
        type: 'error',
        message: 'Este horário já está reservado. Escolha outro.'
      });
      return;
    }

    addReservation(sala, dataSelecionada);
    setModalFeedback({
      visible: true,
      type: 'success',
      message: 'Sala reservada com sucesso para o horário selecionado!'
    });
    setDataSelecionada('');
  };

  const handleCancelReservation = () => {
    if (!dataSelecionada) {
      setModalFeedback({
        visible: true,
        type: 'error',
        message: 'Selecione o horário da reserva que deseja cancelar.'
      });
      return;
    }

    cancelReservation(sala.id, dataSelecionada);
    setModalFeedback({
      visible: true,
      type: 'success',
      message: 'Reserva cancelada. O horário agora está disponível.'
    });
    setDataSelecionada('');
  };

  const enviarReporte = () => {
    if (!reportTitle.trim() || !reportDesc.trim()) return;
    addReport(sala.id, dataSelecionada, reportTitle.trim(), reportDesc.trim(), user?.name || 'Anônimo');
    setModalReportVisible(false);
    setReportTitle('');
    setReportDesc('');
    setModalFeedback({ visible: true, type: 'success', message: 'Reporte enviado com sucesso!', actionType: 'reportSent' });
  };

  const handleRemoveReport = (reportId) => {
    removeReport(reportId, user?.name);
    setModalFeedback({ visible: true, type: 'success', message: 'Report removido.', actionType: 'reportRemoved' });
  };

  const getHorarioStatus = (horario) => {
    if (isSlotBlocked(sala.id, horario)) {
      return 'blocked';
    }
    return 'available';
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <View style={styles.titleRow}>
            <Text style={[styles.nome, { color: colors.text }]}>{sala.nome}</Text>
            <StatusBadge status={sala.status} />
          </View>
          <Text style={[styles.location, { color: colors.textSecondary }]}>Bloco {sala.bloco} - {sala.andar}º Andar</Text>
        </View>

        {isViewingHistory && (
          <View style={[styles.historySection, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <View style={styles.historyHeader}>
              <Ionicons name="code-working" size={20} color={colors.primary} />
              <Text style={[styles.historyTitle, { color: colors.primary }]}>REGISTRO DE ATIVIDADE TECH</Text>
            </View>
            <View style={[styles.historyBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <View style={styles.historyRow}>
                <Text style={[styles.historyLabel, { color: colors.textSecondary }]}>Atividade:</Text>
                <Text style={[styles.historyValueFull, { color: colors.primary }]}>{currentTechActivity}</Text>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.historyRow}>
                <Text style={[styles.historyLabel, { color: colors.textSecondary }]}>Alunos no Grupo:</Text>
                <Text style={[styles.historyValue, { color: colors.text }]}>Gabriel, Felipe, Ricardo</Text>
              </View>
              <View style={styles.historyRow}>
                <Text style={[styles.historyLabel, { color: colors.textSecondary }]}>Total de Utilização:</Text>
                <Text style={[styles.historyValue, { color: colors.text }]}>5 Alunos</Text>
              </View>
              <View style={styles.historyRow}>
                <Text style={[styles.historyLabel, { color: colors.textSecondary }]}>Data de Uso:</Text>
                <Text style={[styles.historyValue, { color: colors.text }]}>{pastData?.dataReserva || 'N/A'}</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.btnRetry, { backgroundColor: colors.primary }]} onPress={() => setIsViewingHistory(false)}>
              <Text style={styles.btnRetryText}>RESERVAR PARA NOVA ATIVIDADE</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isViewingHistory && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Escolher um dos Horários Disponíveis</Text>
            <View style={styles.horariosGrid}>
              {horarios.map(h => {
                const status = getHorarioStatus(h);
                const isBlocked = status === 'blocked';
                return (
                  <TouchableOpacity
                    key={h}
                    style={[
                      styles.horarioChip,
                      { backgroundColor: isBlocked ? colors.error + '20' : colors.surface },
                      { borderColor: isBlocked ? colors.error : 'transparent' },
                      dataSelecionada === h && { backgroundColor: colors.primary, borderColor: colors.primary }
                    ]}
                    onPress={() => !isBlocked && setDataSelecionada(h)}
                    disabled={isBlocked}
                  >
                    <Text style={[
                      styles.horarioText,
                      { color: isBlocked ? colors.error : colors.text },
                      dataSelecionada === h && { color: '#fff', fontWeight: 'bold' }
                    ]}>
                      {h}
                    </Text>
                    {isBlocked && <Ionicons name="lock-closed" size={12} color={colors.error} style={{ marginLeft: 4 }} />}
                  </TouchableOpacity>
                );
              })}
            </View>
            {dataSelecionada && (
              <Text style={[styles.selectedInfo, { color: colors.textSecondary }]}>
                Selecionado: {dataSelecionada}
              </Text>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{isViewingHistory ? 'Detalhes Adicionais' : '2. Comodidades'}</Text>
          <View style={styles.infoGrid}>
            <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
              <Ionicons name="people" size={24} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Capacidade: {sala.capacidade}</Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
              <Ionicons name="snow" size={24} color={sala.possuiArCondicionado ? colors.primary : colors.textSecondary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Ar Condicionado</Text>
            </View>
          </View>
        </View>

        {!isViewingHistory && (
          <View style={styles.actions}>
            <BotaoCustomizado title="RESERVAR ESTA SALA" onPress={handleReserve} />
            <BotaoCustomizado title="CANCELAR RESERVA" onPress={handleCancelReservation} type="secondary" />
            <View style={styles.secondaryActions}>
              <TouchableOpacity onPress={() => toggleFavorite(sala.id)} style={styles.iconBtn}>
                <Ionicons name={isFavorited ? "heart" : "heart-outline"} size={24} color={colors.primary} />
                <Text style={[styles.iconBtnText, { color: colors.textSecondary }]}>{isFavorited ? "Favoritado" : "Favoritar"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalReportsVisible(true)} style={styles.iconBtn}>
                <Ionicons name="warning-outline" size={24} color={colors.textSecondary} />
                <Text style={[styles.iconBtnText, { color: colors.textSecondary }]}>Ver Reports ({salaReports.length})</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalReportVisible(true)} style={styles.iconBtn}>
                <Ionicons name="add-circle-outline" size={24} color={colors.textSecondary} />
                <Text style={[styles.iconBtnText, { color: colors.textSecondary }]}>Reportar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Modal de Reports */}
      <Modal animationType="slide" transparent={true} visible={modalReportsVisible}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, paddingBottom: 40 }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Reports da Sala</Text>
              <TouchableOpacity onPress={() => setModalReportsVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            {salaReports.length === 0 ? (
              <View style={styles.emptyReports}>
                <Ionicons name="checkmark-circle-outline" size={48} color={colors.success} />
                <Text style={[styles.emptyReportsText, { color: colors.textSecondary }]}>Nenhum report encontrado.</Text>
              </View>
            ) : (
              <FlatList
                data={salaReports}
                keyExtractor={(item) => item.id}
                style={styles.reportsList}
                renderItem={({ item }) => (
                  <View style={[styles.reportItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                    <View style={styles.reportHeader}>
                      <Text style={[styles.reportTitle, { color: colors.text }]}>{item.titulo}</Text>
                      {item.autor === user?.name && (
                        <TouchableOpacity onPress={() => handleRemoveReport(item.id)}>
                          <Ionicons name="trash-outline" size={18} color={colors.error} />
                        </TouchableOpacity>
                      )}
                    </View>
                    <Text style={[styles.reportDesc, { color: colors.textSecondary }]}>{item.descricao}</Text>
                    <View style={styles.reportMeta}>
                      <Text style={[styles.reportMetaText, { color: colors.textSecondary }]}>Por {item.autor}</Text>
                      <Text style={[styles.reportMetaText, { color: colors.textSecondary }]}> • {item.data}</Text>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de Reportar Problema */}
      <Modal animationType="slide" transparent={true} visible={modalReportVisible}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, paddingBottom: 40 }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Reportar Problema</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="O que houve? (Ex: Luz queimada)"
              placeholderTextColor={colors.textSecondary}
              value={reportTitle}
              onChangeText={setReportTitle}
            />
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border, height: 80 }]}
              placeholder="Descrição..."
              placeholderTextColor={colors.textSecondary}
              multiline
              value={reportDesc}
              onChangeText={setReportDesc}
            />
            <BotaoCustomizado title="ENVIAR REPORTE" onPress={enviarReporte} />
            <TouchableOpacity onPress={() => setModalReportVisible(false)} style={{ marginTop: 15, alignItems: 'center' }}>
              <Text style={{ color: colors.textSecondary }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Feedback */}
      <Modal animationType="fade" transparent={true} visible={modalFeedback.visible}>
        <View style={styles.modalOverlay}>
          <View style={[styles.feedbackBox, { backgroundColor: colors.surface }]}>
            <Ionicons
              name={modalFeedback.type === 'success' ? "checkmark-circle" : "close-circle"}
              size={80}
              color={modalFeedback.type === 'success' ? colors.success : colors.error}
            />
            <Text style={[styles.feedbackTitle, { color: colors.text }]}>{modalFeedback.type === 'success' ? 'Sucesso!' : 'Ops!'}</Text>
            <Text style={[styles.feedbackMsg, { color: colors.textSecondary }]}>{modalFeedback.message}</Text>
            <View style={styles.feedbackButtons}>
              {modalFeedback.actionType === 'reportSent' && (
                <>
                  <TouchableOpacity
                    style={[styles.btnFinal, { backgroundColor: colors.primary }]}
                    onPress={() => {
                      setModalFeedback({ ...modalFeedback, visible: false });
                      setModalReportsVisible(true);
                    }}
                  >
                    <Text style={styles.btnFinalText}>VER REPORTS</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btnFinal, { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.border }]}
                    onPress={() => setModalFeedback({ ...modalFeedback, visible: false })}
                  >
                    <Text style={[styles.btnFinalText, { color: colors.text }]}>FECHAR</Text>
                  </TouchableOpacity>
                </>
              )}
              {modalFeedback.actionType === 'reportRemoved' && (
                <TouchableOpacity
                  style={[styles.btnFinal, { backgroundColor: colors.success }]}
                  onPress={() => setModalFeedback({ ...modalFeedback, visible: false })}
                >
                  <Text style={styles.btnFinalText}>FECHAR</Text>
                </TouchableOpacity>
              )}
              {!modalFeedback.actionType && (
                <TouchableOpacity
                  style={[styles.btnFinal, { backgroundColor: modalFeedback.type === 'success' ? colors.success : colors.primary }]}
                  onPress={() => {
                    setModalFeedback({ ...modalFeedback, visible: false });
                    if (modalFeedback.type === 'success') router.push('/history');
                  }}
                >
                  <Text style={styles.btnFinalText}>{modalFeedback.type === 'success' ? 'Ver Reservas' : 'Tentar Novamente'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { flex: 1 },
  header: { padding: 24, borderBottomWidth: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  nome: { fontSize: 28, fontWeight: 'bold' },
  location: { fontSize: 16 },
  historySection: { padding: 20, borderBottomWidth: 1 },
  historyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  historyTitle: { fontSize: 14, fontWeight: 'bold' },
  historyBox: { padding: 18, borderRadius: 12, borderWidth: 1 },
  historyRow: { flexDirection: 'column', marginBottom: 12 },
  historyLabel: { fontSize: 12, marginBottom: 4, textTransform: 'uppercase' },
  historyValue: { fontSize: 14, fontWeight: 'bold' },
  historyValueFull: { fontSize: 15, fontWeight: 'bold', lineHeight: 20 },
  divider: { height: 1, marginVertical: 10 },
  btnRetry: { marginTop: 15, padding: 15, borderRadius: 10, alignItems: 'center' },
  btnRetryText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  horariosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  horarioChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
  },
  horarioText: { fontSize: 13 },
  selectedInfo: { marginTop: 12, fontSize: 14 },
  infoGrid: { flexDirection: 'row', gap: 12 },
  infoCard: { flex: 1, padding: 15, borderRadius: 12, alignItems: 'center', elevation: 2 },
  infoLabel: { fontSize: 12, marginTop: 5 },
  actions: { padding: 20, gap: 15 },
  secondaryActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  iconBtn: { alignItems: 'center', gap: 5 },
  iconBtnText: { fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', borderRadius: 20, padding: 25 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  input: { borderRadius: 10, padding: 12, marginBottom: 15, borderWidth: 1 },
  feedbackBox: { width: '85%', borderRadius: 25, padding: 30, alignItems: 'center', elevation: 10 },
  feedbackTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 15 },
  feedbackMsg: { fontSize: 16, textAlign: 'center', marginVertical: 15 },
  btnFinal: { paddingHorizontal: 30, paddingVertical: 15, borderRadius: 12, width: '100%', alignItems: 'center' },
  btnFinalText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  reportsList: { maxHeight: 400 },
  reportItem: { padding: 15, borderRadius: 10, borderWidth: 1, marginBottom: 10 },
  reportHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  reportTitle: { fontSize: 15, fontWeight: 'bold' },
  reportDesc: { fontSize: 14, marginBottom: 8 },
  reportMeta: { flexDirection: 'row' },
  reportMetaText: { fontSize: 12 },
  emptyReports: { alignItems: 'center', paddingVertical: 40 },
  emptyReportsText: { marginTop: 12, fontSize: 16 },
  feedbackButtons: { width: '100%', gap: 10 }
});
