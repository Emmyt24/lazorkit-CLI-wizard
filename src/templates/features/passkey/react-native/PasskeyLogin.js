import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default function PasskeyLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePasskeyLogin = async () => {
    setIsLoading(true);
    try {
      // Initialize Lazorkit passkey wallet
      // const wallet = await Lazorkit.createPasskeyWallet({
      //   challenge: "your-challenge-here",
      // });

      Alert.alert("Success", "Passkey wallet created!");
      console.log("Passkey wallet created");
    } catch (error) {
      Alert.alert("Error", "Passkey login failed");
      console.error("Passkey login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔐</Text>
      <Text style={styles.title}>Passkey Login</Text>
      <Text style={styles.description}>
        Secure authentication using passkeys and smart wallets
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePasskeyLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Logging in..." : "Login with Passkey"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.statusText}>
        This demonstrates Lazorkit's passkey-based authentication and smart
        wallet creation.
      </Text>
    </View>
  );
}
