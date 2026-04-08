import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const BotaoCustomizado = ({ title, onPress, type = 'primary', style }) => {
  const isSecondary = type === 'secondary';
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isSecondary ? styles.buttonSecondary : styles.buttonPrimary,
        style
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.text, 
        isSecondary ? styles.textSecondary : styles.textPrimary
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: '#fff',
  },
  textSecondary: {
    color: Colors.primary,
  },
});

export default BotaoCustomizado;
