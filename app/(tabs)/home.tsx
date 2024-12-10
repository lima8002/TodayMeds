import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";

export default function MainScreen() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");

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

  const handleAddMedication = () => {
    router.push("/add");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{greeting}</Text>
      <View style={styles.subContainer}></View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
        <IconSymbol name="plus.circle.fill" size={56} color="#007AFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: "15%",
    backgroundColor: Colors.LOGO_BACKGROUND,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  doseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  doseTime: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
    color: "#007AFF",
  },
  doseDetails: {
    flex: 1,
  },
  doseMedication: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  doseInstructions: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  markAsTakenButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  markAsTakenText: {
    color: "white",
    fontWeight: "500",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
