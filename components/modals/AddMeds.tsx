// add.tsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomHeader from "@/components/ui/CustomHeader";
import MedicationForm from "@/components/meds/MedicationForm";
import { StatusBar } from "expo-status-bar";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

function AddMeds({ isVisible, onClose }: ModalProps) {
  const { addMedication } = useGlobalContext();

  const handleClose = () => {
    onClose();
  };

  const handleAddMedication = (medicationData: any) => {
    addMedication(medicationData);
    Alert.alert(
      "Medication Added",
      "Your medication has been successfully added!",
      [
        {
          text: "OK",
          onPress: handleClose,
        },
      ]
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
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
      <StatusBar hidden={true} />
    </Modal>
  );
}

export default AddMeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.BACKGROUND_100,
    backgroundColor: "#fff",
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
