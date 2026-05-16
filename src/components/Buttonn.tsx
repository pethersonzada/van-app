import React from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

interface ButtonProps {
  title: string;
  style?: ViewStyle; // Melhor usar ViewStyle em vez de any para melhor suporte do TS
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({ 
  title, 
  style, 
  onPress, 
  isLoading = false, 
  disabled = false 
}: ButtonProps) {
  
  const isButtonDisabled = disabled || isLoading;

  return (
    
    <Shadow 
      distance={8} 
      startColor={"#59748c90"}
      offset={[0, 3]} 
      stretch={true}
      disabled={isButtonDisabled}
      containerStyle={style}
    >
      <TouchableOpacity 
        onPress={onPress} 
        disabled={isButtonDisabled}
        activeOpacity={0.8}
        style={[
          styles.button, 
          isButtonDisabled && styles.disabled
        ]}
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
  button: {
    backgroundColor: "#354D62",
    height:60,
    borderRadius: 15,
    padding:15,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },
  text: {
    color: '#F0f9ff',
    fontSize: 20,
    fontWeight: "bold",
    fontFamily:"Lato",
  },
  disabled: {
    backgroundColor: '#9aafc2',
  }
});