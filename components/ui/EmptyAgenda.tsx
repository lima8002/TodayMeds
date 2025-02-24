import React from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { Colors } from "@/constants/Colors";
import DayCard from "../meds/DayCard";
import CustomButton from "./CustomButton";

const { width } = Dimensions.get("window");

interface EmptyAgendaProps {
  screenOptions?: string | undefined;
}

const EmptyAgenda: React.FC<EmptyAgendaProps> = ({ screenOptions }) => {
  return (
    <>
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
      {screenOptions === "agenda" && (
        <View style={styles.button}>
          <CustomButton
            type="ICON"
            icon={"locationT"}
            iconColor={Colors.TAKEN_200}
            onPress={() => {
              Linking.openURL(
                "https://www.google.com/maps/search/?api=1&query=pharmacy+near+me"
              ).catch((err) => console.error("An error occurred", err));
            }}
            otherStyles={{
              width: "45%",
              flexDirection: "row",
              borderWidth: 1,
              borderColor: Colors.TEXT_100,
            }}
          />
        </View>
      )}
    </>
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
    height: 200,
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
    paddingTop: 35,
    fontFamily: "outfit",
    opacity: Platform.OS === "ios" ? 0.3 : 0.4,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    opacity: 0.35,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
