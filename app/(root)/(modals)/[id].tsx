import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import MedicationForm from "@/components/meds/MedicationForm";
import CustomHeader from "@/components/ui/CustomHeader";
import { Route } from "expo-router/build/Route";

const EditMedicationScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { medications, updateMedication } = useGlobalContext();
  const [currentId, setCurrentId] = useState<string>(id.toString());
  const medication = medications.find((med) => med.id === id);

  const handleSubmit = (medicationData: any) => {
    // updateMedication(id, updatedMedication);
    // Navigate back or show success message
    console.log("currentId", currentId);
    console.log("medicationData", medicationData);
    updateMedication(currentId, medicationData);
    Alert.alert(
      "Medication Updated",
      "Your medication has been successfully Updated!",
      [
        {
          text: "OK",
          onPress: () => {
            router.dismissTo("/medication");
          },
        },
      ]
    );
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
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          router.dismissTo("/medication");
        }}
      >
        <Image
          source={require("@/assets/icons/xmark.png")}
          style={styles.closeImage}
        />
      </TouchableOpacity>
      <MedicationForm
        initialValues={medication}
        onSubmit={() => handleSubmit(medication)}
        submitButtonText="Update Medication"
      />
    </View>
  );
};

export default EditMedicationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDDISABLED,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  closeImage: {
    marginTop: 3,
    padding: 2,
    width: 28,
    height: 28,
    tintColor: Colors.PRIMARY,
    resizeMode: "contain",
  },
});
