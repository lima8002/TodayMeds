import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Intake, MedsDB } from "@/constants/Types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "expo-router";
import CustomFloatButton from "@/components/ui/CustomFloatButton";
import DayCard from "@/components/meds/DayCard";
import IntakeDetails from "@/components/meds/IntakeDetails";

const { width } = Dimensions.get("window");

function MainScreen() {
  const router = useRouter();
  const [greeting, setGreeting] = useState<string | null>(null);
  const { getAllIntakes, user, fetchMeds, medications, userDB } =
    useGlobalContext();
  const [todayIntakes, setTodayIntakes] = useState<Intake[]>([]);
  // const [refreshing, setRefreshing] = useState(false);
  const today = new Date().toDateString();

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

  useEffect(() => {
    const intakes = getAllIntakes().filter(
      (intake) => new Date(intake.dateTime).toDateString() === today
    );
    setTodayIntakes(intakes);
  }, [medications, getAllIntakes]);

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   try {
  //     if (user) {
  //       await fetchMeds(user.email || "");
  //     }
  //   } finally {
  //     setRefreshing(false);
  //   }
  // };

  const medicationsWithFutureIntakes = medications.filter((medication) => {
    const futureIntakes = medication.intake.filter((intake) => {
      const intakeDate = new Date(intake.dateTime);
      return intakeDate >= new Date(); // Check if intake is today or in the future
    });
    return futureIntakes.length > 0; //Medication only included if it has at least one future intake
  });

  const renderIntakeItem = (item: Intake) => {
    return (
      <IntakeDetails
        intakeItem={item}
        medRef={item.intakeRef}
        key={item.dateTime}
      />
    );
  };

  const renderMedItem = ({ item }: { item: MedsDB }) => (
    <View
      style={[
        styles.cardContainer,
        styles.shadow,
        {
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginHorizontal: 16,
        },
      ]}
    >
      <Text style={styles.medicationName}>{item.name}</Text>
      <View style={styles.line} />
      <Text style={styles.medicationDetails}>
        Take {item.dosage} pill/tablet every {item.frequency} hour
        {parseInt(item.frequency) > 1 ? "s" : ""}
        {item.withFoodWater ? " with Food/Water." : "."}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{greeting}</Text>
        {userDB?.name && (
          <Text style={styles.subTitle}>Welcome, {userDB.name}!</Text>
        )}
      </View>
      <CustomFloatButton type="ADD" />
      <FlatList
        // data={medications}
        data={medicationsWithFutureIntakes}
        renderItem={renderMedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 50 : 38,
        }}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     colors={Platform.OS === "android" ? [Colors.PRIMARY] : undefined}
        //     tintColor={Platform.OS === "ios" ? Colors.PRIMARY : undefined}
        //   />
        // }
        ListEmptyComponent={
          <View
            style={[
              styles.cardContainer,
              styles.shadow,
              { marginHorizontal: 16 },
            ]}
          >
            <View style={styles.insideCardContainer}>
              <Image
                source={require("@/assets/images/no-meds.png")}
                style={styles.image}
              />
              <Text style={styles.textCardContainer}>
                No medications added yet
              </Text>
            </View>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.contentContainer}>
            <Text style={styles.textMainTitle}>Today's Agenda</Text>
            {todayIntakes.length > 0 ? (
              <View style={[styles.cardContainer, styles.shadow]}>
                {todayIntakes.map(renderIntakeItem)}
              </View>
            ) : (
              <View style={[styles.cardContainer, styles.shadow]}>
                <View style={styles.insideCardContainer}>
                  <DayCard
                    day={new Date()
                      .toLocaleDateString("en-US", { weekday: "short" })
                      .toUpperCase()}
                    date={new Date().getDate().toString()}
                  />
                  <Text style={styles.textCardContainer}>
                    You have no scheduled for today
                  </Text>
                </View>
              </View>
            )}

            <Text style={[styles.textMainTitle, { marginBottom: -19 }]}>
              Instructions
            </Text>
          </View>
        }
      />
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  // styles for the screen
  container: {
    flex: 1,
    marginBottom: 40,
    backgroundColor: "#fff",
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
    fontSize: Platform.OS === "ios" ? 22 : 25,
    fontFamily: "outfit-bold",
    color: "#fff",
  },
  subTitle: {
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: "outfit",
    marginBottom: 20,
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  textMainTitle: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 18 : 20,
    paddingBottom: 5,
  },
  // render med item
  medicationName: {
    fontSize: Platform.OS === "ios" ? 18 : 20,
    color: Colors.TEXT_TITLE,
    fontFamily: "outfit-medium",
    paddingLeft: 10,
    paddingVertical: 9,
  },
  line: {
    height: 0.6,
    width: "96.5%",
    backgroundColor: Colors.BORDERGRAY,
    alignSelf: "center",
  },
  medicationDetails: {
    fontSize: Platform.OS === "ios" ? 14 : 16,
    color: "#000",
    marginTop: 2,
    fontFamily: "outfit",
    paddingLeft: 10,
    paddingVertical: 9.5,
  },
  // card style
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    backgroundColor: "#F4F7FC",
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BORDERGRAY,
  },
  insideCardContainer: {
    marginTop: 25,
    paddingBottom: 25,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textCardContainer: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 16 : 18,
    color: "#000000",
    paddingTop: 20,
    fontFamily: "outfit",
    opacity: Platform.OS === "ios" ? 0.3 : 0.4,
  },

  // empty list image

  image: {
    width: width * 0.5,
    height: width * 0.5,
    opacity: 0.35,
  },

  //shadow
  shadow: {
    ...(Platform.OS === "android"
      ? {
          elevation: 2,
        }
      : {
          shadowColor: Colors.GRAY,
          shadowOffset: { width: 0.8, height: 1.2 },
          shadowOpacity: 0.3,
          shadowRadius: 0.8,
        }),
  },
});
