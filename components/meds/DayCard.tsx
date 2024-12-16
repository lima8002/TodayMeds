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

const styles = StyleSheet.create({
  dayCard: {
    width: Platform.OS === "ios" ? 76 : 66,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 14,
    backgroundColor: "white", // Needed for iOS shadow to work
    overflow: "visible", // Allows the shadow to be visible outside the component
  },
  cardTop: {
    backgroundColor: Colors.TERTIARY,
    borderWidth: 0.6,
    borderColor: Colors.BORDERGRAY,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardBottom: {
    backgroundColor: "#fff",
    borderWidth: 0.6,
    borderColor: Colors.BORDERGRAY,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dayDate: {
    fontFamily: "outfit-medium",
    fontSize: 28,
    color: Colors.PRIMARY,
    alignSelf: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  dayTitle: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
});

export default DayCard;
