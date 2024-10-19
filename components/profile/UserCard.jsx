import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Colors } from "../../constants/Colors";

const UserCard = () => {
  const { userDB } = useGlobalContext();

  return (
    <View style={styles.containerImage}>
      {userDB?.photo ? (
        <Image
          source={{
            uri: userDB?.photo,
          }}
          style={[styles.imageStyle, styles.shadow]}
        />
      ) : (
        <View style={[styles.imageStyle, styles.shadow]}>
          <Ionicons
            name="person-circle"
            size={120}
            color={Colors.TERTIARY}
            style={styles.iconsStyle}
          />
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.cardTop}>
          <Text style={styles.textTitle}>
            {userDB?.name ? userDB?.name : userDB.email}
          </Text>
        </View>

        {userDB?.name || userDB?.dob || userDB?.phone ? (
          <View style={styles.cardBottom}>
            <Text style={styles.textSubTitle}>Email: {userDB?.email}</Text>
            <Text>Phone: {userDB.phone}</Text>
            <Text>Date of birth: {userDB.dob}</Text>
          </View>
        ) : (
          <View style={styles.cardBottom}>
            <Text> </Text>
            <Text style={[styles.textSubTitle, { color: Colors.GRAY }]}>
              No user details found.
            </Text>
            <Text> </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    borderWidth: 0.6,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    marginTop: 15,
    paddingBottom: 20,
  },
  containerImage: {
    marginHorizontal: 20, // borderWidth: 1,
    // borderColor: "silver",
    // borderRadius: 15,
    marginTop: "30%",
    // paddingBottom: 20,
  },
  cardTop: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.TERTIARY,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
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
