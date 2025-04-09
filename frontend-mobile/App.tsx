import React, { useEffect, useState } from "react"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { View, Text } from "react-native"
import tw from "twrnc"
import "./lib/firebase"

import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import QuizScreen from "./screens/QuizScreen"
import ResultsScreen from "./screens/ResultsScreen"
import { QuizResult, UserProfile } from "./types/quiz"

import WelcomeScreen from "./screens/onboarding/WelcomeScreen"
import GenerationScreen from "./screens/onboarding/GenerationScreen"
import InterestsScreen from "./screens/onboarding/InterestsScreen"
import PremiumScreen from "./screens/onboarding/PremiumScreen"
import NameScreen from "./screens/onboarding/NameScreen"
import { authFetch } from "./lib/api"

import HomeButton from "./components/HomeButton"

export default function App() {
  const [authStatus, setAuthStatus] = useState<
    "checking" | "loggedOut" | "onboarding" | "loggedIn"
  >("checking")
  const [result, setResult] = useState<QuizResult | null>(null)
  const [profile, setProfile] = useState<UserProfile>({})
  const [step, setStep] = useState<
    "welcome" | "name" | "generation" | "interests" | "premium" | "home" | "quiz" | "results"
  >("welcome")

  const shouldShowHomeButton =
    authStatus === "loggedIn" &&
    step !== "home" &&
    !["welcome", "generation", "interests", "premium"].includes(step)

  console.log("step:", step, "authStatus:", authStatus)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return setAuthStatus("loggedOut")

      try {
        const res = await authFetch("/api/profile")
        setProfile(res)

        if (res.finishedOnboarding) {
          setAuthStatus("loggedIn")
          setStep("home")
        } else {
          setAuthStatus("onboarding")
          setStep("welcome")
        }
      } catch (err) {
        console.error("Failed to load profile", err)
        setAuthStatus("onboarding")
        setStep("welcome")
      }
    })

    return () => unsubscribe()
  }, [])

  if (authStatus === "checking") {
    return (
      <View style={tw`flex-1 items-center justify-center bg-blue-500`}>
        <Text style={tw`text-white text-xl`}>Checking session...</Text>
      </View>
    )
  }

  if (authStatus === "loggedOut") return <LoginScreen />

  if (authStatus === "onboarding") {
    if (step === "welcome") {
      return <WelcomeScreen onNext={() => setStep("name")} />
    }

    if (step === "name") {
      return (
        <NameScreen
          onNext={(name) => {
            setProfile((p: any) => ({ ...p, name }))
            setStep("generation")
          }}
        />
      )
    }

    if (step === "generation") {
      return (
        <GenerationScreen
          onNext={(gen) => {
            setProfile((p: any) => ({ ...p, generation: gen }))
            setStep("interests")
          }}
        />
      )
    }

    if (step === "interests") {
      return (
        <InterestsScreen
          onNext={(interests) => {
            setProfile((p: any) => ({ ...p, interests }))
            setStep("premium")
          }}
        />
      )
    }

    if (step === "premium") {
      return (
        <PremiumScreen
          profile={profile}
          onComplete={() => {
            setAuthStatus("loggedIn")
            setStep("home")
          }}
        />
      )
    }
  }

  // Authenticated screens
  if (authStatus === "loggedIn") {
    if (step === "home") {
      return (
        <>
          <HomeScreen onStart={() => setStep("quiz")} profile={profile} />
        </>
      )
    }

    if (step === "quiz") {
      return (
        <>
          <QuizScreen
            onComplete={(result) => {
              setResult(result)
              setStep("results")
            }}
          />
          {shouldShowHomeButton && (
            <HomeButton
              currentScreen={step}
              onNavigateHome={() => setStep("home")}
            />
          )}
        </>
      )
    }

    if (step === "results" && result) {
      return (
        <>
          <ResultsScreen result={result} onRestart={() => setStep("home")} />
          {shouldShowHomeButton && (
            <HomeButton
              currentScreen={step}
              onNavigateHome={() => setStep("home")}
            />
          )}
        </>
      )
    }
  }

  // Fallback render (edge case)
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-red-500 text-lg font-bold`}>Oops! Unknown state.</Text>
    </View>
  )
}
