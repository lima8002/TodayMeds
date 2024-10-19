import React, { useState } from "react";
import {
  View,
  Modal,
  Button,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "@/constants/Colors";
import CustomButton from "../ui/CustomButton";

const { height } = Dimensions.get("window");

const IntervalModal = ({
  visible,
  onClose,
  onHourSelected,
  onTextSelected,
}) => {
  const [selectedHour, setSelectedHour] = useState(12);

  const handleConfirm = () => {
    onHourSelected(selectedHour);
    onTextSelected(
      "Every " +
        (selectedHour == 1 ? selectedHour + " hour" : selectedHour + " hours")
    );
    onClose(); // Close the modal after selecting the hour
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={[
          styles.modalContainer,
          styles.shadow,
          { height: height * 0.38 },
        ]}
      >
        <Picker
          selectedValue={selectedHour}
          style={styles.pickerStyle}
          onValueChange={(itemValue) => setSelectedHour(itemValue)}
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

        <CustomButton text="Confirm" onPress={handleConfirm} />
        <CustomButton text="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default IntervalModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    position: "absolute",
    left: 0,
    right: 0,
    marginHorizontal: 10,
    bottom: "3%",
    borderRadius: 20,
  },
  pickerStyle: {
    height: "69%",
    width: "95%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "lightgray",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  shadow: {
    shadowColor: Colors.GRAY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
});
