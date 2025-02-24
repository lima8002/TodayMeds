import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";
import MedicationForm from "@/components/meds/MedicationForm";
import CustomHeader from "@/components/ui/CustomHeader";
import { StatusBar } from "expo-status-bar";

interface ModalProps {
  id: string;
  isVisible: boolean;
  onClose: () => void;
}

function EditMeds({ id, isVisible, onClose }: ModalProps) {
  const { medications, updateMedication } = useGlobalContext();
  const [needNewIntake, setNeedNewIntake] = useState<boolean>(false);
  const [currentId] = useState<string>(id.toString());
  const medication = medications.find((med) => med.id === id);

  if (!medication) {
    return (
      <View>
        <Text>Medication not found</Text>
      </View>
    );
  }

  const handleClose = () => {
    onClose();
  };

  const handleUpdateMedication = (medicationData: any) => {
    if (
      medication.dosage !== medicationData.dosage ||
      medication.frequency !== medicationData.frequency ||
      medication.dateTime !== medicationData.dateTime ||
      medication.quantity !== medicationData.quantity
    ) {
      showAlertNewIntake(medicationData);
    } else {
      updateMedication(currentId, medicationData);
      showAlertMedUpdated();
    }
  };

  const handleCreateNewIntake = (medicationData: any) => {
    updateMedication(currentId, medicationData, "newIntake");
    showAlertMedUpdated();
  };

  const showAlertNewIntake = (medicationData: any) => {
    Alert.alert(
      "New Intake Required",
      "If you taken any medication, make sure to update your intake.",
      [
        {
          text: "OK",
          onPress: () => handleCreateNewIntake(medicationData),
        },
      ]
    );
  };

  const showAlertMedUpdated = () => {
    Alert.alert(
      "Medication Updated",
      "Your medication has been successfully Updated!",
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
        <CustomHeader title="Edit Medication" />
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
          initialValues={medication}
          onSubmit={handleUpdateMedication}
          submitButtonText="Update Medication"
        />
      </View>
      <StatusBar hidden={true} />
    </Modal>
  );
}

export default EditMeds;

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
