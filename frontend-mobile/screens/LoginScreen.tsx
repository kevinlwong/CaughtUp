import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import tw from "twrnc";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-blue-500 p-4`}>
      <Text style={tw`text-white text-xl font-bold mb-4`}>CaughtUp Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={tw`bg-white w-full p-3 rounded mb-2`}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        style={tw`bg-white w-full p-3 rounded mb-2`}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={tw`flex-row justify-between w-full gap-2`}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Sign Up" onPress={handleSignup} />
      </View>

      {error && <Text style={tw`text-red-200 mt-2`}>{error}</Text>}
    </View>
  );
}
