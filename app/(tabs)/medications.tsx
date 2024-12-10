import AddMedication from "@/components/ui/CustomFloatButton";
import CustomHeader from "@/components/ui/CustomHeader";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MedicationsScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader title={"Medications"} />
      <AddMedication />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});
