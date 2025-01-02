import { ActivityIndicator } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";

import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot } from "expo-router";

export default function RootLayout() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (isLoading) {
    return (
      <SafeAreaView>
        {/* className="bg-white h-full flex justify-center items-center"> */}
        <ActivityIndicator size="small" />
        {/* className="text-primary-300"  */}
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) return <Redirect href="/signin" />;

  return <Slot />;
}
