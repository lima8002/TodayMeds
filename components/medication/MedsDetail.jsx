import {
  Alert,
  View,
  Text,
  StyleSheet,
  Platform,
  useWindowDimensions,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import CustomHeader from "../ui/CustomHeader";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";

// firebase helper
import { AddMedToDB } from "@/utils/FirebaseHelper";

// context
import { useGlobalContext, fetchMedsDetails } from "@/context/GlobalProvider";

import DateTimeModal from "./DateTimeModal";
import IntervalModal from "./IntervalModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../constants/Colors";

var i,
  formatDtSt,
  formatTmSt,
  looplimit,
  downloadURL,
  newMed = [
    {
      id: "",
      email: "",
      name: "",
      quantity: "",
      intake: "",
      frequency: "",
      time: "",
      startDate: "",
      startTime: "",
      instructions: "",
      photo: "",
    },
  ],
  intakeDt = [
    {
      medId: "",
      medName: "",
      date: "",
      time: "",
      intake: "",
      instructions: "",
      taken: "",
    },
  ],
  docID = "";

const MedsDetail = ({ setModalVisible }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { width, height } = useWindowDimensions();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const [animating, setAnimating] = useState(false);
  const [btnFreqText, setBtnFreqText] = useState(" ");
  const [dtPikerVisible, setDtPikerVisible] = useState(false);
  const [intPickerVisible, setIntPickerVisible] = useState(false);
  const [namePickerVisible, setNamePickerVisible] = useState(true);
  const [selectedHour, setSelectedHour] = useState(null);
  const [btnDateText, setBtnDateText] = useState(" ");

  const { fetchMedsDetails, user } = useGlobalContext();

  function addIntake(docRef) {
    if (docRef.id.length > 1) {
      try {
        console.log("Got inside ----* ");
        // define the total of repetitions required
        loopLimit = control._formValues.quantity / control._formValues.intake;

        //check if the looplimet has decimals and add 1 to complete the correct amount of records
        if (loopLimit % 1 > 0) {
          return Math.floor(loopLimit + 1);
        }

        // initialize array;
        intakeDt = [];

        // generate the intake data on array
        for (let i = 0; i < loopLimit; i++) {
          intakeDt.push({
            email: userId,
            medId: docRef.id,
            medName: control._formValues.name,
            date: formatDtSt,
            time: formatTmSt,
            intake: control._formValues.intake,
            instructions:
              control._formValues.inst == undefined
                ? " "
                : control._formValues.inst,
            taken: false,
          });
          date.setHours(date.getHours() + freq);
          formatDtSt = format(date, "dd/MM/yyyy");
          formatTmSt = format(date, "h:mm a");
        }
        // add the data to the database
        intakeDt.forEach((data) => {
          firestore()
            .collection("intake")
            .add(data)
            .then((docRef) => {
              console.log("Document added with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    }
  }

  const onSavePressed = async () => {
    try {
      const result = await AddMedToDB(
        user?.email,
        control._formValues.name,
        control._formValues.quantity,
        control._formValues.intake,
        freq,
        date,
        "2024-09-24",
        "12:00",
        control._formValues.inst == undefined ? " " : control._formValues.inst,
        "@.jpg"
      );

      // implement add intake here
      // get the id and generate all intake with the same id
      console.log("Doc id to save intake ", result.id);

      fetchMedsDetails(user?.email);
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <CustomHeader title={"Add Medication"} />

      <ScrollView style={styles.containerScroll}>
        {/* image  */}
        {/* <View style={styles.medPhotoContainer}>
          <ActionSheet
            ref={actionSheet}
            onClose={closeActionSheet}
            containerStyle={{ backgroundColor: "#fff" }}
            overlayColor="rgba(0,0,0,0.7)"
            gestureEnabled={false}
            defaultOverlayOpacity={0.3}
          >
            <View style={styles.viewAS}>
              <CustomButton
                text="Take Photo"
                type={"SECONDARY"}
                style={styles.buttonASOption}
                onPress={onCameraPressed}
              />
              <CustomButton
                text="Open Gallery"
                type={"SECONDARY"}
                style={styles.buttonASOption}
                onPress={onImagePressed}
              />
              <CustomButton
                text="Delete photo"
                type={"SECONDARY"}
                style={styles.buttonASOption}
                onPress={onDeletePhotoPressed}
              />
            </View>
            <View style={styles.viewAS}>
              <CustomButton
                text="Close"
                type={"ALERT"}
                style={styles.buttonASAlert}
                onPress={closeActionSheet}
              />
            </View>
          </ActionSheet>
          <TouchableOpacity onPress={showActionSheet}>
            <Image style={styles.medImage} source={{ uri: photoImg }} />
            {/* <Modal  transparent={true}>
              <View style={styles.modalView}>
                <ActivityIndicator
                  // color={'black'}
                  animating={animating}
                  style={styles.activityIndicator}
                />
              </View>
            </Modal> 
          </TouchableOpacity>
        </View> */}

        {/* Medication name */}
        <View style={styles.containerBodyOLD}>
          <View style={styles.containerBodyRow1}>
            <Text style={styles.fieldName}>Name </Text>
          </View>
          <View style={{ flex: 0.0001 }}></View>
          <View style={styles.containerBodyRow2}>
            <CustomInput
              name="name"
              control={control}
              rules={{
                required: " ",
              }}
            />
          </View>
          <View
            style={{
              alignSelf: "center",
              position: "absolute",
              //  marginTop: "4.5%",
              marginLeft: "90%",
            }}
          >
            <TouchableOpacity onPress={() => setNamePickerVisible(true)}>
              <MaterialCommunityIcons
                name="line-scan"
                size={28}
                color={Colors.SECONDARY}
              />
            </TouchableOpacity>
            <NameScanModal
              visible={namePickerVisible}
              onClose={() => setNamePickerVisible(false)}
            />
          </View>
        </View>

        {/* Medication Quantity */}
        <View style={styles.containerBodyOLD}>
          <View style={styles.containerBodyRow1}>
            <Text style={styles.fieldName}>Box Quantity </Text>
          </View>
          <View style={{ flex: 0.0001 }}></View>
          <View style={styles.containerBodyRow2}>
            <CustomInput
              name="quantity"
              control={control}
              rules={{
                required: " ",
              }}
            />
          </View>
        </View>

        {/* Medication Intake */}
        <View style={styles.containerBodyOLD}>
          <View style={styles.containerBodyRow1}>
            <Text style={styles.fieldName}>Dosage </Text>
          </View>
          <View style={{ flex: 0.0001 }}></View>
          <View style={styles.containerBodyRow2}>
            <CustomInput
              name="intake"
              control={control}
              rules={{
                required: " ",
              }}
            />
          </View>
        </View>

        {/* Medication Frequency */}
        <View style={styles.containerBodyOLD}>
          <View style={styles.containerBodyRow1}>
            <Text style={styles.fieldName}>Frequency </Text>
          </View>
          <View style={{ flex: 0.0001 }}></View>
          <View style={styles.containerBodyRow2}>
            <CustomButton
              text={btnFreqText}
              type={"QUATERNARY"}
              onPress={() => setIntPickerVisible(true)}
              otherStyles={{ width: "100%" }}
              otherTextStyles={true}
            />
            <IntervalModal
              visible={intPickerVisible}
              onClose={() => setIntPickerVisible(false)}
              onHourSelected={(hour) => setSelectedHour(hour)}
              onTextSelected={(text) => setBtnFreqText(text)}
            />
          </View>
        </View>

        {/* Start Date */}
        <View style={styles.containerBodyOLD}>
          <View style={styles.containerBodyRow1}>
            <Text style={styles.fieldName}>Date/Time </Text>
          </View>
          <View style={{ flex: 0.0001 }}></View>
          <View style={styles.containerBodyRow2}>
            <CustomButton
              text={btnDateText}
              type={"QUATERNARY"}
              onPress={() => {
                setBtnDateText(" ");
                setDtPikerVisible(true);
              }}
              otherStyles={{ width: "100%" }}
              otherTextStyles={true}
            />
            <DateTimeModal
              visible={dtPikerVisible}
              onClose={() => setDtPikerVisible(false)}
              onDateSelected={(date) => setBtnDateText(date)}
            />
          </View>
        </View>

        {/* Medication Instructions */}
        <View style={styles.containerBodyOLD}>
          <View style={styles.containerBodyRow1}>
            <Text style={styles.fieldName}>Instructions </Text>
          </View>
          <View style={{ flex: 0.0001 }}></View>
          <View style={styles.containerBodyRow2}>
            <CustomInput
              name="inst"
              control={control}
              rules={{}}
              otherStyles={styles.otherStyles}
            />
          </View>
        </View>

        {/* buttons to save and close */}
        <CustomButton text="Save" onPress={handleSubmit(onSavePressed)} />
        <CustomButton text="Close" onPress={() => setModalVisible(false)} />
        <TextInput style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

export default MedsDetail;

const styles = StyleSheet.create({
  containerScroll: {
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 20,
  },
  otherStyles: {
    width: "68%",
    alignItems: "stretch",
  },
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    backgroundColor: "white",
    color: "#192986",
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 3,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textShadowColor: "lightgray",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  closeButton: {
    color: "black",
    textShadowColor: "red",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 20,
    paddingTop: 12,
  },
  containerTitleRow1: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingLeft: 0,
    marginHorizontal: 10,
    backgroundColor: "white",
    flex: 1,
  },
  containerTitleRow2: {
    flex: 7.171,
    flexWrap: "wrap",
    flexDirection: "row-reverse",
    marginHorizontal: 15,
    backgroundColor: "white",
  },
  containerBody: {
    flex: 1,
    flexDirection: "row",
  },
  fieldName: {
    fontSize: 16,
    marginTop: "4.5 %",
  },
  containerTextInput: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: Platform.OS === "ios" ? 14 : 0,
    marginVertical: 5,
    paddingLeft: 10,
    height: 50,
  },
  dropdown: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: Platform.OS === "ios" ? 14 : 0,
    marginVertical: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  viewAS: {
    padding: 10,
    marginBottom: Platform.OS === "ios" ? 10 : -10,
  },
  buttonASOption: {
    marginBottom: 0,
  },
  buttonASAlert: {
    borderWidth: 1,
    color: "#cc0000",
  },
  medImage: {
    width: 260,
    height: 180,
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "silver",
    backgroundColor: "white",
  },
  activityIndicator: {
    alignItems: "center",
    // height: 80,
  },
  modalView: {
    justifyContent: "space-around",
    backgroundColor: "#000000",
    opacity: 0.6,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  medPhotoContainer: {
    backgroundColor: "#f2F4f5",
    marginHorizontal: 10,
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  containerBodyOLD: {
    // flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  fieldNameOLD: {
    fontSize: 16,
  },
  containerBodyRow1: {
    flex: 0.35,
    flexWrap: "wrap",
    // flexDirection: 'column',
    // marginTop: 18,
    // marginHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "center",
  },
  containerBodyRow2: {
    flex: 0.75,
    flexWrap: "wrap",
    // flexDirection: 'row',
    // marginHorizontal: 10,
    backgroundColor: "white",
    justifyContent: "center",
    // height: 60,
  },
});
