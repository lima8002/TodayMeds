add.tsx;
import DatePicker from "react-native-date-picker";
import { Checkbox } from "react-native-paper";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddMedicationScreen() {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [quantity, setQuantity] = useState("");
  const [withFoodWater, setWithFoodWater] = useState(false);
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);

  const router = useRouter();

  const handleAddMedication = async () => {
    if (name && dosage && frequency && dateTime && quantity) {
      try {
        // Get existing medications
        const existingMedicationsJSON = await AsyncStorage.getItem(
          "medications"
        );
        let medications = existingMedicationsJSON
          ? JSON.parse(existingMedicationsJSON)
          : [];

        // Add new medication
        const newMedication = {
          id: Date.now().toString(),
          name,
          dosage,
          frequency,
          dateTime: dateTime.toISOString(),
          quantity,
          withFoodWater,
        };
        medications.push(newMedication);

        // Save updated medications
        await AsyncStorage.setItem("medications", JSON.stringify(medications));

        Alert.alert(
          "Medication Added",
          "Your medication has been successfully added!",
          [
            {
              text: "OK",
              onPress: () => {
                resetForm();
                router.push("/");
              },
            },
          ]
        );
      } catch (error) {
        console.error("Error saving medication:", error);
        Alert.alert(
          "Error",
          "There was an error saving your medication. Please try again."
        );
      }
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  const newMedication = {
    id: Date.now().toString(),
    name,
    dosage,
    frequency: `Every ${frequency} hours`,
    dateTime: dateTime.toISOString(),
    quantity,
    withFoodWater,
  };

  const resetForm = () => {
    setName("");
    setDosage("");
    setFrequency("");
    setDateTime(new Date());
    setQuantity("");
    setWithFoodWater(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Medication Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter medication name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dosage</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 500mg"
                value={dosage}
                onChangeText={setDosage}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Frequency (hours)</Text>
              <View style={styles.frequencyContainer}>
                <TextInput
                  style={[styles.input, styles.frequencyInput]}
                  placeholder="e.g., 8"
                  value={frequency.toString()}
                  onChangeText={(text) => {
                    const num = parseInt(text);
                    setFrequency(isNaN(num) ? "" : num);
                  }}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date and Time</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setOpenDateTimePicker(true)}
              >
                <Text style={styles.text}>{dateTime.toLocaleString()}</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={openDateTimePicker}
                date={dateTime}
                minuteInterval={15}
                onConfirm={(date) => {
                  setOpenDateTimePicker(false);
                  setDateTime(date);
                }}
                onCancel={() => {
                  setOpenDateTimePicker(false);
                }}
                mode="datetime"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 30"
                value={quantity}
                onChangeText={setQuantity}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={withFoodWater ? "checked" : "unchecked"}
                onPress={() => setWithFoodWater(!withFoodWater)}
              />
              <TouchableOpacity
                onPress={() => setWithFoodWater(!withFoodWater)}
              >
                <Text style={styles.checkboxLabel}>Take with food/water</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddMedication}
            >
              <Text style={styles.buttonText}>Add Medication</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: "1.5%",
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    marginBottom: 20,
    color: "#333",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
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
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "outfit-regular",
    backgroundColor: "#f9f9f9",
  },
  text: {
    paddingTop: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: "#555",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  frequencyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  frequencyInput: {
    flex: 1,
    marginRight: 10,
  },
});
