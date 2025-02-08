import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants/Colors";
import { Intake } from "@/constants/Types";
import CustomHeader from "@/components/ui/CustomHeader";
import DayCard from "@/components/meds/DayCard";
import IntakeDetails from "@/components/meds/IntakeDetails";

// Still have to implement not active(finished medication) agenda

const AgendaScreen = () => {
  const { getAllIntakes, medications } = useGlobalContext();
  const allIntakes = getAllIntakes();
  const flatListRef = useRef<FlatList<any>>(null);

  const groupIntakes = (intakes: Intake[]) => {
    const grouped: Record<string, Intake[]> = intakes.reduce((acc, intake) => {
      const date = new Date(intake.dateTime).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(intake);
      return acc;
    }, {} as Record<string, Intake[]>);

    return Object.entries(grouped)
      .map(([date, intakes]) => ({
        date,
        intakes,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const groupedIntakes = groupIntakes(allIntakes);

  useEffect(() => {
    const today = new Date().toDateString();
    const currentDayIndex = groupedIntakes.findIndex(
      (item) => item.date === today
    );

    if (currentDayIndex !== -1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentDayIndex,
      });
    }
  }, [groupedIntakes]);

  const renderIntakeItem = (item: Intake) => (
    <IntakeDetails
      intakeItem={item}
      medRef={item.intakeRef}
      key={item.intakeRef + item.dateTime}
    />
  );

  const renderDayCard = ({
    item,
  }: {
    item: { date: string; intakes: Intake[] };
  }) => {
    const date = new Date(item.date);
    const day = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
    const dateNum = date.getDate();
    const remaing =
      item.intakes.length -
      item.intakes.filter((intake) => intake.taken).length;

    return (
      <>
        <View style={styles.dateContainer}>
          <DayCard day={day} date={dateNum.toString()} />
          {remaing === 0 ? (
            <Text style={[styles.cardTitle, { color: Colors.LOGO_BACKGROUND }]}>
              All done!
            </Text>
          ) : (
            <Text style={styles.cardTitle}>
              You have {remaing} intake
              {remaing === 1 ? " " : "s "}
              remaing
            </Text>
          )}
        </View>
        <View style={styles.cardContainer}>
          {item.intakes.map(renderIntakeItem)}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Agenda" />
      <FlatList
        data={groupedIntakes}
        renderItem={renderDayCard}
        keyExtractor={(item) => item.date}
        style={{ marginBottom: "10%" }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            No scheduled medications yet.
          </Text>
        }
      />
      <View style={{ marginBottom: Platform.OS === "ios" ? 38 : 56 }} />
    </View>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BORDERGRAY,
    backgroundColor: Colors.BACKGROUND_100,
    marginBottom: 10,
  },
  dateContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cardTitle: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 17 : 21,
    paddingTop: Platform.OS === "ios" ? "6%" : "7.8%",
    marginLeft: 10,
    color: Colors.PRIMARY,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: Colors.EMPTYLIST,
    fontFamily: "outfit",
  },
});
