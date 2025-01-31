import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import CustomHeader from "@/components/ui/CustomHeader";
import { useGlobalContext } from "@/context/GlobalProvider";

const MedicationScreen = () => {
  const { medications } = useGlobalContext();
  return (
    <View style={styles.container}>
      <CustomHeader title="Medication" />
      <FlatList
        data={medications}
        renderItem={(item) => (
          <TouchableOpacity style={styles.medicationItem}>
            <Text style={styles.medicationName}>{item.item.name}</Text>
            <Text style={styles.medicationDetails}>
              Dosage: {item.item.dosage}
            </Text>
            <Text style={styles.medicationDetails}>
              Frequency: {item.item.frequency}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  medicationItem: {
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
});

export default MedicationScreen;
