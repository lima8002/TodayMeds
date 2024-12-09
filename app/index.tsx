import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";

const StartPage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/(auth)/signin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageTitle}
          source={require("../assets/images/logo.png")}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={[styles.bodyTitle, styles.textShadow]}>TodayMeds</Text>
        <Text style={styles.bodySubtitle}>
          TodayMeds is a user-friendly medicine reminder app designed to help
          you stay on track with your health. With an intuitive interface, it’s
          easy to manage multiple medications for yourself or loved ones. Get
          reminders tailored to your routine, ensuring you never miss a dose.
          Stay organized and take control of your wellness with TodayMeds!
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          text="Let's get started"
          onPress={handleGetStarted}
          type="SECONDARY"
        />
      </View>
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "30%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: 188,
    height: 188,
    marginLeft: "16%",
    paddingBottom: 5,
    overflow: "hidden",
  },
  imageTitle: {
    resizeMode: "contain",
    width: "90%",
    height: "90%",
  },
  bodyContainer: {
    paddingHorizontal: 25,
  },
  bodyTitle: {
    textAlign: "center",
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginVertical: 15,
    color: "#172e74",
  },
  bodySubtitle: {
    paddingTop: 30,
    fontSize: 20,
    fontFamily: "outfit",
    textAlign: "justify",
  },
  btnContainer: {
    bottom: "10%",
    position: "absolute",
    width: "60%",
    alignSelf: "center",
  },
  textShadow: {
    textShadowColor: "silver",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
});
