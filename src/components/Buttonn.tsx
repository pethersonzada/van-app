import React from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  View,
  ActivityIndicator
} from 'react-native';
import { Shadow } from 'react-native-shadow-2'; // Importando a mesma que o Input

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({title, onPress, isLoading = false, disabled = false}: ButtonProps) {
  
  const isButtonDisabled = disabled || isLoading;

  return (
    <Shadow 
      distance={8} 
      startColor={"#59748c90"}
      offset={[0,3]} 
      stretch={true}
      disabled={isButtonDisabled}
    >
      <TouchableOpacity 
        onPress={onPress} 
        disabled={isButtonDisabled}
        activeOpacity={0.8}
        style={[styles.container, isButtonDisabled && styles.disabled]}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.text}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#354D62",
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
  },
  text: {
    color: '#F0f9ff',
    fontSize: 20,
    fontFamily: "Lato",
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: '#9aafc2',
  }
});