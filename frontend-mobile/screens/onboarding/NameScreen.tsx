import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import tw from "twrnc";
import ScreenWrapper from "../../components/ScreenWrapper"


type Props = {
  onNext: (name: string) => void;
};

export default function NameScreen({ onNext }: Props) {
  const [name, setName] = useState("");

  return (
    <ScreenWrapper bg="blue-300">
      <Text style={tw`text-2xl font-bold mb-4`}>What's your name?</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        style={tw`bg-white w-full p-3 rounded mb-4`}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <Button
        title="Continue"
        disabled={!name.trim()}
        onPress={() => onNext(name.trim())}
      />
      </ScreenWrapper>
  );
}
