import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../ui/CustomButton";
import { onUpdateUserToDB } from "../../utils/FirebaseHelper";
import * as ImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";

const ChangePhoto = () => {
  const { userDB, setUserDB } = useGlobalContext();
  const { showActionSheetWithOptions } = useActionSheet();

  const onChangePhotoClick = () => {
    const options = ["Photo Gallery", "Delete Photo", "Cancel"];
    const cancelButtonIndex = 3;
    const destructiveButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            onImagePick();
            break;

          case destructiveButtonIndex:
            onDeletePick();
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  const onImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result && result.assets[0].uri.length > 3) {
      onUpdateUser(result.assets[0].uri);
      const userDetails = {
        photo: result.assets[0].uri,
        email: userDB?.email,
        dob: userDB?.dob,
        name: userDB?.name,
        phone: userDB?.phone,
      };
      setUserDB(userDetails);
    }
  };

  const onDeletePick = async () => {
    if (userDB?.photo) onUpdateUser(null);
  };

  const onUpdateUser = async (imageUrl) => {
    await onUpdateUserToDB(
      userDB?.email,
      userDB?.dob,
      userDB?.name,
      userDB?.phone,
      imageUrl
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.buttonStyle, styles.shadow]}>
        <CustomButton
          text="Change photo"
          onPress={() => onChangePhotoClick()}
          type="TERTIARY"
        />
      </View>
    </View>
  );
};

export default ChangePhoto;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  buttonStyle: {
    // width: "48%",
  },
  textStyle: {
    fontFamily: "outfit",
    textAlign: "center",
  },

  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  cameraButtonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  cameraButton: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  cameraText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  touchControl: {
    alignItems: "center",
  },
  touchText: {
    marginBottom: 60,
    color: "white",
  },
  touchContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1,
    alignItems: "flex-end",
  },
  shadow: {
    shadowColor: "silver",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
});
