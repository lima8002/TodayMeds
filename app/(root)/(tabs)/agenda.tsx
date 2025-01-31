import React, { useMemo, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomHeader from "@/components/ui/CustomHeader";
import DayCard from "@/components/meds/DayCard";
import { Colors } from "@/constants/Colors";

interface Intake {
  dateTime: string;
  medicationName: string;
  taken: boolean;
}

const AgendaScreen = () => {
  const { getAllIntakes } = useGlobalContext();
  const allIntakes = getAllIntakes();
  const flatListRef = useRef<FlatList>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const groupedIntakes = useMemo(() => {
    const grouped: Record<string, Intake[]> = allIntakes.reduce(
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
  }, [allIntakes]);

  useEffect(() => {
    if (!hasScrolled && groupedIntakes.length > 0) {
      const currentDate = new Date().toDateString();
      const currentDayIndex = groupedIntakes.findIndex(
        (item) => new Date(item.date).toDateString() === currentDate
      );

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
  }, [groupedIntakes, hasScrolled]);

  const renderIntakeItem = (item: Intake) => (
    <View style={[styles.intakeItem, { alignItems: "center" }]}>
      <Text style={[styles.intakeTime, { flex: 0.36, textAlign: "right" }]}>
        {new Date(item.dateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Text>
      {/* <View style={styles.intakeDetails}> */}
      <Text style={[styles.medicationName, { textAlign: "left" }]}>
        {item.medicationName}
      </Text>
      <Text
        style={[
          styles.status,
          item.taken ? styles.taken : styles.notTaken,
          { textAlign: "left" },
        ]}
      >
        {item.taken ? "Taken" : "Not Taken"}
      </Text>
      {/* </View> */}
    </View>
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

    return (
      <View style={styles.dayCard}>
        <View style={styles.dayCardContainer}>
          <DayCard day={day} date={dateNum.toString()} />
        </View>
        <View style={styles.intakesList}>
          {item.intakes.map((intake, index) => (
            <React.Fragment key={`${intake.dateTime}-${index}`}>
              {renderIntakeItem(intake)}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="Agenda" />
      <FlatList
        ref={flatListRef}
        data={groupedIntakes}
        renderItem={renderDayCard}
        keyExtractor={(item) => item.date}
        style={{ marginBottom: "10%" }}
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
  },
  dayCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderColor: Colors.BORDERGRAY,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dayCardContainer: {
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
    backgroundColor: "#fff",
  },
  intakesList: {
    flex: 1,
    backgroundColor: "#fff",
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,
  },
  intakeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13.5,
    // marginBottom: -1,
    // borderBottomWidth: 0.5,
    // borderBottomColor: Colors.BORDERGRAY,
  },
  intakeTime: {
    fontFamily: "outfit-medium",
    fontSize: 14,
    color: Colors.PRIMARY,
    marginRight: 10,
  },
  intakeDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  medicationName: {
    fontFamily: "outfit",
    fontSize: 14,
    flex: 1,
  },
  status: {
    fontFamily: "outfit-medium",
    fontSize: 12,
    marginLeft: 10,
  },
  taken: {
    color: "green",
  },
  notTaken: {
    color: "red",
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
