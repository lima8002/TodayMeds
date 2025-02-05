import CustomHeader from "@/components/ui/CustomHeader";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { onAddNewMedToDB } from "@/utils/FirebaseHelper";

import { MedsDB } from "@/constants/Types";
import { Colors } from "@/constants/Colors";

export default function ProfileScreen() {
  const { letUserSignOut, deleteMedication, user, fetchMeds } =
    useGlobalContext();

  const loadRandomData = async () => {
    const medsToAdd: MedsDB[] = [
      {
        id: "123",
        email: "123@123.com",
        name: "Vitamin A",
        dosage: "1",
        frequency: "8",
        dateTime: "2025-02-02T12:21:17",
        quantity: "10",
        withFoodWater: false,
        active: true,
        intakeRef: "123",
        intake: [
          {
            intakeId: "0",
            intakeRef: "123",
            dateTime: "2025-02-02T12:21:17",
            taken: false,
          },
          {
            intakeId: "1",
            intakeRef: "123",
            dateTime: "2025-02-02T20:21:17",
            taken: false,
          },
          {
            intakeId: "2",
            intakeRef: "123",
            dateTime: "2025-02-03T04:21:17",
            taken: false,
          },
          {
            intakeId: "3",
            intakeRef: "123",
            dateTime: "2025-02-03T12:21:17",
            taken: false,
          },
          {
            intakeId: "4",
            intakeRef: "123",
            dateTime: "2025-02-03T20:21:17",
            taken: false,
          },
          {
            intakeId: "5",
            intakeRef: "123",
            dateTime: "2025-02-04T04:21:17",
            taken: false,
          },
          {
            intakeId: "6",
            intakeRef: "123",
            dateTime: "2025-02-04T12:21:17",
            taken: false,
          },
          {
            intakeId: "7",
            intakeRef: "123",
            dateTime: "2025-02-04T20:21:17",
            taken: false,
          },
        ],
      },
      {
        id: "1234",
        email: "123@123.com",
        name: "Panadol",
        dosage: "1",
        frequency: "8",
        dateTime: "2025-02-02T12:31:17",
        quantity: "10",
        withFoodWater: false,
        active: true,
        intakeRef: "1234",
        intake: [
          {
            intakeId: "0",
            intakeRef: "1234",
            dateTime: "2025-02-02T12:31:17",
            taken: false,
          },
          {
            intakeId: "1",
            intakeRef: "1234",
            dateTime: "2025-02-02T20:31:17",
            taken: false,
          },
          {
            intakeId: "2",
            intakeRef: "1234",
            dateTime: "2025-02-03T04:31:17",
            taken: false,
          },
          {
            intakeId: "3",
            intakeRef: "1234",
            dateTime: "2025-02-03T12:31:17",
            taken: false,
          },
          {
            intakeId: "4",
            intakeRef: "1234",
            dateTime: "2025-02-03T20:31:17",
            taken: false,
          },
          {
            intakeId: "5",
            intakeRef: "1234",
            dateTime: "2025-02-04T04:31:17",
            taken: false,
          },
          {
            intakeId: "6",
            intakeRef: "1234",
            dateTime: "2025-02-04T12:31:17",
            taken: false,
          },
          {
            intakeId: "7",
            intakeRef: "1234",
            dateTime: "2025-02-04T20:31:17",
            taken: false,
          },
        ],
      },
      {
        id: "12345",
        email: "123@123.com",
        name: "Nurofen Pain Relief",
        dosage: "1",
        frequency: "8",
        dateTime: "2025-02-02T12:34:17",
        quantity: "10",
        withFoodWater: true,
        active: true,
        intakeRef: "12345",
        intake: [
          {
            intakeId: "0",
            intakeRef: "12345",
            dateTime: "2025-02-02T12:34:17",
            taken: false,
          },
          {
            intakeId: "1",
            intakeRef: "12345",
            dateTime: "2025-02-02T20:34:17",
            taken: false,
          },
          {
            intakeId: "2",
            intakeRef: "12345",
            dateTime: "2025-02-03T04:34:17",
            taken: false,
          },
          {
            intakeId: "3",
            intakeRef: "12345",
            dateTime: "2025-02-03T12:34:17",
            taken: false,
          },
          {
            intakeId: "4",
            intakeRef: "12345",
            dateTime: "2025-02-03T20:34:17",
            taken: false,
          },
          {
            intakeId: "5",
            intakeRef: "12345",
            dateTime: "2025-02-04T04:34:17",
            taken: false,
          },
          {
            intakeId: "6",
            intakeRef: "12345",
            dateTime: "2025-02-04T12:34:17",
            taken: false,
          },
          {
            intakeId: "7",
            intakeRef: "12345",
            dateTime: "2025-02-04T20:34:17",
            taken: false,
          },
        ],
      },
    ];
    try {
      for (const med of medsToAdd) {
        const newMed: MedsDB = {
          ...med,
          intake: med.intake.map((intake) => ({ ...intake })),
        };
        await onAddNewMedToDB(newMed);
      }
      console.log("Random medications added successfully!");
      fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error adding random medications:", error);
    }
  };

  // implement an option to reset the alert from taken

  return (
    <View style={styles.container}>
      <CustomHeader title={"Profile"} />
      <ScrollView
        style={{
          backgroundColor: Colors.BACKGROUND_200,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <View style={styles.containerBtn}>
          <CustomButton
            text="Delete all medicatons"
            type="PRIMARY"
            onPress={() => {
              deleteMedication(user?.email || "");
              fetchMeds(user?.email || "");
            }}
          />
          <CustomButton
            text="Load medicatons"
            type="SECONDARY"
            onPress={() => loadRandomData()}
          />
          <CustomButton
            text="Delete all medicatons"
            type="SECONDARY"
            onPress={() => {}}
          />
        </View>
        <View style={[styles.signoutBtn, styles.shadow]}>
          <CustomButton
            text="Log Out"
            onPress={() => letUserSignOut()}
            type="SECONDARY"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerBtn: {
    flex: 1,
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    margin: 12,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    marginBottom: 20,
  },
  signoutBtn: {
    paddingTop: 20,
    marginHorizontal: 20,
    height: "100%",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "silver",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
});
