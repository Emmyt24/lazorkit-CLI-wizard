import { Lazorkit } from "lazor-kit";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

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
    <View>
      <Text>Mobile Onboarding with Biometric Login</Text>
      {!isAuthenticated ? (
        <TouchableOpacity onPress={handleBiometricLogin}>
          <Text>Login with Biometrics</Text>
        </TouchableOpacity>
      ) : (
        <Text>Authenticated successfully!</Text>
      )}
      <Text>
        This demonstrates Lazorkit's biometric login integration for React
        Native.
      </Text>
    </View>
  );
}
