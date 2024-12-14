import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomHeader from "@/components/ui/CustomHeader";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomFloatButton from "@/components/ui/CustomFloatButton";

const MedicationsScreen = () => {
  const { medications } = useGlobalContext();
  const router = useRouter();

  const renderMedicationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.medicationItem}
      onPress={() => router.push(`/edit?id=${item.id}`)}
    >
      <View style={styles.medicationContent}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <Text style={styles.medicationDetails}>
          Dosage: {item.dosage}, Frequency: Every {item.frequency} hours
        </Text>
        <Text style={styles.medicationDetails}>
          Quantity: {item.quantity}, With Food/Water:{" "}
          {item.withFoodWater ? "Yes" : "No"}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="Medications" />
      <FlatList
        data={medications}
        renderItem={renderMedicationItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No medications added yet.</Text>
        }
      />
      <CustomFloatButton />
    </View>
  );
};

export default MedicationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  medicationContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  medicationDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
