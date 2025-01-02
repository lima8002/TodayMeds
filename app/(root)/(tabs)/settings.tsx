import CustomHeader from "@/components/ui/CustomHeader";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { auth } from "@/utils/FirebaseConfig";
import CustomButton from "@/components/ui/CustomButton";
import { router, Slot } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { SignOutUser } from "@/utils/FirebaseHelper";

export default function SettingsScreen() {
  const { letUserSignOut } = useGlobalContext();
  return (
    <View>
      <CustomHeader title={"Settings"} />

      <View style={[styles.signoutBtn, styles.shadow]}>
        <CustomButton
          // style={{ width: "50%" }}
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
