import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import MedsCard from "./MedsCard";
import DetailsButton from "@/components/medication/DetailsButton";

const MedsInfo = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textMainTitle}>Your Medication</Text>
      </View>

      {/* Details button for medication details */}
      <DetailsButton />

      <MedsCard />
    </View>
  );
};

export default MedsInfo;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginTop: "5%",
  },

  textMainTitle: {
    marginHorizontal: 20,
    fontFamily: "outfit-medium",
    fontSize: 20,
    paddingBottom: "3%",
  },
  shadow: {
    shadowColor: Colors.GRAY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
});
