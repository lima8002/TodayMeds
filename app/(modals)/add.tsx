import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomFloatButton from "@/components/ui/CustomFloatButton";
import MedicationForm from "@/components/meds/MedicationForm";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function AddMedicationScreen() {
  const router = useRouter();
  const { addMedication } = useGlobalContext();

  const handleAddMedication = (medicationData: any) => {
    addMedication(medicationData);
    Alert.alert(
      "Medication Added",
      "Your medication has been successfully added!",
      [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Add Medication" />
      <CustomFloatButton type="CLOSE" />
      <MedicationForm
        onSubmit={handleAddMedication}
        submitButtonText="Add Medication"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
