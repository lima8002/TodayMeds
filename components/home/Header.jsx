import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { userDB, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"small"}
        color={"black"}
        style={{ height: "90%", justifyContent: "center" }}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View>
            {userDB?.photo ? (
              <Image
                source={{ uri: userDB?.photo }}
                resizeMode="cover"
                style={styles.imageStyle}
              />
            ) : (
              <View style={styles.imageStyle}>
                <Ionicons name="person-circle" size={45} color={"#fff"} />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.textColor}>Welcome back,</Text>

            <Text style={[styles.userText, styles.textColor]}>
              {userDB?.name ? userDB?.name : userDB?.email}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default Header;

const styles = StyleSheet.create({
  container: {
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
  imageStyle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderColor: "silver",
    berderWidth: 2,
  },
  textColor: {
    color: "#fff",
  },
  userText: {
    fontSize: 19,
    fontFamily: "outfit-medium",
  },
  searchBarStyle: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    marginTop: 15,
    borderRadius: 8,
  },
  textInputSearch: {
    fontFamily: "outfit",
  },
});
