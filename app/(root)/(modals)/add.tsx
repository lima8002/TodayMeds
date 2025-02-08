import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import CustomHeader from "@/components/ui/CustomHeader";
import MedicationForm from "@/components/meds/MedicationForm";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";

function AddMedicationScreen() {
  const router = useRouter();
  const { addMedication, screenName } = useGlobalContext();

  const handleClose = () => {
    if (screenName === "ADD") {
      router.dismissTo("/");
    } else {
      router.dismissTo("/medication");
    }
  };

  const handleAddMedication = (medicationData: any) => {
    addMedication(medicationData);
    Alert.alert(
      "Medication Added",
      "Your medication has been successfully added!",
      [
        {
          text: "OK",
          onPress: () => {
            handleClose();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Add Medication" />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          handleClose();
        }}
      >
        <Image
          source={require("@/assets/icons/xmark.png")}
          style={styles.closeImage}
        />
      </TouchableOpacity>
      <MedicationForm
        onSubmit={handleAddMedication}
        submitButtonText="Add Medication"
      />
    </View>
  );
}

export default AddMedicationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
