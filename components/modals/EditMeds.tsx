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
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import MedicationForm from "@/components/meds/MedicationForm";
import CustomHeader from "@/components/ui/CustomHeader";

interface ModalProps {
  id: string;
  isVisible: boolean;
  onClose: () => void;
}

function EditMeds({ id, isVisible, onClose }: ModalProps) {
  const { medications, updateMedication } = useGlobalContext();
  const [currentId] = useState<string>(id.toString());
  const medication = medications.find((med) => med.id === id);

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = (medicationData: any) => {
    updateMedication(currentId, medicationData);
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

  if (!medication) {
    return (
      <View>
        <Text>Medication not found</Text>
      </View>
    );
  }

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
          onSubmit={() => handleSubmit(medication)}
          submitButtonText="Update Medication"
        />
      </View>
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
