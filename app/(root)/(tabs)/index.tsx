import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Intake, MedsDB } from "@/constants/Types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "expo-router";
import IntakeDetails from "@/components/meds/IntakeDetails";
import EmptyMeds from "@/components/ui/EmptyMeds";
import EmptyAgenda from "@/components/ui/EmptyAgenda";
import AddMeds from "@/components/modals/AddMeds";
import CustomButton from "@/components/ui/CustomButton";

const { width } = Dimensions.get("window");

function MainScreen() {
  const router = useRouter();
  const [greeting, setGreeting] = useState<string | null>(null);
  const {
    getAllIntakes,
    user,
    userDB,
    medications,
    showQtLeft,
    showFindMedsT,
    photoProfile,
  } = useGlobalContext();
  const [todayIntakes, setTodayIntakes] = useState<Intake[]>([]);
  const [todayMeds, setTodayMeds] = useState<MedsDB[]>([]);
  const todayDate = new Date().getDate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
    const dailyMeds = medications.filter(
      (medication) =>
        medication.active &&
        medication.intake.some(
          (intake) => new Date(intake.dateTime).getDate() === todayDate
        )
    );

    const dailyIntakes = getAllIntakes().filter(
      (intake) => new Date(intake.dateTime).getDate() === todayDate
    );

    console.log(user?.email);

    setTodayMeds(dailyMeds);
    setTodayIntakes(dailyIntakes);
  }, [medications, getAllIntakes]);

  const renderIntakeItem = (item: Intake) => {
    return (
      <IntakeDetails
        intakeItem={item}
        medRef={item.intakeRef}
        key={item.intakeRef + item.dateTime}
      />
    );
  };

  const renderMedItem = ({ item }: { item: MedsDB }) => {
    let remaining =
      (item.intake.length -
        item.intake.filter((intake) => intake.taken === true).length) *
      parseInt(item.dosage);

    return (
      <View
        style={[
          styles.cardContainer,
          styles.shadow,
          {
            justifyContent: "flex-start",
            alignItems: "flex-start",
          },
        ]}
      >
        <Text style={styles.medicationName}>{item.name}</Text>
        <View style={styles.line} />
        <Text style={styles.medicationDetails}>
          Take {item.dosage} pill/tablet every {item.frequency} hour
          {item.frequency > 1 ? "s" : ""}
          {item.withFoodWater ? " with Food/Water." : "."}
        </Text>
        {showQtLeft ? (
          <>
            <View style={styles.line} />
            <Text style={styles.medicationDetails}>
              {remaining} pills/tablets remaining.
            </Text>
          </>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{ flexDirection: "row" }}>
          {photoProfile && photoProfile.length > 2 && (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={styles.shadow}
            >
              <Image
                source={{
                  uri: photoProfile,
                }}
                style={styles.profilePhoto}
              />
            </TouchableOpacity>
          )}

          <View style={{ flexDirection: "column" }}>
            <Text style={styles.title}>{greeting}</Text>
            <Text style={styles.subTitle}>
              Welcome, {userDB?.name ? userDB?.name : user?.email}!
            </Text>
          </View>
        </View>
      </View>
      <>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.addButton}
          activeOpacity={0.7}
        >
          <AddMeds
            isVisible={modalVisible}
            onClose={() => setModalVisible(!modalVisible)}
          />
          <Image
            source={require("@/assets/icons/plus.png")}
            style={styles.addImage}
          />
        </TouchableOpacity>
      </>
      <FlatList
        data={todayMeds}
        renderItem={renderMedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 50 : 38,
          marginHorizontal: 16,
        }}
        ListEmptyComponent={<EmptyMeds />}
        ListHeaderComponent={
          <View style={styles.contentContainer}>
            <Text style={styles.textMainTitle}>Today's Agenda</Text>
            {todayIntakes.length > 0 ? (
              <View style={[styles.cardContainer, styles.shadow]}>
                {todayIntakes.map(renderIntakeItem)}
              </View>
            ) : (
              <EmptyAgenda />
            )}

            <Text style={[styles.textMainTitle, { marginBottom: -19 }]}>
              Instructions
            </Text>
          </View>
        }
        ListFooterComponent={
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {showFindMedsT && (
              <CustomButton
                type="ICON"
                icon={"locationT"}
                iconColor={Colors.TAKEN_200}
                onPress={() => {
                  Linking.openURL(
                    "https://www.google.com/maps/search/?api=1&query=pharmacy+near+me"
                  ).catch((err) => console.error("An error occurred", err));
                }}
                otherStyles={{
                  width: "45%",
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: Colors.TEXT_100,
                }}
              />
            )}
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
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingTop: "15%",
    alignItems: "flex-start",
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: Colors.GRAY,
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
    paddingVertical: 16,
  },
  textMainTitle: {
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 18 : 20,
    color: Colors.TEXT,
    paddingBottom: 5,
  },
  // add button
  addButton: {
    position: "absolute",
    right: 15,
    width: 40,
    height: 40,
    top: Platform.OS === "ios" ? "8%" : "7%",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  addImage: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    tintColor: Colors.LOGO_BACKGROUND,
    resizeMode: "center",
  },
  // render med item
  medicationName: {
    fontSize: Platform.OS === "ios" ? 16 : 18,
    color: Colors.TEXT,
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
    color: Colors.TEXT_050,
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
    backgroundColor: Colors.BACKGROUND_100,
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
