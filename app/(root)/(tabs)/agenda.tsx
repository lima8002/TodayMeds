import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, SectionList, Platform } from "react-native";
import { useMedsContext } from "@/context/MedsProvider";
import { Colors } from "@/constants/Colors";
import { Intake } from "@/constants/Types";
import CustomHeader from "@/components/ui/CustomHeader";
import DayCard from "@/components/meds/DayCard";
import IntakeDetails from "@/components/meds/IntakeDetails";
import EmptyAgenda from "@/components/ui/EmptyAgenda";

const AgendaScreen = () => {
  const { getAllIntakes, medications } = useMedsContext();
  const allIntakes = getAllIntakes();

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
        title: date,
        data: intakes,
      }))
      .sort(
        (a, b) => new Date(a.title).getTime() - new Date(b.title).getTime()
      );
  };

  const groupedIntakes = groupIntakes(allIntakes);

  const renderSectionHeader = ({
    section,
  }: {
    section: { title: string; data: Intake[] };
  }) => {
    const date = new Date(section.title);
    const day = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
    const dateNum = date.getDate();
    const remaining =
      section.data.length -
      section.data.filter((intake) => intake.taken).length;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.dateContainer}>
          <DayCard day={day} date={dateNum.toString()} />
          {remaining === 0 ? (
            <Text style={[styles.cardTitle, { color: Colors.LOGO_BACKGROUND }]}>
              All done!
            </Text>
          ) : (
            <Text style={styles.cardTitle}>
              You have {remaining} intake
              {remaining === 1 ? " " : "s "}
              remaining
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderSectionContent = ({ item }: { item: Intake }) => (
    <IntakeDetails
      intakeItem={item}
      medRef={item.intakeRef}
      key={item.intakeRef + item.dateTime}
    />
  );
  return (
    <View style={styles.container}>
      <CustomHeader title="Agenda" />
      <SectionList
        sections={groupedIntakes}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderSectionContent}
        keyExtractor={(item, index) => item.intakeRef + index.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={{ paddingTop: "10%" }}>
            <EmptyAgenda screenOptions="agenda" />
          </View>
        }
      />
      <View style={{ marginBottom: "12%" }} />
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
    paddingBottom: 60,
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
  headerContainer: {
    backgroundColor: Colors.BACKGROUND_100,
    // backgroundColor: "#fff",
    paddingTop: 5,
    borderRadius: 8,
    // borderWidth: 1,
    borderColor: Colors.BORDERDISABLED,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  dateContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  cardTitle: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 17 : 21,
    paddingTop: Platform.OS === "ios" ? "6%" : "7.8%",
    marginLeft: 10,
    color: Colors.PRIMARY,
  },
});
