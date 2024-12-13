import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomFloatButton from "@/components/ui/CustomFloatButton";
import MedicationForm from "@/components/meds/MedicationForm";
import { GlobalContext } from "@/context/GlobalProvider";

export default function EditMedicationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { medications, updateMedication } = useContext(GlobalContext);
  const [medication, setMedication] = useState(null);

  useEffect(() => {
    const med = medications.find((m) => m.id === id);
    if (med) {
      setMedication(med);
    } else {
      Alert.alert("Error", "Medication not found");
      router.back();
    }
  }, [id, medications]);

  const handleEditMedication = (medicationData: any) => {
    updateMedication(id, medicationData);
    Alert.alert(
      "Medication Updated",
      "Your medication has been successfully updated!",
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

  if (!medication) return null;

  return (
    <View style={styles.container}>
      <CustomHeader title="Edit Medication" />
      <CustomFloatButton type="CLOSE" />
      <MedicationForm
        initialValues={medication}
        onSubmit={handleEditMedication}
        submitButtonText="Update Medication"
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
