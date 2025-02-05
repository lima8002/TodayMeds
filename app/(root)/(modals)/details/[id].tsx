import React, { useState, useMemo, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Switch } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";
import { format } from "date-fns";
import CustomFloatButton from "@/components/ui/CustomFloatButton";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomButton from "@/components/ui/CustomButton";

import { Intake } from "@/constants/Types";
import Taken from "@/components/meds/Taken";

const DetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { medications } = useGlobalContext();

  const medication = medications.find((med) => med.id === id);
  if (!medication) {
    return null;
  }

  const [intakeData, setIntakeData] = useState<Intake[]>(
    medication.intake || []
  );

  const formattedIntakeData = intakeData.map((item) => ({
    ...item,
    formattedDateTime: format(new Date(item.dateTime), "MMM dd, h:mm a"),
  }));

  const remainingPills = useMemo(() => {
    const takenPills = intakeData.filter((item) => item.taken).length;
    return parseInt(medication.quantity || "0", 10) - takenPills;
  }, [intakeData, medication.quantity]);

  const renderIntakeItem = ({
    item,
  }: {
    item: {
      intakeId: string;
      dateTime: string;
      taken: boolean;
      formattedDateTime: string;
    };
    index: number;
  }) => (
    <View style={styles.intakeItem}>
      <Text>{item.formattedDateTime}</Text>
      <Taken intakeId={item.intakeId} intakeRef={medication.intakeRef} />
    </View>
  );

  const medicationDetails = [
    {
      label: "Dosage:",
      value: medication.dosage,
    },
    {
      label: "Quantity:",
      value: medication.quantity,
    },
    {
      label: "Frequency:",
      value: `${medication.frequency} times/day`,
    },
    {
      label: "With Food/Water:",
      value: medication.withFoodWater ? "Yes" : "No",
    },
    {
      label: "Remaining:",
      value: remainingPills.toString(),
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader title="Medication Details" />
      <CustomFloatButton type="CLOSE" />
      <View>
        <FlatList
          data={formattedIntakeData}
          renderItem={renderIntakeItem}
          keyExtractor={(item) => item.intakeId}
          showsVerticalScrollIndicator={false}
          style={styles.card}
          ListHeaderComponent={
            <>
              <Text style={styles.medicationName}>{medication.name}</Text>

              <View style={styles.detailsGrid}>
                {medicationDetails.map((detail, index) => (
                  <View key={index} style={styles.detailItem}>
                    <Text style={styles.infoLabel}>{detail.label}</Text>
                    <Text style={styles.infoValue}>{detail.value}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actionButtons}>
                <CustomButton
                  type="ALERT"
                  text="Delete Medication"
                  onPress={() => {
                    // Add deletion logic here
                  }}
                />
                <CustomButton
                  type="SECONDARY"
                  text="Update"
                  onPress={() => {
                    // Add update logic here
                  }}
                />
                <CustomButton
                  type="TERTIARY"
                  text="End Treatment"
                  onPress={() => {
                    // Add end treatment logic here
                  }}
                />
              </View>
              <Text style={styles.intakeTitle}>Intake Schedule:</Text>
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
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  medicationName: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    marginBottom: 16,
    textAlign: "center",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailItem: {
    width: "48%", // Adjust for two columns
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "outfit-bold",
    width: "50%",
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "outfit",
    width: "50%",
  },
  intakeTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    marginBottom: 12,
    marginTop: 16,
  },
  intakeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.BORDERGRAY,
  },
  actionButtons: {
    marginBottom: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
