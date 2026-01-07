import { Lazorkit } from "lazor-kit";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default function BiometricLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleBiometricLogin = async () => {
    try {
      // Initialize Lazorkit with biometric support
      const wallet = await Lazorkit.createBiometricWallet({
        biometricType: "fingerprint", // or 'face'
      });

      setIsAuthenticated(true);
      Alert.alert("Success", "Biometric authentication successful!");

      console.log("Biometric wallet created:", wallet.address);
    } catch (error) {
      Alert.alert("Error", "Biometric authentication failed");
      console.error("Biometric login failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Onboarding with Biometric Login</Text>
      {!isAuthenticated ? (
        <TouchableOpacity style={styles.button} onPress={handleBiometricLogin}>
          <Text style={styles.buttonText}>Login with Biometrics</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.statusText}>✓ Authenticated successfully!</Text>
      )}
      <Text style={styles.statusText}>
        This demonstrates Lazorkit's biometric login integration for React
        Native.
      </Text>
    </View>
  );
}
