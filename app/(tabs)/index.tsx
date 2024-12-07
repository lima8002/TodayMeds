import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { format, isSameDay } from "date-fns";
import { IconSymbol } from "@/components/ui/IconSymbol";

type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  dateTime: string;
  quantity: string;
  withFoodWater: boolean;
};

type DoseSchedule = {
  medication: Medication;
  doseTime: Date;
};

export default function MainScreen() {
  const [todaySchedule, setTodaySchedule] = useState<DoseSchedule[]>([]);
  const router = useRouter();

  const fetchMedications = useCallback(async () => {
    try {
      const medicationsJSON = await AsyncStorage.getItem("medications");
      if (medicationsJSON) {
        const fetchedMedications: Medication[] = JSON.parse(medicationsJSON);
        calculateTodaySchedule(fetchedMedications);
      }
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  }, []);

  const calculateTodaySchedule = useCallback((meds: Medication[]) => {
    const today = new Date();
    const todaySchedule: DoseSchedule[] = [];

    meds.forEach((med) => {
      const startDateTime = new Date(med.dateTime);
      const frequencyHours = parseInt(med.frequency);

      let doseTime = new Date(startDateTime);
      while (doseTime < new Date(today.setHours(23, 59, 59, 999))) {
        if (isSameDay(doseTime, today)) {
          todaySchedule.push({ medication: med, doseTime });
        }
        doseTime = new Date(
          doseTime.getTime() + frequencyHours * 60 * 60 * 1000
        );
      }
    });

    setTodaySchedule(
      todaySchedule.sort((a, b) => a.doseTime.getTime() - b.doseTime.getTime())
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMedications();
    }, [fetchMedications])
  );

  const handleAddMedication = () => {
    router.push("/(meds)/add");
  };

  const handleMarkAsTaken = (dose: DoseSchedule) => {
    // Implement mark as taken functionality
    console.log("Mark as taken:", dose);
    Alert.alert(
      "Marked as Taken",
      `${dose.medication.name} has been marked as taken.`
    );
  };

  const renderDoseItem = useCallback(
    ({ item }: { item: DoseSchedule }) => (
      <View style={styles.doseItem}>
        <Text style={styles.doseTime}>{format(item.doseTime, "HH:mm")}</Text>
        <View style={styles.doseDetails}>
          <Text style={styles.doseMedication}>
            {item.medication.name} ({item.medication.dosage})
          </Text>
          <Text style={styles.doseInstructions}>
            {item.medication.withFoodWater
              ? "Take with food/water"
              : "Take as directed"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.markAsTakenButton}
          onPress={() => handleMarkAsTaken(item)}
        >
          <Text style={styles.markAsTakenText}>Take</Text>
        </TouchableOpacity>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Today's Schedule</Text>
      <FlatList
        data={todaySchedule}
        renderItem={renderDoseItem}
        keyExtractor={(item, index) => `${item.medication.id}-${index}`}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No medications scheduled for today.
          </Text>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
        <IconSymbol name="plus.circle.fill" size={56} color="#007AFF" />
      </TouchableOpacity>
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
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  doseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  doseTime: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
    color: "#007AFF",
  },
  doseDetails: {
    flex: 1,
  },
  doseMedication: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  doseInstructions: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  markAsTakenButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  markAsTakenText: {
    color: "white",
    fontWeight: "500",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
