import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomHeader from "../../components/ui/CustomHeader";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomFloatButton from "../../components/ui/CustomFloatButton";
import { Colors } from "../../constants/Colors";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  dateTime: string;
  quantity: string;
  withFoodWater: boolean;
}

const MedicationsScreen = () => {
  const { medications } = useGlobalContext();
  const router = useRouter();

  const renderMedicationItem = ({ item }: { item: Medication }) => (
    <TouchableOpacity
      style={styles.medicationItem}
      onPress={() => router.push(`/(modals)/edit?id=${item.id}`)}
    >
      <View style={styles.medicationContent}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <Text style={styles.medicationDetails}>Dosage: {item.dosage}</Text>
        <Text style={styles.medicationDetails}>
          Frequency: {item.frequency}
        </Text>
        <Text style={styles.medicationDetails}>Quantity: {item.quantity}</Text>
        <Text style={styles.medicationDetails}>
          With Food/Water: {item.withFoodWater ? "Yes" : "No"}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={Colors.PRIMARY} />
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
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,

    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
    marginBottom: 5,
  },
  medicationDetails: {
    fontSize: 14,
    color: "#000",
    marginTop: 2,
    fontFamily: "outfit",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: Colors.DARKGRAY,
    fontFamily: "outfit",
  },
});

export default MedicationsScreen;
