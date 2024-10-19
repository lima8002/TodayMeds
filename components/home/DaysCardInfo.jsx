import { View, Text, StyleSheet } from "react-native";
import React, { isValidElement, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import moment from "moment";

const DaysCardInfo = ({ selected, date }) => {
  const [dayDate, setDayDate] = useState();
  const [titleDate, setTitleDate] = useState(null);

  useEffect(() => {
    setDayDate(parseInt(selected + 1));
    setTitleDate(moment(date).format("dddd"));
  }, [selected]);

  return (
    <View style={styles.container}>
      <View style={[styles.containerDay, styles.shadow]}>
        <Text style={styles.dayStyle}>{dayDate}</Text>
      </View>
      <View style={[styles.containerMed, styles.shadow]}>
        <Text style={styles.medStyle}>{titleDate}</Text>
        <Text style={styles.notFound}>No medication found</Text>
      </View>
    </View>
  );
};

export default DaysCardInfo;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    borderWidth: 0.6,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    marginTop: 10,
    paddingBottom: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  containerDay: {
    // marginHorizontal: 12,
    // borderWidth: 0.6,
    // borderColor: Colors.GRAY,
    // borderRadius: 15,
    marginTop: 5,
    paddingBottom: 5,
    width: "20%",
  },
  containerMed: {
    // borderWidth: 0.6,
    // borderColor: Colors.GRAY,
    // borderRadius: 15,
    marginTop: 25,
    paddingBottom: 5,
  },
  dayStyle: {
    fontFamily: "outfit",
    fontSize: 40,
    color: Colors.PRIMARY,
    alignSelf: "center",
    // paddingHorizontal:5,
  },
  medStyle: {
    fontFamily: "outfit",
    fontSize: 22,
    color: Colors.PRIMARY,
    // alignSelf: "center",
    paddingHorizontal: 5,
  },
  cardBottom: {
    paddingHorizontal: 20,
  },
  notFound: {
    paddingVertical: "10%",
    alignSelf: "center",
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  shadow: {
    shadowColor: Colors.GRAY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    elevation: 1,
  },
});
