import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

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
  const [medications, setMedications] = useState([]);

  const fetchMedications = useCallback(async () => {
    try {
      const medicationsJSON = await AsyncStorage.getItem("medications");
      if (medicationsJSON) {
        setMedications(JSON.parse(medicationsJSON));
      }
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMedications();
    }, [fetchMedications])
  );

  const renderItem = useCallback(
    ({ item }) => <MedicationItem item={item} />,
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TodayMeds</Text>
      {medications.length > 0 ? (
        <FlatList
          data={medications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.placeholderText}>No medications found.</Text>
      )}
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
  placeholderText: {
    fontSize: 16,
    fontFamily: "outfit",
    textAlign: "center",
    color: "#888",
  },
});
