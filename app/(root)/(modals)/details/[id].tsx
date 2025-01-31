import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Switch } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import MedicationForm from "@/components/meds/MedicationForm";
import CustomHeader from "@/components/ui/CustomHeader";
import { Colors } from "@/constants/Colors";
import CustomFloatButton from "@/components/ui/CustomFloatButton";
import { format } from "date-fns";
import CustomButton from "@/components/ui/CustomButton";

interface Intake {
  dateTime: string;
  taken: boolean;
}

interface Medication {
  dateTime: string;
  dosage: string;
  frequency: number;
  id: string;
  intake: Intake[];
  name: string;
  quantity: string;
  withFoodWater: boolean;
  active: boolean;
}
const DetailsScreen: React.FC<{ medication: Medication }> = () => {
  const { id } = useLocalSearchParams();
  const { medications } = useGlobalContext();

  const medication = medications.find((med) => med.id === id);

  if (!medication) {
    return (
      <View>
        <Text>Medication not found</Text>
      </View>
    );
  }

  const [intakeData, setIntakeData] = useState<Intake[]>(medication.intake);

  const handleTakenToggle = (index: number) => {
    const updatedIntake = [...intakeData];
    updatedIntake[index].taken = !updatedIntake[index].taken;
    setIntakeData(updatedIntake);
  };

  const renderIntakeItem = ({
    item,
    index,
  }: {
    item: Intake;
    index: number;
  }) => {
    const formattedDateTime = format(new Date(item.dateTime), "MMM dd, h:mm a");
    return (
      <View style={styles.intakeItem}>
        <Text>{formattedDateTime}</Text>
        <Switch
          value={item.taken}
          onValueChange={() => handleTakenToggle(index)}
        />
      </View>
    );
  };
  return (
    //   to implement:
    //   - delete medication button
    //   -update button
    //   - end treatment
    //  - check how many pills/caps have left
    //   - implement a google maps API call to locate near drugstores and pharmacies

    <View style={styles.container}>
      <CustomHeader title="Medication Details" />
      <CustomFloatButton type="CLOSE" />
      <View style={styles.card}>
        <FlatList
          data={intakeData}
          renderItem={renderIntakeItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Dosage:</Text>
                <Text>{medication.dosage}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Quantity:</Text>
                <Text>{medication.quantity}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Frequency:</Text>
                <Text>{medication.frequency} times a day</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>With Food/Water:</Text>
                <Text>{medication.withFoodWater ? "Yes" : "No"}</Text>
              </View>

              <View style={styles.intakeContainer}>
                <Text style={styles.intakeTitle}>Intake Schedule:</Text>
              </View>
            </>
          }
          ListFooterComponent={
            <>
              <CustomButton type="PRIMARY" text="Confirm" onPress={() => {}} />
              <CustomButton type="TERTIARY" text="Cancel" onPress={() => {}} />
            </>
          }
        />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDDISABLED,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: "82%",
  },
  medicationName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 8,
  },
  intakeContainer: {
    marginTop: 16,
  },
  intakeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  intakeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
