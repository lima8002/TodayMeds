import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import DaysCard from "./DaysCard";

const DaysInfo = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textMainTitle}>Your Agenda</Text>
      </View>

      <DaysCard />

    </View>
  );
};

export default DaysInfo;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginTop: "5%",
  },

  cardBottom: {
    paddingHorizontal: 20,
  },
  imageStyle: {
    justifyContent: "center",
    width: 98,
    height: 98,
    borderRadius: 99,
    borderColor: "silver",
    marginTop: "-35%",
    backgroundColor: "white",
  },
  iconsStyle: {
    marginLeft: "-11.18%",
    marginTop: "-10.8%",
  },
  textMainTitle: {
    marginHorizontal: 20,
    fontFamily: "outfit-medium",
    fontSize: 20,
    paddingBottom: "3%",
  },
  textTitle: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    color: "#fff",
  },
  textSubTitle: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  shadow: {
    shadowColor: Colors.GRAY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
});
