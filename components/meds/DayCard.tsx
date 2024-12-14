import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
    width: 60,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 14,
    // Add these properties for iOS shadow
    backgroundColor: "white", // Needed for iOS shadow to work
    overflow: "visible", // Allows the shadow to be visible outside the component
  },
  cardTop: {
    backgroundColor: Colors.TERTIARY,
    borderWidth: 0.6,
    borderColor: Colors.BORDERGRAY,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  cardBottom: {
    backgroundColor: "#fff",
    borderWidth: 0.6,
    borderColor: Colors.BORDERGRAY,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  dayDate: {
    fontFamily: "outfit-medium",
    fontSize: 28,
    color: Colors.PRIMARY,
    alignSelf: "center",
  },
  dayTitle: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
});

export default DayCard;
