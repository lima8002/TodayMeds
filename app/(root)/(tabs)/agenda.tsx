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
  const { getAllIntakes } = useGlobalContext();
  const allIntakes = getAllIntakes();
  const flatListRef = useRef<FlatList>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const groupIntakes = (intakes: Intake[]) => {
    const today = new Date();

    const filteredIntakes = intakes.filter((intake) => {
      const intakeDate = new Date(intake.dateTime);
      return intakeDate >= today;
    });

    const grouped: Record<string, Intake[]> = filteredIntakes.reduce(
      (acc, intake) => {
        const date = new Date(intake.dateTime).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(intake);
        return acc;
      },
      {} as Record<string, Intake[]>
    );

    return Object.entries(grouped)
      .map(([date, intakes]) => ({
        date,
        intakes,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const groupedIntakes = groupIntakes(allIntakes);

  useEffect(() => {
    if (!hasScrolled && groupedIntakes.length > 0) {
      const currentDate = new Date().toDateString();
      const currentDayIndex = groupedIntakes.findIndex(
        (item) => new Date(item.date).toDateString() === currentDate
      );

      if (new Date().toString() <= currentDate) {
        console.log("no scroll");
      } else {
        const indexToScrollTo =
          currentDayIndex !== -1 ? currentDayIndex : groupedIntakes.length - 1;

        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: indexToScrollTo,
            animated: true,
            viewPosition: 0,
          });
          setHasScrolled(true);
        }, 100);
      }
    }
  }, [hasScrolled]);

  const renderIntakeItem = (item: Intake) => (
    <IntakeDetails
      intakeItem={item}
      medRef={item.intakeRef}
      key={item.dateTime}
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
        ref={flatListRef}
        data={groupedIntakes}
        renderItem={renderDayCard}
        keyExtractor={(item) => item.date}
        style={{ marginBottom: "10%" }}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 6 : 38,
          padding: 16,
        }}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BORDERGRAY,
    backgroundColor: Colors.BACKGROUND_100,
  },
  dateContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
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

export default AgendaScreen;
