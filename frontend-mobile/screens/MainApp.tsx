import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import tw from "twrnc";
import { getAuth, signOut } from "firebase/auth";
import { pingBackend, authFetch } from "../lib/api";

export default function MainApp() {
  const [message, setMessage] = useState("Loading ping...");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    pingBackend().then((res) => setMessage(res.message));

    const fetchProfile = async () => {
      try {
        const data = await authFetch("/api/profile");
        setProfile(data.user);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await signOut(getAuth());
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 items-center justify-center bg-blue-300 p-4`}
    >
      <Text style={tw`text-white text-xl mb-4 font-bold`}>
        Mobile: {message}
      </Text>

      {profile ? (
        <>
          <Text style={tw`text-white text-lg`}>Welcome, {profile.email}</Text>
          <Text style={tw`text-white text-xs mb-4`}>UID: {profile.uid}</Text>
        </>
      ) : (
        <Text style={tw`text-white text-sm`}>Loading profile...</Text>
      )}

      <Button title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
}
