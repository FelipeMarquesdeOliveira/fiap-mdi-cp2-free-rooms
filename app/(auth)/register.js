import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);

  const router = useRouter();
  const { signUp } = useAuth();
  const { colors } = useTheme();

  const validate = () => {
    let newErrors = {};
    
    if (!name) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (name || email || password || confirmPassword) {
      validate();
    }
  }, [name, email, password, confirmPassword]);

  const handleRegister = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    const result = await signUp(name, email, password);
    setIsLoading(false);
    
    if (result.success) {
      setModalSuccessVisible(true);
    } else {
      setErrors({ general: result.message });
    }
  };

  const isButtonDisabled = !name || !email || !password || !confirmPassword || Object.keys(errors).length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Criar Conta</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Junte-se à comunidade FreeRooms
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Nome Completo</Text>
              <View style={[styles.inputWrapper, { borderColor: errors.name ? colors.error : colors.border }]}>
                <Ionicons name="person-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Seu nome"
                  placeholderTextColor={colors.textSecondary}
                  value={name}
                  onChangeText={setName}
                />
              </View>
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>E-mail</Text>
              <View style={[styles.inputWrapper, { borderColor: errors.email ? colors.error : colors.border }]}>
                <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="seu@email.com"
                  placeholderTextColor={colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Senha</Text>
              <View style={[styles.inputWrapper, { borderColor: errors.password ? colors.error : colors.border }]}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="******"
                  placeholderTextColor={colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Confirmar Senha</Text>
              <View style={[styles.inputWrapper, { borderColor: errors.confirmPassword ? colors.error : colors.border }]}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="******"
                  placeholderTextColor={colors.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            {errors.general && (
              <View style={styles.generalError}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isButtonDisabled ? colors.border : colors.primary }
              ]}
              onPress={handleRegister}
              disabled={isButtonDisabled || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal animationType="fade" transparent={true} visible={modalSuccessVisible}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Ionicons name="checkmark-circle" size={80} color={colors.success} />
            <Text style={[styles.modalTitle, { color: colors.text }]}>Conta Criada!</Text>
            <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
              Sua conta foi criada com sucesso. Faça login para continuar.
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                setModalSuccessVisible(false);
                router.replace('/login');
              }}
            >
              <Text style={styles.modalButtonText}>FAZER LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 32,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  generalError: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  generalErrorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  modalButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
