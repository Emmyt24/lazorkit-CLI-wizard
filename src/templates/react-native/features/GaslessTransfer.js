// import { Lazorkit } from 'lazor-kit';
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#28a745",
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
  successText: {
    marginTop: 10,
    fontSize: 14,
    color: "#28a745",
    fontWeight: "600",
  },
});

export default function GaslessTransfer() {
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const handleGaslessTransfer = async () => {
    setIsLoading(true);
    try {
      const wallet = await Lazorkit.getWallet();

      const tx = await wallet.transfer({
        to: "recipient-address",
        amount: "1",
        token: "USDC",
        gasless: true,
        network: "solana-mainnet",
      });

      setTxHash(tx.hash);
      Alert.alert("Success", "Gasless transfer completed!");
      console.log("Gasless transfer successful:", tx.hash);
    } catch (error) {
      Alert.alert("Error", "Gasless transfer failed");
      console.error("Gasless transfer failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gasless USDC Transfer</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGaslessTransfer}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Processing..." : "Send 1 USDC (Gasless)"}
        </Text>
      </TouchableOpacity>
      {txHash && <Text style={styles.successText}>Transaction: {txHash}</Text>}
      <Text style={styles.statusText}>
        This demonstrates Lazorkit's gasless transaction feature on Solana
        Mainnet.
      </Text>
    </View>
  );
}
