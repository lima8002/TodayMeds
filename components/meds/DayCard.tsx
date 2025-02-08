import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/Colors";

interface DayCardProps {
  day: string;
  date: string;
}

const DayCard: React.FC<DayCardProps> = ({ day, date }) => {
  return (
    <View style={styles.dayCard}>
      <View style={styles.cardTop}>
        <Text style={styles.dayTitle}>{day}</Text>
      </View>
      <View style={styles.cardBottom}>
        <Text style={styles.dayDate}>{date}</Text>
      </View>
    </View>
  );
};

export default DayCard;

const styles = StyleSheet.create({
  dayCard: {
    width: Platform.OS === "ios" ? 53 : 57,
    borderRadius: 8,
  },
  cardTop: {
    backgroundColor: Colors.TERTIARY,
    borderWidth: 1,
    borderColor: Colors.DARKGRAY,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBottom: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.DARKGRAY,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dayDate: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 18 : 22,
    color: Colors.PRIMARY,
    alignSelf: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  dayTitle: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 14 : 18,
    color: "white",
    alignSelf: "center",
  },
});
