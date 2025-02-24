import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomButton from "@/components/ui/CustomButton";
import DatePicker from "react-native-date-picker";
import { StatusBar } from "expo-status-bar";

type EditProfileModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onDateChange: (date: Date | undefined) => void;
  date: Date;
  name: string;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isVisible,
  onClose,
  date,
  onDateChange,
}) => {
  const { userDB, updateUser } = useGlobalContext();
  const [name, setName] = useState<string>();

  useEffect(() => {
    setName(userDB?.name || "");
  }, [userDB]);

  const handleSavePress = () => {
    if (!name || !date) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields",
        [
          {
            text: "Ok",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
      return;
    }

    // Implement save logic here
    console.log("Save button pressed:", { name, date });

    updateUser(userDB?.email || "", {
      ...userDB,
      name,
      dob: date.toISOString(),
    });
    onClose();
  };

  const handleCancelPress = () => {
    setName(userDB?.name);
    onClose();
    console.log("Cancel button pressed");
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Date of Birth:</Text>

            <View style={styles.datePicker}>
              <DatePicker
                date={date}
                onDateChange={(date) => onDateChange(date)}
                mode="date"
                theme={"light"}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              text="Save"
              type="PRIMARY"
              onPress={handleSavePress}
              otherStyles={{ marginVertical: 10 }}
            />

            <CustomButton
              text="Cancel"
              type="SECONDARY"
              onPress={handleCancelPress}
              otherStyles={{ marginVertical: 10 }}
            />
          </View>
        </View>
      </View>
      <StatusBar hidden={true} />
    </Modal>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  modalContent: {
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: Colors.BACKGROUNDDISABLED,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,

    height: "68%",
  },
  modalTitle: {
    paddingVertical: 10,
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 18 : 20,
    color: Colors.TEXT,
  },
  containerProfile: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BORDERDISABLED,
    padding: 10,
  },
  card: {
    height: Platform.OS === "ios" ? "62%" : "60%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "outfit-medium",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 50,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "outfit",
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  text: {
    color: "#333",
    paddingTop: 12,
  },
  datePicker: {
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },

  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
  },
});
