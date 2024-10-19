// DateTimeModal.js
import React, { useState } from "react";
import {
  View,
  Button,
  Modal,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../ui/CustomButton";
import { Colors } from "@/constants/Colors";

const { height } = Dimensions.get("window");

const DateTimeModal = ({ visible, onClose, onDateSelected }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // Hide the picker after selection
    setDate(currentDate); // Update the selected time
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    // Hide the picker after selection
    setTime(currentTime); // Update the selected time
  };

  const handleConfirm = () => {
    let quarter;
    if (time.getMinutes() < 15) {
      quarter = 0;
    } else if (time.getMinutes() < 30) {
      quarter = 15;
    } else if (time.getMinutes() < 45) {
      quarter = 30;
    } else {
      quarter = 45;
    }
    onDateSelected(
      `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}  ${time
        .getHours()
        .toString()
        .padStart(2, "0")}:${quarter.toString().padStart(2, "0")}`
    );
    // setTime(new Date())
    // setDate(new Date())
    onClose(); // Close the modal after selecting the hour
  };

  const onIOS = () => {
    return (
      <Modal animationType="slice" transparent={true} visible={visible}>
        <View
          style={[
            styles.modalContainer,
            styles.shadow,
            { height: height * 0.35 },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.header}>Select Time: </Text>

            <RNDateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              onChange={onTimeChange}
              minuteInterval={15}
              themeVariant="light"
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.header}>Select Date: </Text>
            <RNDateTimePicker
              value={date}
              mode="date" // Mode can be 'date', 'time', or 'datetime'
              is24Hour={true} // Use 24-hour format
              onChange={onDateChange}
              themeVariant="light"
            />
          </View>
          {/* <View style={[styles.containerBody, { justifyContent:"space-between" }]}>
          <Text style={styles.fieldName}>Date/Time </Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            styles={styles.otherStyles}
          >
            <TextInput
              placeholder={"Date/Time"}
              style={[styles.containerTextInput]}
              onChangeText={(text) => setTime(text)}
              value={time}
              onPressIn={() => setOpen(true)}
              onEditable={false}
            /> */}
          {/* <DatePicker
                  modal
                  open={open}
                  date={date}
                  minuteInterval={15}
                  onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                    formatDtSt = format(date, "dd/MM/yyyy");
                    formatTmSt = format(date, "h:mm a");
                    setTime("Date: " + formatDtSt + " Time: " + formatTmSt);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                /> */}
          {/* </TouchableOpacity>
        </View> */}

          <CustomButton text="Confirm" onPress={handleConfirm} />
          <CustomButton text="Close" onPress={onClose} />
        </View>
      </Modal>
    );
  };

  const onAndroid = () => {
    return (
      // <Modal animationType="slice" transparent={true} visible={visible}>
      // <View style={[styles.modalContainer, { height: height * 0.48 }]}>
      //   <Text style={styles.header}>Select Date and Time</Text>
      <>
        {showTime && (
          <RNDateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            onChange={onTimeChange}
            minuteInterval={45}
            themeVariant="light"
          />
        )}
        {showDate && (
          <RNDateTimePicker
            value={date}
            mode="date" // Mode can be 'date', 'time', or 'datetime'
            is24Hour={true} // Use 24-hour format
            onChange={onDateChange}
            themeVariant="light"
            onClose={onClose}
          />
        )}
      </>
      // {/* <View style={[styles.containerBody, { justifyContent:"space-between" }]}>
      //   <Text style={styles.fieldName}>Date/Time </Text>
      //   <TouchableOpacity
      //     onPress={() => setOpen(true)}
      //     styles={styles.otherStyles}
      //   >
      //     <TextInput
      //       placeholder={"Date/Time"}
      //       style={[styles.containerTextInput]}
      //       onChangeText={(text) => setTime(text)}
      //       value={time}
      //       onPressIn={() => setOpen(true)}
      //       onEditable={false}
      //     /> */}
      // {/* <DatePicker
      //           modal
      //           open={open}
      //           date={date}
      //           minuteInterval={15}
      //           onConfirm={(date) => {
      //             setOpen(false);
      //             setDate(date);
      //             formatDtSt = format(date, "dd/MM/yyyy");
      //             formatTmSt = format(date, "h:mm a");
      //             setTime("Date: " + formatDtSt + " Time: " + formatTmSt);
      //           }}
      //           onCancel={() => {
      //             setOpen(false);
      //           }}
      //         /> */}
      // {/* </TouchableOpacity>
      // </View> */}

      // {/* </View> */}
      // </Modal>
    );
  };

  return Platform.OS === "ios" ? onIOS() : onAndroid();
};

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
  header: {
    fontSize: 18,
    marginBottom: 20,
  },
  selectedText: {
    marginVertical: 10,
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

export default DateTimeModal;
