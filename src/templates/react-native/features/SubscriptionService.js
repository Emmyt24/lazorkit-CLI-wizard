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
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#dc3545",
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
    fontSize: 13,
    color: "#666",
  },
  successText: {
    marginTop: 10,
    fontSize: 14,
    color: "#28a745",
    fontWeight: "600",
  },
  subscriptionInfo: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default function SubscriptionService() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const wallet = await Lazorkit.getWallet();

      const subscription = await wallet.createSubscription({
        amount: "10",
        currency: "USDC",
        interval: "monthly",
        service: "premium-service",
        network: "solana-mainnet",
      });

      setSubscriptionId(subscription.id);
      setIsSubscribed(true);
      Alert.alert("Success", "Subscription created!");
      console.log("Subscription created:", subscription.id);

      subscription.on("billing", (tx) => {
        console.log("Automated billing processed:", tx);
      });
    } catch (error) {
      Alert.alert("Error", "Subscription creation failed");
      console.error("Subscription creation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Service</Text>
      {!isSubscribed ? (
        <>
          <Text style={styles.statusText}>
            Subscribe to access premium features
          </Text>
          <Text style={styles.priceText}>$10 USDC/month</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubscribe}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Processing..." : "Subscribe Now"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.subscriptionInfo}>
          <Text style={styles.successText}>✓ Subscription Active</Text>
          <Text style={styles.statusText}>
            Subscription ID: {subscriptionId}
          </Text>
          <Text style={styles.statusText}>
            Your smart wallet will handle automated monthly billing.
          </Text>
        </View>
      )}
    </View>
  );
}
