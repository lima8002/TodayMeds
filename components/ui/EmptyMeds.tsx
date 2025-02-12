import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const EmptyMeds = () => {
  return (
    <View
      style={[styles.cardContainer, styles.shadow, { marginHorizontal: 16 }]}
    >
      <View style={styles.insideCardContainer}>
        <Image
          source={require("@/assets/images/no-meds.png")}
          style={styles.image}
        />
        <Text style={styles.textCardContainer}>No medications added yet</Text>
      </View>
    </View>
  );
};

export default EmptyMeds;

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
