import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useAuthContext } from "@/context/AuthProvider";

export default function RootLayout() {
  const { isLoading, isLoggedIn } = useAuthContext();

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
