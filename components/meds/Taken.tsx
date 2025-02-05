import React, { useState } from "react";
import { Image, Platform, StyleSheet } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";
import { Intake } from "@/constants/Types";
import CustomButton from "@/components/ui/CustomButton";

interface TakenProps {
  intakeRef: string;
  intakeId: string;
}

const Taken: React.FC<TakenProps> = ({ intakeRef, intakeId }) => {
  const { medications, updateIntake } = useGlobalContext();

  const medication = medications.find((med) => med.intakeRef === intakeRef);
  if (!medication) {
    return null;
  }

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
  };

  const updateTaken = () => {
    if (!intakeData[parseInt(intakeId)].taken) {
      return (
        <CustomButton
          text="Take"
          type="TAKEN"
          onPress={() => handleTakenToggle(parseInt(intakeId))}
        />
      );
    } else {
      return (
        <Image
          source={require("@/assets/icons/tick.png")}
          tintColor={Colors.TERTIARY}
          style={styles.tick}
        />
      );
    }
  };

  return updateTaken();
};

export default Taken;

const styles = StyleSheet.create({
  tick: {
    width: Platform.OS === "ios" ? 27 : 28.2,
    height: Platform.OS === "ios" ? 27 : 28.2,
    right: 22,
    ...(Platform.OS === "android"
      ? {
          elevation: 3,
        }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        }),
  },
});
