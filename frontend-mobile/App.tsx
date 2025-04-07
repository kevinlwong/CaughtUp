import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { pingBackend } from './lib/api'

export default function App() {
  const [message, setMessage] = useState('Loading...')

  console.log('ENV:', process.env.EXPO_PUBLIC_API_URL)

  useEffect(() => {
    pingBackend().then((res) => setMessage(res.message))
  }, [])

  return (
    <View style={tw`flex-1 items-center justify-center bg-blue-500`}>
      <Text style={tw`text-white text-2xl font-bold`}>Mobile: {message}</Text>
    </View>
  )
}
