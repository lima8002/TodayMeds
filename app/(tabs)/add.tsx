import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddMedicationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Medication</Text>
      {/* Add form components here */}
    </SafeAreaView>
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
});
