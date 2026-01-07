// import { Lazorkit } from 'lazor-kit';
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
  pricingCard: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 20,
    borderRadius: 12,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: "#10b981",
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 5,
  },
  billingPeriod: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
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
      <Text style={styles.icon}>⭐</Text>
      <Text style={styles.title}>Premium Subscription</Text>
      {!isSubscribed ? (
        <>
          <View style={styles.pricingCard}>
            <Text style={styles.priceText}>$10</Text>
            <Text style={styles.billingPeriod}>USDC per month</Text>
          </View>
          <Text style={styles.description}>
            Subscribe to access premium features with automated billing
          </Text>
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
