import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { IconSymbol } from "./IconSymbol";
import { Colors } from "@/constants/Colors";

interface CustomFloatButtonProps {
  type?: "ADD" | "CLOSE";
}

const CustomFloatButton: React.FC<CustomFloatButtonProps> = ({
  type = "ADD",
}) => {
  const { width } = useWindowDimensions();
  if (type === "ADD") {
    const handleAddMedication = () => {
      router.push("/add");
    };
    return (
      <View style={{ flex: 1, position: "absolute" }}>
        <TouchableOpacity
          onPress={handleAddMedication}
          style={{ right: width * 0.05 }}
          // className="flex absolute items-center justify-center bg-black rounded-full w-12 h-12"
        >
          <Image
            source={require("@/assets/icons/plus.png")}
            tintColor={"#5E75CA"}
            resizeMode="contain"
            className="size-6"
          />
        </TouchableOpacity>
      </View>
    );
  }

  if (type === "CLOSE") {
    const handleClose = () => {
      router.back();
    };
    return (
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Image
          source={require("@/assets/icons/xmark.png")}
          tintColor={"#5E75CA"}
          resizeMode="contain"
          className="size-6"
        />
      </TouchableOpacity>
    );
  }
};

export default CustomFloatButton;

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 28,
    backgroundColor: "#fff",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },

  closeButton: {
    position: "absolute",
    top: 48,
    right: 20,
  },
});
