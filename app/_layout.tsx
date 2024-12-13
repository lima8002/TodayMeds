import React, { useEffect, useState } from "react";
import { router, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { AuthenticatedUser } from "@/utils/FirebaseHelper";
import GlobalProvider, { useGlobalContext } from "@/context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

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

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <RootLayoutNav />
    </GlobalProvider>
  );
}

function RootLayoutNav() {
  const { setUser } = useGlobalContext();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const unsubscribe = AuthenticatedUser((authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsUserAuthenticated(true);
        router.replace("/home");
      } else {
        setUser(null);
        setIsUserAuthenticated(false);
        router.replace("/signin");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(meds)" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
