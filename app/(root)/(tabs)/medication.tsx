import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Platform,
  Alert,
  LayoutAnimation,
  Modal,
  StatusBar,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MedsDB } from "@/constants/Types";
import { format, set } from "date-fns";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomButton from "@/components/ui/CustomButton";
import IntakeDetails from "@/components/meds/IntakeDetails";
import EditMeds from "@/components/modals/EditMeds";
import AddMeds from "@/components/modals/AddMeds";

const MedicationScreen = () => {
  const { medications, updateMedication, deleteMedication, setScreenName } =
    useGlobalContext();
  const [selectedMedicationId, setSelectedMedicationId] = useState<
    string | null
  >(null);
  const [modalIntakeVisible, setModalIntakeVisible] = useState<boolean>(false);
  const [modalEditVisible, setModaEditVisible] = useState<boolean>(false);
  const [modalAddVisible, setModalAddVisible] = useState<boolean>(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<MedsDB> | null>(null);
  const animatedValues = useRef<{ [key: string]: Animated.Value }>({});
  const initialRender = useRef(false);

  useEffect(() => {
    if (initialRender.current && medications && medications.length > 0) {
      setSelectedMedicationId(medications[0].id);
      initialRender.current = false;
    }

    medications?.forEach((med) => {
      if (!animatedValues.current[med.id]) {
        animatedValues.current[med.id] = new Animated.Value(0);
      }
    });
  }, [medications]);

  const handleDone = (id: string, remaining: number) => {
    Alert.alert(
      "🎉 Well done 🎉",
      `${
        remaining === 1
          ? "\nYou still have " +
            `${remaining}` +
            " pill/tablet for the next time!"
          : "\nYou still have " +
            `${remaining}` +
            " pills/tablets \nfor the next time! \nKeep them well stored!"
      }`,
      [
        {
          text: "OK",
          onPress: () => {
            updateMedication(id, { active: false });
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Medication?",
      "\nAre you sure you want to delete " +
        `${medications.find((med) => med.id === id)?.name}` +
        "?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteMedication(id);
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const renderMedItem = ({ item }: { item: MedsDB }) => {
    const rotateValue = animatedValues.current[item.id]?.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"],
    });

    const handlePress = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      const newValue = selectedMedicationId === item.id ? 0 : 1;
      setSelectedMedicationId(
        item.id === selectedMedicationId ? null : item.id
      );

      Animated.timing(animatedValues.current[item.id], {
        toValue: newValue,
        duration: 100,
        useNativeDriver: true,
      }).start();

      if (selectedMedicationId && selectedMedicationId !== item.id) {
        Animated.timing(animatedValues.current[selectedMedicationId], {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
      flatListRef.current?.scrollToItem({ item, animated: true });
    };

    let remaining =
      item.intake.length -
      item.intake.filter((intake) => intake.taken === true).length;

    return (
      <View style={styles.medicationContainer}>
        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
          <View style={styles.medicationHeader}>
            <Text style={styles.medicationName}>{item.name}</Text>
            <Animated.View
              style={{
                transform: [
                  { translateX: 10 },
                  { rotate: rotateValue || "0deg" },
                  { translateX: -10 },
                ],
              }}
            >
              <Image
                source={require("@/assets/icons/arrowRight.png")}
                style={styles.icon}
                tintColor={Colors.PRIMARY}
              />
            </Animated.View>
          </View>

          <View style={styles.medicationDetailsSection}>
            <Text style={styles.medicationRow}>
              <Text style={styles.medicationText}>Dosage: </Text>
              <Text style={styles.medicationValue}>
                {item.dosage} pill/tablet
              </Text>
            </Text>

            <Text style={styles.medicationRow}>
              <Text style={styles.medicationText}>Frequency: </Text>
              <Text style={styles.medicationValue}>
                Every {item.frequency} hour
                {item.frequency > 1 ? "s" : ""}
              </Text>
            </Text>

            <View style={styles.medicationGroup}>
              <Text style={styles.medicationText}>Start Date:</Text>
              <Text style={styles.medicationValue}>
                {format(new Date(item.dateTime), "dd/MM/yyyy")}
              </Text>
            </View>

            <View style={styles.medicationGroup}>
              <Text style={styles.medicationText}>Start Time:</Text>
              <Text style={styles.medicationValue}>
                {format(new Date(item.dateTime), "H:mm")}
              </Text>
            </View>

            <View style={styles.medicationGroup}>
              <Text style={styles.medicationText}>Finish Date:</Text>
              <Text style={styles.medicationValue}>
                {format(
                  new Date(item.intake[item.intake.length - 1].dateTime),
                  "dd/MM/yyyy"
                )}
              </Text>
            </View>

            <View style={styles.medicationGroup}>
              <Text style={styles.medicationText}>Finish Time:</Text>
              <Text style={styles.medicationValue}>
                {format(
                  new Date(item.intake[item.intake.length - 1].dateTime),
                  "H:mm"
                )}
              </Text>
            </View>

            <View style={styles.medicationGroup}>
              <Text style={styles.medicationText}>Quantity:</Text>
              <Text style={styles.medicationValue}>{item.quantity}</Text>
            </View>

            <View
              style={[
                styles.medicationGroup,
                !item.withFoodWater && { marginBottom: 0 },
              ]}
            >
              <Text style={styles.medicationText}>Remaining:</Text>
              <Text style={styles.medicationValue}>{remaining}</Text>
            </View>

            {item.withFoodWater && (
              <Text style={[styles.medicationRow, { marginBottom: 0 }]}>
                <Text style={styles.medicationText}>Instructions:</Text>
                <Text style={styles.medicationValue}>Take with food/water</Text>
              </Text>
            )}
          </View>

          {selectedMedicationId === item.id && (
            <>
              <View style={styles.buttonContainer}>
                <CustomButton
                  type={"ICON"}
                  icon={"intake"}
                  iconColor={Colors.PRIMARY}
                  onPress={() => setModalIntakeVisible(!modalIntakeVisible)}
                />
                <Modal
                  visible={modalIntakeVisible}
                  transparent={true}
                  animationType="fade"
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalStyle}>
                      <Text style={styles.modalTitle}>
                        Intakes for {item.name}
                      </Text>
                      <View
                        style={{ maxHeight: "80%", width: "100%", flex: 1 }}
                      >
                        <FlatList
                          data={item.intake}
                          keyExtractor={(item) => item.intakeId}
                          contentContainerStyle={styles.modalIntake}
                          renderItem={({ item }) => (
                            <IntakeDetails
                              intakeItem={item}
                              medRef={item.intakeRef}
                              type={"UNDO"}
                            />
                          )}
                          ListHeaderComponent={
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 10,
                              }}
                            >
                              <View style={styles.col1Modal}>
                                <Text style={styles.modalTextDate}>Date</Text>
                              </View>
                              <View style={styles.col2Modal}>
                                <Text style={styles.modalTextTime}>Time</Text>
                              </View>
                              <View style={styles.col3Modal}>
                                <Text style={styles.modalTextStatus}>
                                  Status
                                </Text>
                              </View>
                            </View>
                          }
                        />
                      </View>

                      <CustomButton
                        type="TERTIARY"
                        text="Cancel"
                        onPress={() =>
                          setModalIntakeVisible(!modalIntakeVisible)
                        }
                      />
                    </View>
                    <StatusBar
                      animated={true}
                      backgroundColor="rgba(0, 0, 0, 0.25)"
                    />
                  </View>
                </Modal>
                <CustomButton
                  type={"ICON"}
                  icon={"done"}
                  iconColor={Colors.TAKEN_OK}
                  onPress={() => handleDone(item.id, remaining)}
                />
                <CustomButton
                  type={"ICON"}
                  icon={"edit"}
                  iconColor={Colors.PRIMARY}
                  onPress={() => setModaEditVisible(!modalEditVisible)}
                />
                <EditMeds
                  id={item.id}
                  isVisible={modalEditVisible}
                  onClose={() => setModaEditVisible(!modalEditVisible)}
                />

                <CustomButton
                  type={"ICON"}
                  icon={"delete"}
                  iconColor={Colors.TAKEN_100}
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Medication" />
      <TouchableOpacity
        onPress={() => setModalAddVisible(!modalAddVisible)}
        style={styles.addButton}
        activeOpacity={0.7}
      >
        <AddMeds
          isVisible={modalAddVisible}
          onClose={() => setModalAddVisible(!modalAddVisible)}
        />
        <Image
          source={require("@/assets/icons/plus.png")}
          style={styles.addImage}
        />
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={medications.filter((med) => med.active)}
        renderItem={renderMedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default MedicationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_100,
    height: "70%",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  // add button
  addButton: {
    position: "absolute",
    right: 15,
    width: 40,
    height: 40,
    top: Platform.OS === "ios" ? "5.5%" : "5%",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  addImage: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "center",
    backgroundColor: Colors.LOGO_BACKGROUND,
    tintColor: "#fff",
  },
  medicationContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.BORDERGRAY,
    overflow: "hidden",
  },
  medicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.BORDERGRAY,
  },
  medicationName: {
    fontSize: Platform.OS === "ios" ? 16 : 18,
    color: Colors.TEXT,
    fontFamily: "outfit-medium",
  },
  medicationDetailsSection: {
    display: "flex",
    flexDirection: "column",
  },
  medicationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  medicationGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  medicationText: {
    fontSize: Platform.OS === "ios" ? 14 : 16,
    color: Colors.TEXT_050,
    fontFamily: "outfit",
    marginHorizontal: 10,
  },
  medicationValue: {
    fontSize: Platform.OS === "ios" ? 14 : 16,
    color: Colors.TEXT,
    fontFamily: "outfit-medium",
    marginHorizontal: 5,
  },
  medicationTime: {
    fontSize: Platform.OS === "ios" ? 16 : 18,
    color: Colors.TEXT,
    fontFamily: "outfit-medium",
  },
  medicationDate: {
    fontSize: Platform.OS === "ios" ? 14 : 16,
    color: Colors.TEXT_050,
    fontFamily: "outfit",
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 16,
    tintColor: Colors.PRIMARY,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: Colors.BORDERGRAY,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  modalIntake: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.BORDERGRAY,
    overflow: "hidden",
  },
  modalStyle: {
    minHeight: "50%",
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalTitle: {
    paddingBottom: 20,
    fontSize: Platform.OS === "ios" ? 17 : 19,
    fontFamily: "outfit",
  },
  modalTextDate: {
    paddingLeft: "30%",
    fontFamily: "outfit-medium",
  },
  modalTextTime: {
    paddingLeft: "36%",
    fontFamily: "outfit-medium",
  },
  modalTextStatus: {
    paddingLeft: "26%",
    fontFamily: "outfit-medium",
  },
  col1Modal: {
    flex: 27,
  },
  col2Modal: {
    flex: 48,
  },
  col3Modal: {
    flex: 25,
  },
});
