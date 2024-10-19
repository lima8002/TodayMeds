import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: "8%",
   
  },
  title: {
    fontFamily: "outfit-medium",
    fontSize: 24,
    color: Colors.PRIMARY
  },
});
