import React, { useState } from "react";
import { Image, Text, Platform, StyleSheet, View } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";
import { Intake } from "@/constants/Types";
import Taken from "./Taken";

interface IntakeProps {
  medRef: string;
  intakeItem: Intake;
}

const IntakeDetails: React.FC<IntakeProps> = ({ intakeItem, medRef }) => {
  const { medications } = useGlobalContext();
  const medication = medications.find((med) => med.intakeRef === medRef);

  if (!medication) {
    return null;
  }

  return (
    <View style={styles.intakeItem}>
      <View style={styles.col1}>
        <Text style={styles.intakeTime}>
          {new Date(intakeItem.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
      </View>
      <View style={styles.col2}>
        <Text style={styles.intakeMedName}>{medication.name || ""}</Text>
      </View>
      <View style={styles.col3}>
        <Taken
          intakeId={intakeItem.intakeId}
          intakeRef={intakeItem.intakeRef}
        />
      </View>
    </View>
  );
};

export default IntakeDetails;

const styles = StyleSheet.create({
  intakeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.BORDERGRAY,
  },
  col1: {
    flex: 18,
    alignItems: "flex-end",
  },
  col2: {
    flex: 52,
  },
  col3: {
    flex: 30,
    alignItems: "flex-end",
  },
  intakeTime: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 14 : 17,
    // color: "#6B7B8F",
    color: "#333333",
    marginRight: 10,
  },
  intakeMedName: {
    color: "#1E2A3A",
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 16 : 18,
  },
});
