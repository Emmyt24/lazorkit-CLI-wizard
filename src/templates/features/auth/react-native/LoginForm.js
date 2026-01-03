import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const LoginForm = () => (
  <View>
    <Text>Login</Text>
    <TextInput placeholder="Email" />
    <TextInput placeholder="Password" secureTextEntry />
    <TouchableOpacity>
      <Text>Login</Text>
    </TouchableOpacity>
  </View>
);

export default LoginForm;
