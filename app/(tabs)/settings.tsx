import CustomHeader from "@/components/ui/CustomHeader";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/FirebaseConfig";
import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";

export default function SettingsScreen() {
  return (
    <View>
      <CustomHeader title={"Settings"} />

      <View style={[styles.signoutBtn, styles.shadow]}>
        <CustomButton
          style={{ width: "50%" }}
          text="Log Out"
          onPress={() => signOut(auth)}
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
