import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";


import CustomHeader from "../../components/ui/CustomHeader";
import UserCard from "../../components/profile/UserCard";
import LogOut from "../../components/profile/LogOut";
import EditProfile from "../../components/profile/EditProfile";

const profile = () => {


  return (
    <View style={styles.container}>
      {/* Custom header for the tab screen */}
      <CustomHeader title={"Profile"} />
      {/* User Profile Card */}
      <UserCard />
      {/* User Profile Edit */}
      <EditProfile />
      {/* Logout Button */}
      <LogOut />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "`100%",
  },

});
