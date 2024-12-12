import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import CustomFloatButton from "@/components/ui/CustomFloatButton";

export default function MainScreen() {
  const router = useRouter();
  const [greeting, setGreeting] = useState<string | null>(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{greeting}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.textMainTitle}>Today's Agenda</Text>
          <View style={styles.dayCard}>
            <View style={styles.cardTop}>
              <Text style={styles.dayTitle}>TUE</Text>
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.dayDate}>10</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomFloatButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: Colors.LOGO_BACKGROUND,
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: "15%",
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 24,
    fontFamily: "Outfit-Bold",
    marginBottom: 20,
    color: "#fff",
  },
  textMainTitle: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    paddingBottom: "3%",
  },
  scrollView: {
    // backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
  },
  dayCard: {
    width: "17%",
  },

  cardTop: {
    backgroundColor: Colors.TERTIARY,
    borderWidth: 0.6,
    borderColor: Colors.GRAY,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  cardBottom: {
    backgroundColor: "#fff",
    borderWidth: 0.6,
    borderColor: Colors.GRAY,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  dayDate: {
    fontFamily: "outfit-medium",
    fontSize: 28,
    color: Colors.PRIMARY,
    alignSelf: "center",
  },
  dayTitle: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
});
