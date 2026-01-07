// import { Lazorkit } from 'lazor-kit';
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

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
  formGroup: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#6f42c1",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  statusText: {
    marginTop: 10,
    fontSize: 13,
    color: "#666",
  },
  successText: {
    marginTop: 10,
    fontSize: 14,
    color: "#28a745",
    fontWeight: "600",
  },
});

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const handleSwap = async () => {
    setIsLoading(true);
    try {
      const wallet = await Lazorkit.getWallet();

      const swap = await wallet.swap({
        fromToken: fromToken,
        toToken: toToken,
        amount: amount,
        network: "solana-mainnet",
      });

      setTxHash(swap.txHash);
      Alert.alert("Success", "Token swap completed!");
      console.log("Token swap successful:", swap.txHash);
    } catch (error) {
      Alert.alert("Error", "Token swap failed");
      console.error("Token swap failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔄</Text>
      <Text style={styles.title}>Token Swap</Text>
      <Text style={styles.description}>
        Swap tokens instantly on Solana with gasless transactions
      </Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>From Token: {fromToken}</Text>
        <ScrollView horizontal>
          {["SOL", "USDC", "USDT"].map((token) => (
            <TouchableOpacity
              key={token}
              onPress={() => setFromToken(token)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginRight: 5,
                backgroundColor: fromToken === token ? "#007AFF" : "#eee",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: fromToken === token ? "#fff" : "#000" }}>
                {token}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>To Token: {toToken}</Text>
        <ScrollView horizontal>
          {["USDC", "SOL", "USDT"].map((token) => (
            <TouchableOpacity
              key={token}
              onPress={() => setToToken(token)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginRight: 5,
                backgroundColor: toToken === token ? "#007AFF" : "#eee",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: toToken === token ? "#fff" : "#000" }}>
                {token}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="0.0"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSwap}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Swapping..." : "Swap Tokens"}
        </Text>
      </TouchableOpacity>
      {txHash && (
        <Text style={styles.successText}>Swap successful! Hash: {txHash}</Text>
      )}
    </View>
  );
}
