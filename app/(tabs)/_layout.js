import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
        },
        headerShown: false, 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Salas',
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
        }}
      />
      {/* Alteramos o Histórico para Reservas */}
      <Tabs.Screen
        name="history"
        options={{
          title: 'Minhas Reservas',
          tabBarLabel: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
        }}
      />
    </Tabs>
  );
}

