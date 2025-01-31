import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Colors } from "@/constants/Colors";
import DayCard from "@/components/meds/DayCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomFloatButton from "@/components/ui/CustomFloatButton";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  dateTime: string;
  quantity: string;
  withFoodWater: boolean;
  active: boolean;
  intake: {
    dateTime: string;
    taken: boolean;
  }[];
}

interface Intake {
  dateTime: string;
  medicationName: string;
  taken: boolean;
}

export default function MainScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight =
    Platform.OS === "ios" ? insets.bottom - 42 : 56 + insets.bottom;
  const [greeting, setGreeting] = useState<string | null>(null);
  const { getAllIntakes } = useGlobalContext();
  const allIntakes: Intake[] = getAllIntakes();
  const { medications } = useGlobalContext();
  const router = useRouter();

  const todayIntakes = useMemo(() => {
    const today = new Date().toDateString();
    return allIntakes.filter(
      (intake) => new Date(intake.dateTime).toDateString() === today
    );
  }, [allIntakes]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const renderIntakeItem = (item: Intake) => (
    <View style={styles.intakeItem} key={item.dateTime}>
      <Text style={styles.intakeTime}>
        {new Date(item.dateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Text>
      {/* <View style={styles.intakeDetails}> */}
      <Text style={styles.intakeMedName}>{item.medicationName}</Text>
      <Text
        style={[styles.status, item.taken ? styles.taken : styles.notTaken]}
      >
        {item.taken ? "Taken" : "Not Taken"}
      </Text>
      {/* </View> */}
    </View>
  );

  const renderMedicationItem = ({ item }: { item: Medication }) => (
    <TouchableOpacity
      style={styles.medicationItem}
      onPress={() => router.push(`/(modals)/details/${item.id}`)}
    >
      <View style={styles.medicationContent}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <Text style={styles.medicationDetails}>Dosage: {item.dosage}</Text>
        <Text style={styles.medicationDetails}>
          Frequency: {item.frequency}
        </Text>
        <Text style={styles.medicationDetails}>Quantity: {item.quantity}</Text>
        <Text style={styles.medicationDetails}>
          With Food/Water: {item.withFoodWater ? "Yes" : "No"}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={26} color={Colors.PRIMARY} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{greeting}</Text>
      </View>

      <FlatList
        data={medications}
        renderItem={renderMedicationItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, marginBottom: tabBarHeight }}
        ListEmptyComponent={
          <View className="flex justify-center items-center bg-white rounded-2xl m-3 py-3 pb-6 shadow-sm elevation-md">
            <Image
              source={require("@/assets/images/no-meds.png")}
              className="size-60 opacity-35"
            />
            <Text className="text-center mt-50 text-lg text-emptylist font-outfit opacity-35">
              No medications added yet
            </Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.contentContainer}>
            <Text style={styles.textMainTitle}>Today's Agenda</Text>
            <View className="flex flex-row justify-center items-center bg-white rounded-2xl m-3 py-3 pb-6 shadow-sm elevation-md">
              <View style={styles.intakesList}>
                {todayIntakes.length > 0 ? (
                  todayIntakes.map(renderIntakeItem)
                ) : (
                  <View style={styles.dayCardContainer}>
                    <DayCard
                      day={new Date()
                        .toLocaleDateString("en-US", { weekday: "short" })
                        .toUpperCase()}
                      date={new Date().getDate().toString()}
                    />
                    <Text className="text-center text-lg text-emptylist pt-5 font-outfit opacity-35">
                      You have no scheduled for today
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View className="flex-row justify-between">
              <Text className="font-outfit-medium text-xl px-3">
                Your Medication
              </Text>
            </View>
          </View>
        }
      />
      <CustomFloatButton type="ADD" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 87,
    backgroundColor: Colors.BACKGROUND_100,
    // backgroundColor: "#fff",
  },
  titleContainer: {
    backgroundColor: Colors.LOGO_BACKGROUND,
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: "15%",
  },
  title: {
    paddingHorizontal: 12,
    lineHeight: 32,
    fontSize: 22,
    fontFamily: "outfit-bold",
    marginBottom: 20,
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  textMainTitle: {
    fontFamily: "outfit-medium",
    fontSize: 17,
    padding: 10,
  },

  todayAgenda: {
    flexDirection: "row",
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
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#fff",
  },
  intakesList: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  intakeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13.5,
    marginBottom: -1,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.BORDERGRAY,
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
  intakeMedName: {
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
  noIntakesText: {
    fontSize: 16,
    fontFamily: "outfit",
    color: Colors.EMPTYLIST,
    paddingVertical: 32,
    paddingRight: 20,
    textAlign: "center",
  },

  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,

    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
    marginBottom: 5,
  },
  medicationDetails: {
    fontSize: 14,
    color: "#000",
    marginTop: 2,
    fontFamily: "outfit",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: Colors.EMPTYLIST,
    fontFamily: "outfit",
  },
});
