import { View, Image } from "react-native";
import React from "react";

const NotFound = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("@/assets/images/main-logo.png")}
        style={{ width: "100%", height: 150 }}
      />
    </View>
  );
};

export default NotFound;
