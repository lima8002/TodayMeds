import { ActivityIndicator } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";

import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="small" color={Colors.PRIMARY} />
      </SafeAreaView>
    );
  } else if (!isLoggedIn) return <Redirect href="/signin" />;

  return <Slot />;
}
