import CustomHeader from "@/components/ui/CustomHeader";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AgendaScreen() {
  return (
    <View>
      <CustomHeader title={"Agenda"} />
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
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});
