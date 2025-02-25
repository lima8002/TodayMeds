import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { onAddNewMedToDB } from "@/utils/FirebaseHelper";
import { MedsDB } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import { launchImageLibrary } from "react-native-image-picker";
import { format, parseISO } from "date-fns";
import { ProgressBar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/ui/CustomButton";
import CustomHeader from "@/components/ui/CustomHeader";
import EditProfileModal from "@/components/modals/EditProfileModal";
import Profile from "@/assets/icons/person90.png";

export default function ProfileScreen() {
  const {
    letUserSignOut,
    deleteAllMedication,
    user,
    userDB,
    medications,
    fetchMeds,
    autosave,
    setAutosave,
    updateUser,
    showQtLeft,
    setShowQtLeft,
    showFindMedsM,
    setShowFindMedsM,
    showFindMedsT,
    setShowFindMedsT,
    deleteUser,
  } = useGlobalContext();
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  // const path = `${Platform.OS === "android" && "file://"}${
  //   RNFS.DocumentDirectoryPath
  // }/profileImage.jpg`;

  const [name, setName] = useState<string>(userDB?.name || "");
  const [dob, setDob] = useState<string>(userDB?.dob || "");
  const [photo, setPhoto] = useState<string>("");
  const [profilePhotoExists, setProfilePhotoExists] = useState<boolean>();
  const [selectedDate, setSelectedDate] = useState(
    (userDB?.dob && userDB?.dob.length > 0 && parseISO(userDB?.dob)) ||
      new Date()
  );
  const [loadDisabled, setLoadDisabled] = useState<boolean>(false);
  const [deleteDisabled, setDeleteDisabled] = useState<boolean>(true);

  useEffect(() => {
    const checkIfLoaded = medications.some((medication) =>
      ["Lisinopril", "Metformin", "Atorvastatin", "Amoxicillin"].includes(
        medication.name
      )
    );

    if (checkIfLoaded) {
      setLoadDisabled(true);
      setDeleteDisabled(false);
    }
  }, [medications]);

  const handlePickImage = async () => {
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
          try {
            await checkProfilePhoto();
            setTimeout(() => {
              if (profilePhotoExists) {
                handleDeleteProfilePhoto();
              }
              checkProfilePhoto();
              try {
                // console.log("fileAndroid: " + imageUri?.toString() || "", path);
                // const result = RNFS.copyFile(imageUri?.toString() || "", path);
                // console.log("result --> ", result);
              } catch (error) {
                console.log(error);
              }

              handleUpdateProfilePhoto("profileImage.jpg");
            }, 399);
          } catch (error) {
            console.error("Error saving image:", error);
          }
        }
      }
    );
  };

  const checkProfilePhoto = async () => {
    try {
      // const exists = await RNFS.exists(path);
      // if (exists) {
      //   setProfilePhotoExists(true);
      // } else {
      //   setProfilePhotoExists(false);
      // }
      console.log("profilePhotoExists---> " + profilePhotoExists);
    } catch (error) {
      console.error("Error checking profile photo:", error);
    }
  };

  const handleUpdateProfilePhoto = (photo: string) => {
    try {
      console.log("photo", photo);
      const userEmail = user?.email?.toString();

      if (userEmail) {
        const userData = {
          name: name,
          dob: dob,
          photo: photo,
        };
        updateUser(userEmail, userData);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    if (userDB?.photo && userDB.photo.length > 3) {
      setPhoto(userDB?.photo);
    } else {
      setPhoto("");
    }

    checkProfilePhoto();
  }, [userDB, checkProfilePhoto]);

  const handleProfilePhoto = async () => {
    // try {
    //   const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    //   console.log("Files in Document Directory:", files);

    //   // You can then iterate through the 'files' array
    //   files.forEach((file) => {
    //     console.log("File Name:", file.name);
    //     console.log("File Path:", file.path);
    //     console.log("File Size:", file.size);
    //     console.log("------------------");
    //   });
    // } catch (error) {
    //   console.error("Error listing files:", error);
    // }
    profilePhotoExists === true
      ? Alert.alert(
          "Select an option",
          "Choose one of the following actions:",
          [
            {
              text: "Pick Profile Photo",
              onPress: () => handlePickImage(),
            },
            {
              text: "Delete Profile Photo",
              onPress: () => handleDeleteProfilePhoto(),
              style: "destructive",
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        )
      : Alert.alert(
          "Select an option",
          "Choose one of the following actions:",
          [
            {
              text: "Pick Profile Photo",
              onPress: () => handlePickImage(),
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
  };

  const handleDeleteProfilePhoto = async () => {
    try {
      handleUpdateProfilePhoto("");
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      // await RNFS.unlink(path);
      console.log("Image deleted successfully");
    }
  };

  const handleAutosaveSwitch = async (newValue: boolean) => {
    try {
      setAutosave(newValue);
      if (newValue) {
        await AsyncStorage.setItem(`${user?.email}` + "-Autosave", "true");
        console.log("Autosave enabled");
      } else {
        await AsyncStorage.removeItem(`${user?.email}` + "-Autosave");
        console.log("Autosave disabled");
      }
    } catch (error) {
      console.error("Error getting Autosave:", error);
    }
  };

  const handleShowQtLeftSwitch = async (newValue: boolean) => {
    try {
      setShowQtLeft(newValue);
      if (newValue) {
        await AsyncStorage.setItem(`${user?.email}` + "-ShowQtLeft", "true");
        console.log("ShowQtLeft enabled");
      } else {
        await AsyncStorage.removeItem(`${user?.email}` + "-ShowQtLeft");
        console.log("ShowQtLeft disabled");
      }
    } catch (error) {
      console.error("Error getting ShowQtLeft:", error);
    }
  };
  const handleShowFindMedsMSwitch = async (newValue: boolean) => {
    try {
      setShowFindMedsM(newValue);
      if (newValue) {
        await AsyncStorage.setItem(`${user?.email}` + "-ShowFindMedsM", "true");
        console.log("ShowFindMedsM enabled");
      } else {
        await AsyncStorage.removeItem(`${user?.email}` + "-ShowFindMedsM");
        console.log("ShowFindMedsM disabled");
      }
    } catch (error) {
      console.error("Error getting ShowFindMedsM:", error);
    }
  };
  const handleShowFindMedsTSwitch = async (newValue: boolean) => {
    try {
      setShowFindMedsT(newValue);
      if (newValue) {
        await AsyncStorage.setItem(`${user?.email}` + "-ShowFindMedsT", "true");
        console.log("ShowFindMedsT enabled");
      } else {
        await AsyncStorage.removeItem(`${user?.email}` + "-ShowFindMedsT");
        console.log("ShowFindMedsT disabled");
      }
    } catch (error) {
      console.error("Error getting ShowFindMedsT:", error);
    }
  };

  const handleCloseModal = () => {
    setEditEnabled(!editEnabled);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleDeleteAccount = () => {};

  const ReportCard = () => {
    return (
      <>
        <View style={styles.line} />
        <View style={styles.containerReport}>
          <Text style={styles.reportMainTitle}>Medication Report</Text>

          {medications && medications.length > 0 ? (
            <>
              {medications
                .filter((med) => med.active)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((medication, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.reportMedName}>{medication.name}</Text>
                    <View
                      style={{
                        width: "50%",
                      }}
                    >
                      <ProgressBar
                        progress={parseFloat(
                          (
                            (medication.intake.filter((intake) => intake.taken)
                              .length *
                              parseInt(medication.dosage)) /
                            medication.intake.length
                          ).toFixed(2)
                        )}
                        color={Colors.TEXT_200}
                        style={{
                          height: 10,
                          borderRadius: 5,
                          flex: 1,
                          marginRight: 10,
                        }}
                      />
                    </View>
                  </View>
                ))}
            </>
          ) : (
            <Text>No medications found.</Text>
          )}
        </View>
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* -------------- Profile -------------- */}
      <CustomHeader title={"Profile"} />
      <View style={styles.containerProfile}>
        <View style={styles.ctnTopProfile}>
          <View style={styles.ctnTopProfileCol1}>
            <TouchableOpacity onPress={() => handleProfilePhoto()}>
              <View
                style={{
                  width: userDB?.photo ? 100 : 127,
                  height: userDB?.photo ? 100 : 127,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: Colors.BORDERDISABLED,
                }}
              >
                {!userDB?.photo && (
                  <Image
                    style={{
                      width: 127,
                      height: 127,
                      tintColor: Colors.BORDERDISABLED,
                    }}
                    resizeMode={"cover"}
                    source={Profile}
                  />
                )}
                {/* {userDB?.photo && userDB?.photo.length > 0 && (
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    resizeMode={"cover"}
                    source={{
                      uri: `${Platform.OS === "android" && "file://"}${
                        RNFS.DocumentDirectoryPath
                      }/${userDB?.photo}`,
                    }}
                  />
                )} */}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.ctnTopProfileCol2}>
            <Text
              style={[
                styles.profileText,
                { fontFamily: "outfit-bold", fontSize: 20 },
              ]}
            >
              {userDB?.name}
            </Text>
            <Text style={styles.profileText}>{userDB?.email}</Text>
            <Text style={styles.profileText}>
              Date of Birth:{" "}
              {userDB?.dob ? format(userDB?.dob, "dd/MM/yyyy") : "__/__/____"}
            </Text>
          </View>
          <View style={styles.ctnTopProfileCol3}>
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
            <EditProfileModal
              isVisible={editEnabled}
              onClose={handleCloseModal}
              date={selectedDate}
              onDateChange={handleDateChange}
              name={name}
            />
          </View>
        </View>

        <ReportCard />
      </View>
      {/* -------------- Settings -------------- */}
      <Text style={styles.title}>Settings</Text>
      <View style={styles.containerBtn}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Enable Autosave</Text>
          <Switch
            value={autosave}
            onValueChange={handleAutosaveSwitch}
            trackColor={{ true: Colors.TERTIARY }}
            thumbColor={Colors.TEXT_100}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Show Remaining on Instructions</Text>
          <Switch
            value={showQtLeft}
            onValueChange={handleShowQtLeftSwitch}
            trackColor={{
              true: Colors.TERTIARY,
            }}
            thumbColor={Colors.TEXT_100}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Show FindMeds on TodayMeds</Text>
          <Switch
            value={showFindMedsT}
            onValueChange={handleShowFindMedsTSwitch}
            trackColor={{
              true: Colors.TERTIARY,
            }}
            thumbColor={Colors.TEXT_100}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Show FindMeds on Medications</Text>
          <Switch
            value={showFindMedsM}
            onValueChange={handleShowFindMedsMSwitch}
            trackColor={{
              true: Colors.TERTIARY,
            }}
            thumbColor={Colors.TEXT_100}
          />
        </View>
        <View style={styles.line} />

        <Text style={[styles.switchText, { padding: 10 }]}>
          For testing purposes only
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {/* <CustomButton
            type="ICON"
            icon={"loadM"}
            iconColor={Colors.TEXT_100}
            onPress={() => loadRandomData()}
            otherStyles={{
              width: "45%",
              flexDirection: "row",
              borderWidth: 1,
              borderColor: Colors.TEXT_100,
              backgroundColor: "#fff",
            }}
            disabled={loadDisabled}
          /> */}
          <CustomButton
            type="ICON"
            icon={"deleteM"}
            iconColor={Colors.TAKEN_100}
            onPress={() => {
              deleteAllMedication(user?.email || "");
              fetchMeds(user?.email || "");
              setLoadDisabled(false);
            }}
            otherStyles={{
              width: "45%",
              flexDirection: "row",
              borderWidth: 1,
              borderColor: Colors.TEXT_100,
              backgroundColor: "#fff",
            }}
            disabled={deleteDisabled}
          />
        </View>
        {/* <CustomButton
          type="SECONDARY"
          text="Delete All AsyncStorage Data"
          onPress={async () => {
            try {
              await AsyncStorage.clear();
              console.log("All data cleared successfully");
            } catch (e) {
              // handle error here
              console.error("Error clearing data:", e);
            }
          }}
        /> */}
        {/* <CustomButton
          type="SECONDARY"
          text="Trigger notification"
          onPress={scheduleTimedNotification}
        />
        <CustomButton
          type="SECONDARY"
          text="Trigger notification"
          onPress={logNotifications}
        /> */}
      </View>

      <View style={[styles.signoutBtn, styles.shadow]}>
        <CustomButton
          text="Log Out"
          onPress={() => letUserSignOut()}
          type="SECONDARY"
        />
        <CustomButton
          type="ALERT"
          text="Delete Account"
          onPress={() => {
            Alert.alert(
              "Delete User Account",
              "Your account will be successfully deleted. Do you want to continue?",

              [
                {
                  text: "Delete",
                  onPress: deleteUser,
                  style: "destructive",
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </View>
      <View style={{ marginBottom: "22%" }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerProfile: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: Colors.BACKGROUND_100,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  ctnTopProfile: {
    flexDirection: "row",
  },
  ctnTopProfileCol1: {
    flex: 26,
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
    borderColor: "silver",
    borderWidth: 1,
    marginHorizontal: 14,
    marginVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  ctnTopProfileCol2: {
    flex: 60,
    paddingTop: 35,
  },
  ctnTopProfileCol3: {
    flex: 10,
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
    paddingHorizontal: 8,
    paddingBottom: 24,
    marginHorizontal: 16,
  },

  title: {
    fontFamily: "outfit-medium",
    fontSize: 24,
    color: Colors.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
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
  line: {
    height: 0.6,
    width: "96.5%",
    backgroundColor: Colors.BORDERGRAY,
    alignSelf: "center",
  },
  containerReport: {
    backgroundColor: Colors.BACKGROUND_100,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  reportMainTitle: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 16 : 18,
    color: Colors.TEXT_050,
    textAlign: "center",
    paddingBottom: 8,
  },
  reportTitle: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 15 : 17,
    color: Colors.TEXT_050,
    paddingBottom: 5,
  },
  reportMedName: {
    fontFamily: "outfit",
    paddingBottom: 4,
    paddingLeft: 10,
  },

  shadow: {
    shadowColor: "silver",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
});
