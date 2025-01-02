import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import MedicationForm from "@/components/meds/MedicationForm";
import CustomHeader from "@/components/ui/CustomHeader";
import { Colors } from "@/constants/Colors";
import CustomFloatButton from "@/components/ui/CustomFloatButton";

const EditMedicationScreen = () => {
  const { id } = useLocalSearchParams();
  const { medications, updateMedication } = useGlobalContext();

  const medication = medications.find((med) => med.id === id);

  const handleSubmit = (updatedMedication) => {
    // updateMedication(id, updatedMedication);
    // Navigate back or show success message
  };

  if (!medication) {
    return (
      <View>
        <Text>Medication not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Edit Medication" />
      <CustomFloatButton type="CLOSE" />
      <MedicationForm
        initialValues={medication}
        onSubmit={handleSubmit}
        submitButtonText="Update Medication"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDDISABLED,
  },
});

export default EditMedicationScreen;
