import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
} from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { onAddNewMedToDB } from "@/utils/FirebaseHelper";
import { MedsDB } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/ui/CustomButton";
import CustomHeader from "@/components/ui/CustomHeader";

import Profile from "@/assets/icons/person90.png";
import RandomPhoto from "@/assets/images/profile1.png";
import RandomPhoto3 from "@/assets/images/pexels-olly-3763188.jpg";

export default function ProfileScreen() {
  const {
    letUserSignOut,
    deleteMedication,
    user,
    userDB,
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

  const imageURI =
    "https://firebasestorage.googleapis.com/v0/b/chatdc-be5f6.appspot.com/o/profile1.png?alt=media&token=f0952d92-d37f-414c-bab0-edefb7598fbd";

  return (
    <View style={styles.container}>
      <CustomHeader title={"Profile"} />
      <ScrollView>
        <View style={styles.containerProfile}>
          <View
            style={{
              // paddingHorizontal: 20,
              // paddingVertical: 10,
              position: "absolute",
              left: "4%",
              top: "-20%",
            }}
          >
            <Image
              resizeMode="cover"
              style={{
                borderRadius: 50,
                width: 100,
                height: 100,
                borderColor: Colors.BORDERDISABLED,
                borderWidth: 2,
              }}
              // source={{ uri: imageURI }}
              source={RandomPhoto}
            />
          </View>
          <View
            style={{
              paddingTop: 10,
              paddingLeft: "30%",
            }}
          >
            <Text
              style={[
                styles.profileText,
                { fontFamily: "outfit-bold", fontSize: 20 },
              ]}
            >
              {userDB?.name}
            </Text>
            <Text style={styles.profileText}>Email: {userDB?.email}</Text>
            <Text style={styles.profileText}>Date of Birth: {userDB?.dob}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 10,
            }}
          >
            <CustomButton
              type={"ICON"}
              icon={"edit"}
              iconColor={Colors.PRIMARY}
              otherStyles={{
                width: "40%",
                borderColor: Colors.PRIMARY,
                borderWidth: 1,
                padding: 5,
                flexDirection: "row",
              }}
              onPress={() => {}}
            />
          </View>
        </View>
        <View style={styles.containerBtn}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Enable Autosave</Text>
            <Switch value={autosave} onValueChange={handleAutosaveSwitch} />
          </View>
          <View style={{ width: "60%", alignSelf: "center" }}>
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
          </View>
        </View>

        <View style={[styles.signoutBtn, styles.shadow]}>
          <CustomButton
            text="Log Out"
            onPress={() => letUserSignOut()}
            type="SECONDARY"
          />
          <CustomButton
            type="SECONDARY"
            text="Delete Account"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_100,
    paddingHorizontal: 16,
  },
  containerProfile: {
    flex: 1,
    height: "40%",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BORDERDISABLED,
    marginBottom: 10,
    marginTop: 40,
  },
  profileText: {
    fontFamily: "outfit",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  containerBtn: {
    flex: 1,
    height: "40%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    paddingBottom: 24,
  },

  title: {
    fontSize: 18,
    fontFamily: "outfit-medium",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  switchText: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  signoutBtn: {
    paddingTop: 20,
    marginHorizontal: 20,
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
