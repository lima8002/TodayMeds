import React from "react";
import { Text, Platform, StyleSheet, View } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";
import { Intake } from "@/constants/Types";
import Taken from "./Taken";

interface IntakeProps {
  medRef: string;
  intakeItem: Intake;
  type?: string;
}

const IntakeDetails: React.FC<IntakeProps> = ({ intakeItem, medRef, type }) => {
  const { medications } = useGlobalContext();

  const medication = medications.find((med) => med.intakeRef === medRef);

  if (!medication) {
    return null;
  }

  return (
    <View style={styles.intakeItem}>
      {medication && type !== "UNDO" ? (
        <View style={styles.col1}>
          <Text style={styles.intakeTime}>
            {new Date(intakeItem.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
        </View>
      ) : (
        <View style={styles.col1Modal}>
          <Text style={styles.intakeTime}>
            {new Date(intakeItem.dateTime).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </View>
      )}
      {medication && type !== "UNDO" ? (
        <View style={styles.col2}>
          <Text style={styles.intakeMedName}>{medication.name || ""}</Text>
        </View>
      ) : (
        <View style={styles.col2Modal}>
          <Text style={[styles.intakeTime, { fontFamily: "outfit-medium" }]}>
            {new Date(intakeItem.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
        </View>
      )}
      <View style={type !== "UNDO" ? styles.col3 : styles.col3Modal}>
        <Taken
          intakeId={intakeItem.intakeId}
          intakeRef={intakeItem.intakeRef}
          type={type}
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
    height: 45,
  },
  col1: {
    flex: 18,
    alignItems: "flex-end",
  },
  col1Modal: {
    flex: Platform.OS === "ios" ? 27 : 30,
  },
  col2: {
    flex: 52,
  },
  col2Modal: {
    flex: Platform.OS === "ios" ? 48 : 45,
    alignItems: "center",
  },
  col3: {
    flex: 30,
    alignItems: "flex-end",
  },
  col3Modal: {
    flex: 25,
  },
  intakeTime: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 14 : 17,
    color: Colors.TEXT,
    marginRight: 10,
  },
  intakeMedName: {
    color: Colors.TEXT,
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 16 : 18,
  },
});
