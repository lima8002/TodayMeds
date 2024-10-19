import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../ui/CustomHeader";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomInput from "../ui/CustomInput";
import { Ionicons } from "@expo/vector-icons";

import { useForm } from "react-hook-form";
import CustomButton from "../ui/CustomButton";
import { onUpdateUserToDB } from "../../utils/FirebaseHelper";
import ChangePhoto from "./ChangePhoto";
import { Colors } from "../../constants/Colors";

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { userDB, setUserDB } = useGlobalContext();

  // constants for the CustomInput component
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // state for the collection
  const [dob, setDob] = useState(userDB?.dob);
  const [name, setName] = useState(userDB?.name);
  const [phone, setPhone] = useState(userDB?.phone);
  const [photo, setPhoto] = useState(userDB?.photo);

  useEffect(() => {
    if (userDB) {
      setName(userDB?.name);
      setDob(userDB?.dob);
      setPhone(userDB?.phone);
      setPhoto(userDB?.photo);
      console.log("userDB:", userDB);
    }
  }, [userDB]);

  const EditModal = () => {
    const loadDefaultValues = () => {
      control._defaultValues.email = userDB?.email;
      control._defaultValues.name = userDB?.name;
      control._defaultValues.dob = userDB?.dob;
      control._defaultValues.phone = userDB?.phone;
      control._defaultValues.photo = userDB?.photo;
    };

    const onUpdateUser = async () => {
      onCloseModal(
        await onUpdateUserToDB(
          userDB?.email,
          control._formValues.dob,
          control._formValues.name,
          control._formValues.phone,
          userDB?.photo
        )
      );
    };

    const onCloseModal = () => {
      setUserDB(
        userDB.email,
        control._formValues.dob,
        control._formValues.name,
        control._formValues.phone,
        userDB.photo
      );
      setModalVisible(false);
      control._reset();
    };

    return (
      <Modal animationType="slide" onShow={loadDefaultValues()}>
        <CustomHeader title={"Edit Profile"} />
        <View style={styles.container}>
          <View style={styles.containerImage}>
            {userDB?.photo ? (
              <Image
                source={{
                  uri: userDB?.photo,
                }}
                style={[styles.imageStyle, styles.shadow]}
              />
            ) : (
              <View style={[styles.imageStyle, styles.shadow]}>
                <Ionicons
                  name="person-circle"
                  size={206}
                  color={Colors.TERTIARY}
                  style={styles.iconsStyle}
                />
              </View>
            )}
            <View style={styles.btnChangePhoto}>
              <ChangePhoto />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.titleInput}>Name:</Text>
            <CustomInput
              name="name"
              placeholder="Name"
              control={control}
              value={name}
              onChange={(text) => {
                setName(text);
              }}
              otherStyles={styles.customInput}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.titleInput}>Phone:</Text>
            <CustomInput
              name="phone"
              placeholder="Phone"
              control={control}
              rules={{}}
              value={phone}
              onChange={(text) => setPhone(text)}
              otherStyles={styles.customInput}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.titleInput}>Date of Birth:</Text>
            <CustomInput
              name="dob"
              placeholder="Date of Birth"
              control={control}
              rules={{}}
              value={dob}
              onChange={(text) => setDob(text)}
              otherStyles={styles.customInput}
            />
          </View>
          <View style={styles.buttonStyle}>
            <CustomButton
              text="Update User"
              onPress={() => handleSubmit(onUpdateUser())}
            />

            <CustomButton
              text="Close"
              onPress={() => onCloseModal()}
              type="TERTIARY"
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.buttonStyle, styles.shadow]}>
      <CustomButton
        text="Edit Profile"
        onPress={() => setModalVisible(true)}
        type="PRIMARY"
      />

      {modalVisible ? EditModal() : null}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "50%",
    alignSelf: "center",
    paddingTop: 20,
  },
  textStyle: {
    fontFamily: "outfit",
    textAlign: "center",
  },
  container: {
    //  alignSelf: "center",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerImage: {
    marginHorizontal: 20,
    alignItems: "center",
  },
  imageStyle: {
    justifyContent: "center",
    width: 168,
    height: 168,
    borderRadius: 99,
    borderColor: "silver",
    backgroundColor: "white",
  },
  iconsStyle: {
    marginLeft: "-11.16%",
    marginTop: "-11.19%",
  },
  titleInput: {
    fontFamily: "outfit",
    width: "30%",
    textAlign: "right",
    paddingRight: 5,
  },
  customInput: {
    width: "65%",
  },
  btnChangePhoto: {
    width: "50%",
    alignSelf: "center",
  },
  shadow: {
    shadowColor: "silver",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
});
