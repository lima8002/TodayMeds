import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

import Header from "../../components/home/Header";
import DaysInfo from "../../components/home/DaysInfo";
import MedsInfo from "../../components/home/MedsInfo";


const home = () => {
  return (
    <View>
      {/* Header from the main page */}
      <Header />

      {/* <ScrollView style={{height:'100%'}}> */}
        {/* Days info */}
        <DaysInfo />
        {/* Meds info */}
        <MedsInfo />

      {/* </ScrollView> */}
    </View>
  );
};

export default home;
