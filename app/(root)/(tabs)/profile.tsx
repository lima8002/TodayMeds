import CustomHeader from "@/components/ui/CustomHeader";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function ProfileScreen() {
  const medsToLoad = [
    {
      id: "1738346162529",
      name: "Test",
      dosage: "1",
      frequency: 2,
      dateTime: "2025-01-31T17:55:39.978Z",
      quantity: "20",
      withFoodWater: true,
      active: true,
      intake: [
        {
          dateTime: "2025-01-31T17:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-01-31T19:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-01-31T21:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-01-31T23:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T01:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T03:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T05:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T07:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T09:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T11:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T13:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T15:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T17:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T19:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T21:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T23:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-02T01:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-02T03:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-02T05:55:39.978Z",
          taken: false,
        },
        {
          dateTime: "2025-02-02T07:55:39.978Z",
          taken: false,
        },
      ],
    },
    {
      id: "1738346259644",
      name: "Test 2",
      dosage: "2",
      frequency: 3,
      dateTime: "2025-01-31T17:57:20.491Z",
      quantity: "16",
      withFoodWater: true,
      active: true,
      intake: [
        {
          dateTime: "2025-01-31T17:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-01-31T20:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-01-31T23:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T02:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T05:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T08:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T11:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T14:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T17:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T20:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-01T23:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-02T02:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-02T05:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-02T08:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-02T11:57:20.491Z",
          taken: false,
        },
        {
          dateTime: "2025-02-02T14:57:20.491Z",
          taken: false,
        },
      ],
    },
  ];

  const { letUserSignOut } = useGlobalContext();
  return (
    <View>
      <CustomHeader title={"Profile"} />

      <View style={[styles.signoutBtn, styles.shadow]}>
        <CustomButton
          text="Log Out"
          onPress={() => letUserSignOut()}
          type="SECONDARY"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
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
