import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { onAddNewMedToDB } from "@/utils/FirebaseHelper";
import { MedsDB } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import { launchImageLibrary } from "react-native-image-picker";
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/ui/CustomButton";
import CustomHeader from "@/components/ui/CustomHeader";

import Profile from "@/assets/icons/person91.png";

export default function ProfileScreen() {
  const {
    letUserSignOut,
    deleteMedication,
    user,
    userDB,
    fetchMeds,
    autosave,
    setAutosave,
  } = useGlobalContext();
  const [editEnabled, setEditEnabled] = useState(false);

  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [photo, setPhoto] = useState<boolean>();
  const [profileImage, setProfileImage] = useState<string>("");

  const handleAutosaveSwitch = async (newValue: boolean) => {
    try {
      setAutosave(newValue);
      if (newValue) {
        await AsyncStorage.setItem("Autosave", "true");
        console.log("Autosave enabled");
      } else {
        await AsyncStorage.removeItem("Autosave");
        console.log("Autosave disabled");
      }
    } catch (error) {
      console.error("Error getting Autosave:", error);
    }
  };

  const loadRandomData = async () => {
    const medsToAdd: MedsDB[] = [
      {
        id: "123",
        email: "123@123.com",
        name: "Vitamin A",
        dosage: "1",
        frequency: "12",
        dateTime: "2025-02-06T00:47:00",
        quantity: "22",
        withFoodWater: false,
        active: true,
        intakeRef: "123",
        intake: [
          {
            intakeId: "0",
            intakeRef: "123",
            dateTime: "2025-02-06T00:47:00",
            taken: false,
          },
          {
            intakeId: "1",
            intakeRef: "123",
            dateTime: "2025-02-06T12:47:00",
            taken: false,
          },
          {
            intakeId: "2",
            intakeRef: "123",
            dateTime: "2025-02-07T00:47:00",
            taken: false,
          },
          {
            intakeId: "3",
            intakeRef: "123",
            dateTime: "2025-02-07T12:47:00",
            taken: false,
          },
          {
            intakeId: "4",
            intakeRef: "123",
            dateTime: "2025-02-08T00:47:00",
            taken: false,
          },
          {
            intakeId: "5",
            intakeRef: "123",
            dateTime: "2025-02-08T12:47:00",
            taken: false,
          },
          {
            intakeId: "6",
            intakeRef: "123",
            dateTime: "2025-02-09T00:47:00",
            taken: false,
          },
          {
            intakeId: "7",
            intakeRef: "123",
            dateTime: "2025-02-09T12:47:00",
            taken: false,
          },
          {
            intakeId: "8",
            intakeRef: "123",
            dateTime: "2025-02-10T00:47:00",
            taken: false,
          },
          {
            intakeId: "9",
            intakeRef: "123",
            dateTime: "2025-02-10T12:47:00",
            taken: false,
          },
          {
            intakeId: "10",
            intakeRef: "123",
            dateTime: "2025-02-11T00:47:00",
            taken: false,
          },
          {
            intakeId: "11",
            intakeRef: "123",
            dateTime: "2025-02-11T12:47:00",
            taken: false,
          },
          {
            intakeId: "12",
            intakeRef: "123",
            dateTime: "2025-02-12T00:47:00",
            taken: false,
          },
          {
            intakeId: "13",
            intakeRef: "123",
            dateTime: "2025-02-12T12:47:00",
            taken: false,
          },
          {
            intakeId: "14",
            intakeRef: "123",
            dateTime: "2025-02-13T00:47:00",
            taken: false,
          },
          {
            intakeId: "15",
            intakeRef: "123",
            dateTime: "2025-02-13T12:47:00",
            taken: false,
          },
          {
            intakeId: "16",
            intakeRef: "123",
            dateTime: "2025-02-14T00:47:00",
            taken: false,
          },
          {
            intakeId: "17",
            intakeRef: "123",
            dateTime: "2025-02-14T12:47:00",
            taken: false,
          },
          {
            intakeId: "18",
            intakeRef: "123",
            dateTime: "2025-02-15T00:47:00",
            taken: false,
          },
          {
            intakeId: "19",
            intakeRef: "123",
            dateTime: "2025-02-15T12:47:00",
            taken: false,
          },
          {
            intakeId: "20",
            intakeRef: "123",
            dateTime: "2025-02-16T00:47:00",
            taken: false,
          },
          {
            intakeId: "21",
            intakeRef: "123",
            dateTime: "2025-02-16T12:47:00",
            taken: false,
          },
        ],
      },
      {
        id: "1234",
        email: "123@123.com",
        name: "Panadol",
        dosage: "1",
        frequency: "8",
        dateTime: "2025-02-06T00:47:01",
        quantity: "10",
        withFoodWater: false,
        active: true,
        intakeRef: "1234",
        intake: [
          {
            intakeId: "0",
            intakeRef: "1234",
            dateTime: "2025-02-06T00:47:00",
            taken: false,
          },
          {
            intakeId: "1",
            intakeRef: "1234",
            dateTime: "2025-02-06T08:47:00",
            taken: false,
          },
          {
            intakeId: "2",
            intakeRef: "1234",
            dateTime: "2025-02-06T16:47:00",
            taken: false,
          },
          {
            intakeId: "3",
            intakeRef: "1234",
            dateTime: "2025-02-07T00:47:00",
            taken: false,
          },
          {
            intakeId: "4",
            intakeRef: "1234",
            dateTime: "2025-02-07T08:47:00",
            taken: false,
          },
          {
            intakeId: "5",
            intakeRef: "1234",
            dateTime: "2025-02-07T16:47:00",
            taken: false,
          },
          {
            intakeId: "6",
            intakeRef: "1234",
            dateTime: "2025-02-08T00:47:00",
            taken: false,
          },
          {
            intakeId: "7",
            intakeRef: "1234",
            dateTime: "2025-02-08T08:47:00",
            taken: false,
          },
          {
            intakeId: "8",
            intakeRef: "1234",
            dateTime: "2025-02-09T00:47:00",
            taken: false,
          },
          {
            intakeId: "9",
            intakeRef: "1234",
            dateTime: "2025-02-09T08:47:00",
            taken: false,
          },
        ],
      },
      {
        id: "12345",
        email: "123@123.com",
        name: "Nurofen Pain Relief",
        dosage: "1",
        frequency: "8",
        dateTime: "2025-02-06T00:47:02",
        quantity: "10",
        withFoodWater: true,
        active: true,
        intakeRef: "12345",
        intake: [
          {
            intakeId: "0",
            intakeRef: "12345",
            dateTime: "2025-02-06T00:47:00",
            taken: false,
          },
          {
            intakeId: "1",
            intakeRef: "12345",
            dateTime: "2025-02-06T08:47:00",
            taken: false,
          },
          {
            intakeId: "2",
            intakeRef: "12345",
            dateTime: "2025-02-06T16:47:00",
            taken: false,
          },
          {
            intakeId: "3",
            intakeRef: "12345",
            dateTime: "2025-02-07T00:47:00",
            taken: false,
          },
          {
            intakeId: "4",
            intakeRef: "12345",
            dateTime: "2025-02-07T08:47:00",
            taken: false,
          },
          {
            intakeId: "5",
            intakeRef: "12345",
            dateTime: "2025-02-07T16:47:00",
            taken: false,
          },
          {
            intakeId: "6",
            intakeRef: "12345",
            dateTime: "2025-02-08T00:47:00",
            taken: false,
          },
          {
            intakeId: "7",
            intakeRef: "12345",
            dateTime: "2025-02-08T08:47:00",
            taken: false,
          },
        ],
      },
    ];

    try {
      for (const med of medsToAdd) {
        const newMed: MedsDB = {
          ...med,
          intake: med.intake.map((intake) => ({ ...intake })),
        };
        await onAddNewMedToDB(newMed);
      }
      console.log("Random medications added successfully!");
      fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error adding random medications:", error);
    }
  };

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: true,
        selectionLimit: 1,
      },
      async (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.error("ImagePicker Error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const imageUri = response.assets[0].uri;
          const path = `${RNFS.DocumentDirectoryPath}/profileImage.jpg`;
          try {
            const exists = await RNFS.exists(path);
            if (exists) {
              await RNFS.unlink(path);
              setProfileImage("");
              console.log("Image deleted successfully");
            }

            if (!userDB?.photo) {
              await RNFS.copyFile(imageUri?.toString() || "", path);
              setProfileImage(path);
              console.log("Image saved successfully");
            }

            // if (!exists) {
            //   // setUserImageProfile(path);
            //   console.log("Image saved successfully");
            // }
          } catch (error) {
            console.error("Error saving image:", error);
          }
          // saveImageToLocalStorage(imageUri?.toString() || "");
        }
      }
    );
  };

  // const saveImageToLocalStorage = async (imageUri: string) => {
  //   const path = `${RNFS.DocumentDirectoryPath}/profileImage.jpg`;
  //   try {
  //     const exists = await RNFS.exists(path);
  //     if (exists) {
  //       deleteProfileImage();
  //     }

  //     if (!exists) {
  //       await RNFS.copyFile(imageUri, path);
  //       setUserImageProfile(path);
  //       console.log("Image saved successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error saving image:", error);
  //   }
  // };

  // const deleteProfileImage = async () => {
  //   const path = `${RNFS.DocumentDirectoryPath}/profileImage.jpg`;
  //   try {
  //     const exists = await RNFS.exists(path);
  //     if (exists) {
  //       await RNFS.unlink(path);
  //       setUserImageProfile(null);
  //       console.log("Image deleted successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting image:", error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <CustomHeader title={"Profile"} />

      <View style={{ flex: 1, marginTop: 40 }}>
        <View style={styles.containerProfile}>
          <View
            style={{
              // paddingHorizontal: 20,
              // paddingVertical: 10,
              position: "absolute",
              left: "4%",
              top: "-20%",
              // overflow: "hidden",
              width: 100,
              height: 100,
            }}
          >
            <Image
              style={
                userDB?.photo
                  ? {
                      borderRadius: 100,
                      width: 100,
                      height: 100,
                      borderColor: Colors.BORDERDISABLED,
                      borderWidth: 2,
                      resizeMode: "cover",
                    }
                  : {
                      backgroundColor: "#fff",
                      resizeMode: "stretch",
                      width: "100%",
                      height: "100%",
                      borderWidth: 2,
                      borderColor: Colors.BORDERDISABLED,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 100,
                      tintColor: Colors.BORDERDISABLED,
                    }
              }
              source={userDB?.photo ? { uri: profileImage } : Profile}
            />
          </View>
          <View
            style={{
              paddingTop: 10,
              paddingLeft: "30%",
            }}
          >
            {editEnabled ? (
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.profileText,
                      { fontFamily: "outfit-bold", fontSize: 20 },
                    ]}
                  >
                    Name:
                  </Text>
                  <TextInput
                    style={[
                      styles.profileText,
                      { fontFamily: "outfit-bold", fontSize: 20 },
                      {
                        backgroundColor: "#fff",
                        width: "65%",
                        borderRadius: 8,
                      },
                    ]}
                    value={userDB?.name}
                    onChangeText={setName}
                  />
                </View>
                <View>
                  <Text style={styles.profileText}>Email: {userDB?.email}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.profileText}>Date of Birth:</Text>
                  <TextInput
                    style={[
                      styles.profileText,
                      {
                        backgroundColor: "#fff",
                        width: "52%",
                        borderRadius: 8,
                      },
                    ]}
                    value={userDB?.name}
                    onChangeText={setName}
                  />
                </View>
              </>
            ) : (
              <>
                <Text
                  style={[
                    styles.profileText,
                    { fontFamily: "outfit-bold", fontSize: 20 },
                  ]}
                >
                  {userDB?.name}
                </Text>
                <Text style={styles.profileText}>Email: {userDB?.email}</Text>
                <Text style={styles.profileText}>
                  Date of Birth: {userDB?.dob ? userDB?.dob : "Not Entered"}
                </Text>
              </>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: 10,
            }}
          >
            <CustomButton
              type={"ICON"}
              icon={"gallery"}
              iconColor={Colors.PRIMARY}
              otherStyles={{
                width: "40%",
                padding: 5,
                flexDirection: "row",
              }}
              onPress={() => {
                pickImage();
              }}
            />
            <CustomButton
              type={"ICON"}
              icon={"editP"}
              iconColor={Colors.PRIMARY}
              otherStyles={{
                width: "40%",

                padding: 5,
                flexDirection: "row",
              }}
              onPress={() => {
                setEditEnabled(!editEnabled);
              }}
            />
          </View>
        </View>
      </View>
      <ScrollView style={{ marginTop: -32 }}>
        <View style={styles.containerBtn}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Enable Autosave</Text>
            <Switch value={autosave} onValueChange={handleAutosaveSwitch} />
          </View>
          <View style={{ width: "60%", alignSelf: "center" }}>
            <CustomButton
              text="Delete all medicatons"
              type="PRIMARY"
              onPress={() => {
                deleteMedication(user?.email || "");
                fetchMeds(user?.email || "");
              }}
            />
            <CustomButton
              text="Load medicatons"
              type="SECONDARY"
              onPress={() => loadRandomData()}
            />
          </View>
        </View>

        <View style={[styles.signoutBtn, styles.shadow]}>
          <CustomButton
            text="Log Out"
            onPress={() => letUserSignOut()}
            type="SECONDARY"
          />
          <CustomButton
            type="SECONDARY"
            text="Delete Account"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  containerProfile: {
    flex: 0.8,
    height: "20%",
    flexDirection: "column",
    backgroundColor: Colors.BACKGROUND_100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BORDERDISABLED,
    // marginBottom: -40,
    // paddingBottom: 10,
  },
  profileText: {
    fontFamily: "outfit",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  containerBtn: {
    flex: 1,
    height: "40%",
    backgroundColor: Colors.BACKGROUND_100,
    borderRadius: 8,
    padding: 10,
    paddingBottom: 24,
  },

  title: {
    fontSize: 18,
    fontFamily: "outfit-medium",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  switchText: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  signoutBtn: {
    paddingTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  shadow: {
    shadowColor: "silver",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
});
