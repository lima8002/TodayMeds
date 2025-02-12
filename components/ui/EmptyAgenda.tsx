import React from "react";
import { Platform, Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import DayCard from "../meds/DayCard";

const { width } = Dimensions.get("window");

const EmptyAgenda = () => {
  return (
    <View style={[styles.cardContainer, styles.shadow]}>
      <View style={styles.insideCardContainer}>
        <DayCard
          day={new Date()
            .toLocaleDateString("en-US", { weekday: "short" })
            .toUpperCase()}
          date={new Date().getDate().toString()}
        />
        <Text style={styles.textCardContainer}>
          You have no scheduled for today
        </Text>
      </View>
    </View>
  );
};

export default EmptyAgenda;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND_100,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BORDERGRAY,
  },
  insideCardContainer: {
    marginTop: 25,
    paddingBottom: 25,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textCardContainer: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 16 : 18,
    color: "#000000",
    paddingTop: 20,
    fontFamily: "outfit",
    opacity: Platform.OS === "ios" ? 0.3 : 0.4,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    opacity: 0.35,
  },
  shadow: {
    ...(Platform.OS === "android"
      ? {
          elevation: 2,
        }
      : {
          shadowColor: Colors.GRAY,
          shadowOffset: { width: 0.8, height: 1.2 },
          shadowOpacity: 0.3,
          shadowRadius: 0.8,
        }),
  },
});
