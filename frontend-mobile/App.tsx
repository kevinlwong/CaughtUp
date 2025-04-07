import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { View, Text } from "react-native";
import tw from "twrnc";
import "./lib/firebase";
import LoginScreen from "./screens/LoginScreen";
import MainApp from "./screens/MainApp";

export default function App() {
  const [authStatus, setAuthStatus] = useState<
    "checking" | "loggedIn" | "loggedOut"
  >("checking");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthStatus(user ? "loggedIn" : "loggedOut");
    });

    return () => unsubscribe();
  }, []);

  if (authStatus === "checking") {
    return (
      <View style={tw`flex-1 items-center justify-center bg-blue-500`}>
        <Text style={tw`text-white text-xl`}>Checking session...</Text>
      </View>
    );
  }

  return authStatus === "loggedIn" ? <MainApp /> : <LoginScreen />;
}
