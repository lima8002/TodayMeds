import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { onAddNewMedToDB } from "@/utils/FirebaseHelper";
import { MedsDB } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/ui/CustomButton";
import CustomHeader from "@/components/ui/CustomHeader";

export default function ProfileScreen() {
  const {
    letUserSignOut,
    deleteMedication,
    user,
    fetchMeds,
    autosave,
    setAutosave,
  } = useGlobalContext();

  const handleAutosaveSwitch = async (newValue: boolean) => {
    try {
      setAutosave(newValue);
      if (newValue) {
        await AsyncStorage.setItem("Autosave", "true");
        console.log("Autosave enabled");
      } else {
        await AsyncStorage.removeItem("Autosave");
        console.log("Autosave disabled");
      }
    } catch (error) {
      console.error("Error getting Autosave:", error);
    }
  };

  const loadRandomData = async () => {
    const medsToAdd: MedsDB[] = [
      {
        id: "123",
        email: "123@123.com",
        name: "Vitamin A",
        dosage: "1",
        frequency: "12",
        dateTime: "2025-02-06T00:47:00",
        quantity: "22",
        withFoodWater: false,
        active: true,
        intakeRef: "123",
        intake: [
          {
            intakeId: "0",
            intakeRef: "123",
            dateTime: "2025-02-06T00:47:00",
            taken: false,
          },
          {
            intakeId: "1",
            intakeRef: "123",
            dateTime: "2025-02-06T12:47:00",
            taken: false,
          },
          {
            intakeId: "2",
            intakeRef: "123",
            dateTime: "2025-02-07T00:47:00",
            taken: false,
          },
          {
            intakeId: "3",
            intakeRef: "123",
            dateTime: "2025-02-07T12:47:00",
            taken: false,
          },
          {
            intakeId: "4",
            intakeRef: "123",
            dateTime: "2025-02-08T00:47:00",
            taken: false,
          },
          {
            intakeId: "5",
            intakeRef: "123",
            dateTime: "2025-02-08T12:47:00",
            taken: false,
          },
          {
            intakeId: "6",
            intakeRef: "123",
            dateTime: "2025-02-09T00:47:00",
            taken: false,
          },
          {
            intakeId: "7",
            intakeRef: "123",
            dateTime: "2025-02-09T12:47:00",
            taken: false,
          },
          {
            intakeId: "8",
            intakeRef: "123",
            dateTime: "2025-02-10T00:47:00",
            taken: false,
          },
          {
            intakeId: "9",
            intakeRef: "123",
            dateTime: "2025-02-10T12:47:00",
            taken: false,
          },
          {
            intakeId: "10",
            intakeRef: "123",
            dateTime: "2025-02-11T00:47:00",
            taken: false,
          },
          {
            intakeId: "11",
            intakeRef: "123",
            dateTime: "2025-02-11T12:47:00",
            taken: false,
          },
          {
            intakeId: "12",
            intakeRef: "123",
            dateTime: "2025-02-12T00:47:00",
            taken: false,
          },
          {
            intakeId: "13",
            intakeRef: "123",
            dateTime: "2025-02-12T12:47:00",
            taken: false,
          },
          {
            intakeId: "14",
            intakeRef: "123",
            dateTime: "2025-02-13T00:47:00",
            taken: false,
          },
          {
            intakeId: "15",
            intakeRef: "123",
            dateTime: "2025-02-13T12:47:00",
            taken: false,
          },
          {
            intakeId: "16",
            intakeRef: "123",
            dateTime: "2025-02-14T00:47:00",
            taken: false,
          },
          {
            intakeId: "17",
            intakeRef: "123",
            dateTime: "2025-02-14T12:47:00",
            taken: false,
          },
          {
            intakeId: "18",
            intakeRef: "123",
            dateTime: "2025-02-15T00:47:00",
            taken: false,
          },
          {
            intakeId: "19",
            intakeRef: "123",
            dateTime: "2025-02-15T12:47:00",
            taken: false,
          },
          {
            intakeId: "20",
            intakeRef: "123",
            dateTime: "2025-02-16T00:47:00",
            taken: false,
          },
          {
            intakeId: "21",
            intakeRef: "123",
            dateTime: "2025-02-16T12:47:00",
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
        dateTime: "2025-02-06T00:47:01",
        quantity: "10",
        withFoodWater: false,
        active: true,
        intakeRef: "1234",
        intake: [
          {
            intakeId: "0",
            intakeRef: "1234",
            dateTime: "2025-02-06T00:47:00",
            taken: false,
          },
          {
            intakeId: "1",
            intakeRef: "1234",
            dateTime: "2025-02-06T08:47:00",
            taken: false,
          },
          {
            intakeId: "2",
            intakeRef: "1234",
            dateTime: "2025-02-06T16:47:00",
            taken: false,
          },
          {
            intakeId: "3",
            intakeRef: "1234",
            dateTime: "2025-02-07T00:47:00",
            taken: false,
          },
          {
            intakeId: "4",
            intakeRef: "1234",
            dateTime: "2025-02-07T08:47:00",
            taken: false,
          },
          {
            intakeId: "5",
            intakeRef: "1234",
            dateTime: "2025-02-07T16:47:00",
            taken: false,
          },
          {
            intakeId: "6",
            intakeRef: "1234",
            dateTime: "2025-02-08T00:47:00",
            taken: false,
          },
          {
            intakeId: "7",
            intakeRef: "1234",
            dateTime: "2025-02-08T08:47:00",
            taken: false,
          },
          {
            intakeId: "8",
            intakeRef: "1234",
            dateTime: "2025-02-09T00:47:00",
            taken: false,
          },
          {
            intakeId: "9",
            intakeRef: "1234",
            dateTime: "2025-02-09T08:47:00",
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
        dateTime: "2025-02-06T00:47:02",
        quantity: "10",
        withFoodWater: true,
        active: true,
        intakeRef: "12345",
        intake: [
          {
            intakeId: "0",
            intakeRef: "12345",
            dateTime: "2025-02-06T00:47:00",
            taken: false,
          },
          {
            intakeId: "1",
            intakeRef: "12345",
            dateTime: "2025-02-06T08:47:00",
            taken: false,
          },
          {
            intakeId: "2",
            intakeRef: "12345",
            dateTime: "2025-02-06T16:47:00",
            taken: false,
          },
          {
            intakeId: "3",
            intakeRef: "12345",
            dateTime: "2025-02-07T00:47:00",
            taken: false,
          },
          {
            intakeId: "4",
            intakeRef: "12345",
            dateTime: "2025-02-07T08:47:00",
            taken: false,
          },
          {
            intakeId: "5",
            intakeRef: "12345",
            dateTime: "2025-02-07T16:47:00",
            taken: false,
          },
          {
            intakeId: "6",
            intakeRef: "12345",
            dateTime: "2025-02-08T00:47:00",
            taken: false,
          },
          {
            intakeId: "7",
            intakeRef: "12345",
            dateTime: "2025-02-08T08:47:00",
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
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Enable Autosave</Text>
          <Switch value={autosave} onValueChange={handleAutosaveSwitch} />
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  switchText: {
    fontFamily: "outfit",
    fontSize: 16,
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
