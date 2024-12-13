import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const StartPage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/main-logo.png")}
        style={styles.imageStyle}
      />
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  imageStyle: {
    resizeMode: "contain",

    width: "100%",
    height: "100%",
  },
});
