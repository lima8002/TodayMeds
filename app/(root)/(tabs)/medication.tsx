import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MedsDB } from "@/constants/Types";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomFloatButton from "@/components/ui/CustomFloatButton";
import CustomButton from "@/components/ui/CustomButton";

const MedicationScreen = () => {
  const { medications } = useGlobalContext();
  const [selectedMedicationId, setSelectedMedicationId] = useState<
    string | null
  >(null);
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

  const renderMedItem = ({ item }: { item: MedsDB }) => {
    const rotateValue = animatedValues.current[item.id]?.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"],
    });

    const handlePress = () => {
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
    };

    return (
      <View style={styles.medicationItem}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.medicationContent}>
            <View style={styles.row}>
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
            <View>
              <Text style={styles.medicationDetails}>
                Dosage: {item.dosage}
              </Text>
              <Text style={styles.medicationDetails}>
                Frequency: {item.frequency}
              </Text>
              <Text style={styles.medicationDetails}>
                Quantity: {item.quantity}
              </Text>
              <Text style={styles.medicationDetails}>
                Taken with food/water: {item.withFoodWater ? "Yes" : "No"}
              </Text>
            </View>

            {selectedMedicationId === item.id && (
              <>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    type={"ICON"}
                    icon={"calendar"}
                    iconColor={Colors.PRIMARY}
                    onPress={() => {}}
                  />
                  <CustomButton
                    type={"ICON"}
                    icon={"tick"}
                    iconColor={Colors.TAKEN_OK}
                    onPress={() => {}}
                  />
                  <CustomButton
                    type={"ICON"}
                    icon={"edit"}
                    iconColor={Colors.PRIMARY}
                    onPress={() => {}}
                  />
                  <CustomButton
                    type={"ICON"}
                    icon={"delete"}
                    iconColor={Colors.ALERT}
                    onPress={() => {}}
                  />
                </View>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Medication" />
      <CustomFloatButton type="ADD2" />
      <FlatList
        data={medications}
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
    backgroundColor: "#fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  medicationItem: {
    backgroundColor: Colors.BACKGROUND_100,
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    // shadowColor: Colors.SHADOW,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 3,
    borderWidth: 1,
    borderColor: Colors.BORDERGRAY,
  },

  medicationContent: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  medicationName: {
    fontSize: 18,
    color: Colors.TEXT_TITLE,
    fontFamily: "outfit-bold",
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 16,
    tintColor: Colors.PRIMARY,
  },

  activePill: {
    backgroundColor: Colors.PRIMARY,
  },
  medicationDetails: {
    fontSize: 14,
    color: Colors.GRAY,
    fontFamily: "outfit",
    marginVertical: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
    fontSize: 14,
  },
});
