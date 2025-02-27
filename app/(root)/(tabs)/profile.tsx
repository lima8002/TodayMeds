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
import { Colors } from "@/constants/Colors";
import { launchImageLibrary } from "react-native-image-picker";
import { format, parseISO } from "date-fns";
import { ProgressBar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/ui/CustomButton";
import CustomHeader from "@/components/ui/CustomHeader";
import EditProfileModal from "@/components/modals/EditProfileModal";
import Profile from "@/assets/icons/person90.png";
import * as FileSystem from "expo-file-system";

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
    photoProfile,
    setPhotoProfile,
  } = useGlobalContext();
  const photoPath = `${FileSystem.documentDirectory}profileImage.jpg`;
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [testMeds, setTestMeds] = useState<boolean>(true);
  const [name, setName] = useState<string>(userDB?.name || "");
  const [dob, setDob] = useState<string>(userDB?.dob || "");
  const [profilePhotoExists, setProfilePhotoExists] = useState<boolean>();
  const [selectedDate, setSelectedDate] = useState(
    (userDB?.dob && userDB?.dob.length > 0 && parseISO(userDB?.dob)) ||
      new Date()
  );

  useEffect(() => {
    const checkPhoto = async () => {
      try {
        if (userDB?.photo) {
          const fileInfo = await FileSystem.getInfoAsync(userDB.photo);
          if (fileInfo.exists && fileInfo.uri) {
            setProfilePhotoExists(true);
            setPhotoProfile(fileInfo.uri);
          } else {
            setProfilePhotoExists(false);
            setPhotoProfile("");
            handleUpdateProfilePhoto("");
          }
        }
      } catch (error) {
        console.error("Error checking profile photo:", error);
        setProfilePhotoExists(false);
      }
    };

    checkPhoto();
  }, [userDB?.photo]);

  const handlePickImage = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: "photo",
        includeBase64: false,
        selectionLimit: 1,
        quality: 1,
      });

      if (response.didCancel) {
        console.log("User cancelled image picker");
        return;
      }

      if (response.errorMessage) {
        console.error("ImagePicker Error: ", response.errorMessage);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (!imageUri) return;

        if (profilePhotoExists) {
          await handleDeleteProfilePhoto();
        }

        let finalUri = imageUri;
        if (Platform.OS === "ios" && !imageUri.startsWith("file://")) {
          finalUri = `file://${imageUri}`;
        }

        await FileSystem.copyAsync({
          from: finalUri,
          to: photoPath,
        });

        const fileInfo = await FileSystem.getInfoAsync(photoPath);
        if (!fileInfo.exists) {
          throw new Error("Failed to copy image to destination");
        }

        setProfilePhotoExists(true);
        const timestamp = `?t=${new Date().getTime()}`;
        await handleUpdateProfilePhoto(`${photoPath}${timestamp}`);
      }
    } catch (error) {
      console.error("Error handling image pick:", error);
      Alert.alert("Error", "Failed to save profile photo. Please try again.");
    }
  };

  const handleUpdateProfilePhoto = async (photoUri: string) => {
    try {
      const userEmail = user?.email;
      if (!userEmail) return;

      const userData = {
        name,
        dob,
        photo: photoUri,
      };
      await updateUser(userEmail, userData);
      setPhotoProfile(photoUri);
    } catch (error) {
      console.error("Error updating profile photo:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleDeleteProfilePhoto = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(photoPath);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(photoPath);
      }
      setProfilePhotoExists(false);
      await handleUpdateProfilePhoto("");
    } catch (error) {
      console.error("Error deleting profile photo:", error);
      Alert.alert("Error", "Failed to delete profile photo");
    }
  };

  const handleProfilePhoto = async () => {
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

  const handleTestMeds = () => {
    // "Lisinopril", "Metformin", "Atorvastatin", "Amoxicillin"
    if (testMeds) {
      // load 4 medications here
      // custom dates
      // if it's a past date, chenge to taken
      console.log("Load here");
      setTestMeds(!testMeds);
    } else {
      console.log("Delete here");
      setTestMeds(!testMeds);
    }
  };

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
                  width: !photoProfile ? 127 : 100,
                  height: !photoProfile ? 127 : 100,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: Colors.BORDERDISABLED,
                }}
              >
                {photoProfile && photoProfile.length > 0 && (
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    resizeMode={"cover"}
                    source={{
                      uri: photoProfile,
                    }}
                    key={profilePhotoExists ? "photo-exists" : "no-photo"}
                  />
                )}
                {!photoProfile && (
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
        {/* <View style={styles.line} /> */}

        {/* <Text style={[styles.switchText, { padding: 10 }]}>
          For testing purposes only
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {testMeds ? (
            <CustomButton
              type="ICON"
              icon={"loadM"}
              iconColor={Colors.TEXT_100}
              onPress={handleTestMeds}
              otherStyles={{
                width: "45%",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: Colors.TEXT_100,
                backgroundColor: "#fff",
              }}
            />
          ) : (
            <CustomButton
              type="ICON"
              icon={"deleteM"}
              iconColor={Colors.TAKEN_100}
              onPress={
                handleTestMeds
                // deleteAllMedication(user?.email || "");
                // fetchMeds(user?.email || "");
              }
              otherStyles={{
                width: "45%",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: Colors.TEXT_100,
                backgroundColor: "#fff",
              }}
            />
          )}
        </View> */}
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
    // paddingBottom: 24,
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
