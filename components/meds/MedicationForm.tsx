import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import CustomButton from "../ui/CustomButton";
import CustomInput from "../ui/CustomInput";

interface MedicationFormProps {
  initialValues?: {
    name: string;
    dosage: string;
    frequency: string;
    dateTime: Date;
    quantity: string;
    withFoodWater: boolean;
  };
  onSubmit: (medication: any) => void;
  submitButtonText: string;
}

export default function MedicationForm({
  initialValues,
  onSubmit,
  submitButtonText,
}: MedicationFormProps) {
  const [name, setName] = useState(initialValues?.name || "");
  const [dosage, setDosage] = useState(initialValues?.dosage || "");
  const [frequency, setFrequency] = useState(initialValues?.frequency || "");
  const [dateTime, setDateTime] = useState(
    initialValues?.dateTime || new Date()
  );
  const [quantity, setQuantity] = useState(initialValues?.quantity || "");
  const [withFoodWater, setWithFoodWater] = useState(
    initialValues?.withFoodWater || false
  );
  const [formattedDT, setFormattedDT] = useState(
    !!initialValues?.dateTime || ""
  );

  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);
  const [selectedDosage, setSelectedDosage] = useState<string | null>(null);
  const [otherDosage, setOtherDosage] = useState<string | null>(null);
  const [showFrequencyPicker, setShowFrequencyPicker] = useState(false);
  const [tempFrequency, setTempFrequency] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues?.dosage) {
      if (["1", "2", "3"].includes(initialValues.dosage)) {
        setSelectedDosage(initialValues.dosage);
      } else {
        setSelectedDosage("Other");
        setOtherDosage(initialValues.dosage);
      }
    }
    console.log(initialValues);
  }, [initialValues]);

  const handleSubmit = () => {
    const finalDosage =
      selectedDosage === "Other" ? otherDosage : selectedDosage;
    const medicationData = {
      id: Date.now().toString(),
      name,
      dosage: finalDosage,
      frequency,
      dateTime: dateTime,
      quantity,
      withFoodWater,
    };
    onSubmit(medicationData);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        {/* Medication Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medication Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter medication name"
            placeholderTextColor={Colors.DARKGRAY}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Pill/Tablet per Intake */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pill/Tablet per Intake</Text>
          <View style={styles.dosageContainer}>
            {["1", "2", "3", "Other"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.dosageOption,
                  selectedDosage === option && styles.selectedDosageOption,
                ]}
                onPress={() => {
                  if (selectedDosage === option) {
                    setSelectedDosage(null);
                  } else {
                    setSelectedDosage(option);
                    if (option !== "Other") {
                      setOtherDosage("");
                    }
                  }
                }}
              >
                <View style={styles.checkboxWrapper}>
                  <View
                    style={[
                      styles.checkbox,
                      selectedDosage === option && styles.checkedCheckbox,
                    ]}
                  >
                    {selectedDosage === option && (
                      <View style={styles.checkboxInner} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.dosageOptionText,
                      selectedDosage === option
                        ? styles.selectedDosageOptionText
                        : null,
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {selectedDosage === "Other" && (
            <TextInput
              placeholder="e.g., 5"
              value={otherDosage || ""}
              onChangeText={setOtherDosage}
              keyboardType="numeric"
              style={{ paddingTop: 15 }}
            />
          )}
        </View>

        {/* Frequency */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Frequency Hours</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowFrequencyPicker(true)}
          >
            {frequency ? (
              <Text style={styles.text}>
                Every {frequency} hour{parseInt(frequency) > 1 ? "s" : ""}
              </Text>
            ) : (
              <Text style={styles.textDisabled}>e.g., Every 4 hours</Text>
            )}
          </TouchableOpacity>
        </View>

        <Modal
          visible={showFrequencyPicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalPickerContainer}>
            <View style={styles.pickerContainer}>
              {/* <Picker
                selectedValue={tempFrequency}
                onValueChange={(itemValue) => setTempFrequency(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select frequency" value="" />
                {[...Array(24)].map((_, i) => (
                  <Picker.Item
                    key={i + 1}
                    label={`Every ${i + 1} hour${i === 0 ? "" : "s"}`}
                    value={(i + 1).toString()}
                  />
                ))}
              </Picker> */}
              <Picker
                selectedValue={tempFrequency}
                style={styles.picker}
                onValueChange={(itemValue) => setTempFrequency(itemValue)}
              >
                {Array.from({ length: 23 }, (_, i) => i + 1).map((number) => (
                  <Picker.Item
                    key={number}
                    label={
                      number == 1
                        ? number.toString() + " hour"
                        : number.toString() + " hours"
                    }
                    value={number}
                  />
                ))}
              </Picker>
              <View style={styles.buttonPickerContainer}>
                <CustomButton
                  type="PRIMARY"
                  text="Confirm"
                  onPress={() => {
                    if (tempFrequency != null) {
                      setFrequency(tempFrequency);
                    }
                    setShowFrequencyPicker(false);
                  }}
                />
                <CustomButton
                  type="TERTIARY"
                  text="Cancel"
                  onPress={() => setShowFrequencyPicker(false)}
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* Date and Time */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date and Time</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setOpenDateTimePicker(true)}
          >
            <Text style={formattedDT ? styles.text : styles.textDisabled}>
              {formattedDT ? null : "e.g., "}
              {dateTime.toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDateTimePicker}
            date={dateTime}
            minuteInterval={15}
            onConfirm={(date) => {
              setOpenDateTimePicker(false);
              setDateTime(date);
              setFormattedDT(
                date.toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              );
            }}
            onCancel={() => {
              setOpenDateTimePicker(false);
              setFormattedDT("");
            }}
            mode="datetime"
          />
        </View>

        {/* Box Quantity */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Box Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 30"
            placeholderTextColor={Colors.DARKGRAY}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
        </View>

        {/* Take with food/water */}
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxBorder}>
            <Checkbox
              status={withFoodWater ? "checked" : "unchecked"}
              onPress={() => setWithFoodWater(!withFoodWater)}
            />
          </View>
          <TouchableOpacity onPress={() => setWithFoodWater(!withFoodWater)}>
            <Text style={styles.checkboxLabel}>Take with food/water</Text>
          </TouchableOpacity>
        </View>

        {/* Add Medication Button */}
        <CustomButton text={submitButtonText} onPress={handleSubmit} />
      </View>
    </ScrollView>
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
    // paddingHorizontal: 20,
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
    marginHorizontal: 10,
    marginVertical: 10,
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
    fontFamily: "outfit",
    backgroundColor: "#f9f9f9",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxBorder: {
    borderWidth: Platform.OS === "ios" ? 1 : 0,
    borderColor: Colors.LIGHTGRAY,
    borderRadius: 4,
    overflow: "hidden",
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
  dosageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  dosageOption: {
    height: 50,
    width: "24%",
    borderWidth: 1,
    borderColor: Colors.BORDERDISABLED,
    borderRadius: 10,
    padding: 10,

    backgroundColor: Colors.BACKGROUNDDISABLED,
  },
  selectedDosageOption: {
    borderColor: Colors.TERTIARY,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.LIGHTGRAY,
    marginRight: 5,
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    borderColor: Colors.TERTIARY,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.PRIMARY,
  },
  dosageOptionText: {
    marginTop: 3,
    color: Colors.DARKGRAY,
    fontFamily: "outfit-medium",
  },
  selectedDosageOptionText: {
    color: "black",
  },
  otherDosageInput: {
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },

  modalPickerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    overflow: "scroll",
  },
  pickerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    fontSize: 16,
    color: "#333",
    paddingTop: 12,
    fontFamily: "outfit",
  },
  textDisabled: {
    fontSize: 16,
    color: Colors.DARKGRAY,
    paddingTop: 12,
    fontFamily: "outfit",
  },
  buttonPickerContainer: {
    // flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonPicker: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: Colors.PRIMARY,
  },
  buttonPickerText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "outfit-medium",
  },
});
