import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import GlobalProvider from "@/context/GlobalProvider";
import * as Notifications from "expo-notifications";
import "./global.css";
import { Alert, Linking } from "react-native";
import { setupNotificationCategories } from "@/utils/Notifications";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function requestPermissions(): Promise<void> {
  const { status }: Notifications.PermissionResponse =
    await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Notifications",
      "You need to enable notifications for this app!",
      [
        {
          text: "Go to Settings",
          onPress: async () => {
            await Linking.openSettings();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }
}

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    requestPermissions();
    setupNotificationCategories();
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
      <StatusBar style="dark" />
    </GlobalProvider>
  );
}
