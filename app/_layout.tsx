import { useEffect, useState } from "react";
import { router, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { AuthenticatedUser } from "@/utils/FirebaseHelper";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | null
  >(null);

  const [fontsLoaded, error] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  useEffect(() => {
    const unsubscribe = AuthenticatedUser((user) => {
      if (user) {
        setIsUserAuthenticated(true);
        router.replace("/home"); // Redirect to home page if user is authenticated
      } else {
        setIsUserAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

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
    <>
      {isUserAuthenticated ? (
        <Stack screenOptions={{ headerShown: false }} initialRouteName="home">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(meds)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
        </Stack>
      )}
      <StatusBar style="dark" />
    </>
  );
}
