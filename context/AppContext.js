import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Históricos de reservas passadas
  const [pastReservations, setPastReservations] = useState([
    { id: "101", nome: "Sala 101", bloco: "Único", andar: 1, status: "livre", dataReserva: "Ontem, às 10:00" },
    { id: "202", nome: "Sala 202", bloco: "Único", andar: 2, status: "manutencao", dataReserva: "Terça, às 14:00" },
    { id: "301", nome: "Sala 301", bloco: "Único", andar: 3, status: "livre", dataReserva: "Segunda, às 08:30" },
    { id: "601", nome: "Sala 601", bloco: "Único", andar: 6, status: "ocupada", dataReserva: "Segunda, às 11:00" },
  ]);

  // Slots bloqueados por sala: { salaId: [horario1, horario2, ...] }
  const [blockedSlots, setBlockedSlots] = useState({});

  // Reports de problemas: [{ id, salaId, horario, titulo, descricao, autor, data }]
  const [reports, setReports] = useState([]);

  const toggleFavorite = (salaId) => {
    setFavorites(prev => {
      if (prev.includes(salaId)) {
        return prev.filter(id => id !== salaId);
      } else {
        return [...prev, salaId];
      }
    });
  };

  const addReservation = (sala, data) => {
    // Bloquear o horário ao reservar
    setBlockedSlots(prev => ({
      ...prev,
      [sala.id]: [...(prev[sala.id] || []), data]
    }));
    setReservations(prev => {
      const filtered = prev.filter(item => item.id !== sala.id);
      return [{ ...sala, dataReserva: data }, ...filtered];
    });
  };

  const cancelReservation = (salaId, horario) => {
    // Liberar o horário bloqueado
    setBlockedSlots(prev => ({
      ...prev,
      [salaId]: (prev[salaId] || []).filter(h => h !== horario)
    }));
    setReservations(prev => prev.filter(item => item.id !== salaId || item.dataReserva !== horario));
  };

  const isSlotBlocked = (salaId, horario) => {
    return (blockedSlots[salaId] || []).includes(horario);
  };

  const addReport = (salaId, horario, titulo, descricao, autor) => {
    const newReport = {
      id: Date.now().toString(),
      salaId,
      horario: horario || 'Sem horário específico',
      titulo,
      descricao,
      autor,
      data: new Date().toLocaleDateString('pt-BR')
    };
    setReports(prev => [newReport, ...prev]);
    return newReport;
  };

  const removeReport = (reportId, autor) => {
    setReports(prev => prev.filter(r => r.id !== reportId && r.autor !== autor));
  };

  const getReportsBySala = (salaId) => {
    return reports.filter(r => r.salaId === salaId);
  };

  return (
    <AppContext.Provider value={{
      favorites,
      toggleFavorite,
      reservations,
      pastReservations,
      addReservation,
      cancelReservation,
      blockedSlots,
      isSlotBlocked,
      reports,
      addReport,
      removeReport,
      getReportsBySala
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
