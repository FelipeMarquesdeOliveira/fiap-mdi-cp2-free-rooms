import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ title: 'Detalhes da Sala' }} />
      </Stack>
    </AppProvider>
  );
}
