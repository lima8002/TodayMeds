import React, { useEffect, useState } from "react";
import { Alert, Image, Platform, StyleSheet } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";
import { Intake } from "@/constants/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/ui/CustomButton";

interface TakenProps {
  intakeRef: string;
  intakeId: string;
  type?: string;
}

const Taken: React.FC<TakenProps> = ({ intakeRef, intakeId, type }) => {
  const {
    medications,
    updateIntake,
    autosave,
    getAllIntakes,
    setAutosave,
    updateMedication,
  } = useGlobalContext();

  const medication = medications.find((med) => med.intakeRef === intakeRef);

  if (!medication) {
    return null;
  }

  useEffect(() => {
    if (medication) {
      setIntakeData(medication.intake || []);
    }
    getAllIntakes();
  }, [medications, getAllIntakes]);

  const showAlert = (index: number) => {
    if (intakeData[index].taken && type === "UNDO") {
      Alert.alert(
        "Do you want to undo the medication?",
        "\nJust to make sure your are undoing the intake",
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
            },
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              handleTakenToggle(index);
            },
          },
        ],
        { cancelable: false }
      );
      return;
    }

    if (autosave) {
      handleTakenToggle(index);
      return;
    }

    Alert.alert(
      "Did you take the medication?",
      "\nIf you don't want to see this alert \nagain, select 'Autosave' " +
        "option.\n You can always change on the profile screen. \n \n " +
        "If you mistakenly pressed 'Take'\n after Autosave is on, you can " +
        "go\n to Medications > Intake, and then\n you can fix it there. ",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            handleTakenToggle(index);
          },
        },
        {
          text: "Autosave",
          onPress: async () => {
            setAutosave(true);
            handleTakenToggle(index);
            try {
              await AsyncStorage.setItem("Autosave", "true");
              console.log("Autosave enabled");
            } catch (error) {
              console.error("Error saving Autosave:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const [intakeData, setIntakeData] = useState<Intake[]>(
    medication.intake || []
  );

  const handleTakenToggle = (index: number) => {
    const updatedIntake = [...intakeData];
    updatedIntake[index].taken = !updatedIntake[index].taken;
    setIntakeData(updatedIntake);
    updateIntake(
      medication.id,
      updatedIntake[index].intakeId,
      updatedIntake[index].taken
    );
    getRemaining();
  };
  const getRemaining = () => {
    const remaining = getAllIntakes().filter(
      (intake) => intakeRef === intake.intakeRef && !intake.taken
    ).length;
    if (remaining === 0) {
      Alert.alert(
        "🎉 Well done 🎉",
        "You have no remaining pills/tablet for " + `${medication.name}`,
        [
          {
            text: "OK",
            onPress: () => {
              updateMedication(medication.id, { active: false });
            },
          },
        ]
      );
    }
  };

  const updateTaken = () => {
    if (!intakeData[parseInt(intakeId)].taken) {
      return (
        <CustomButton
          text="Take"
          type="TAKEN"
          onPress={() => showAlert(parseInt(intakeId))}
        />
      );
    } else {
      if (intakeData[parseInt(intakeId)].taken && type !== "UNDO") {
        return (
          <Image
            source={require("@/assets/icons/tick.png")}
            tintColor={Colors.TERTIARY}
            style={styles.done}
          />
        );
      } else {
        return (
          <CustomButton
            text="Undo"
            type="TAKEN"
            onPress={() => showAlert(parseInt(intakeId))}
            otherStyles={{
              backgroundColor: Colors.TERTIARY,
              borderColor: Colors.TERTIARY,
            }}
            otherTextStyles={{ marginHorizontal: 18 }}
          />
        );
      }
    }
  };

  return updateTaken();
};

export default Taken;

const styles = StyleSheet.create({
  done: {
    width: Platform.OS === "ios" ? 27 : 28.2,
    height: Platform.OS === "ios" ? 27 : 28.2,
    right: 22,
  },
});
