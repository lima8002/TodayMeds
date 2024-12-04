import React, { useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample data (replace this with your actual data source)
const medications = [
  {
    id: "1",
    name: "Aspirin",
    dosage: "500mg",
    frequency: "Once daily",
    time: "8:00 AM",
  },
  {
    id: "2",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Twice daily",
    time: "9:00 AM, 9:00 PM",
  },
  {
    id: "3",
    name: "Metformin",
    dosage: "1000mg",
    frequency: "With meals",
    time: "Breakfast, Dinner",
  },
];

const MedicationItem = ({ item }) => (
  <View style={styles.medicationItem}>
    <Text style={styles.medicationName}>{item.name}</Text>
    <Text style={styles.medicationInfo}>
      {item.dosage} - {item.frequency}
    </Text>
    <Text style={styles.medicationInfo}>Time: {item.time}</Text>
  </View>
);

export default function MainScreen() {
  const renderItem = useCallback(
    ({ item }) => <MedicationItem item={item} />,
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TodayMeds</Text>
      <FlatList
        data={medications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  medicationItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationName: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    marginBottom: 5,
  },
  medicationInfo: {
    fontFamily: "outfit",
  },
});
