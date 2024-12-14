import { StyleSheet, TouchableOpacity, Platform } from "react-native";
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
  if (type === "ADD") {
    const handleAddMedication = () => {
      router.push("/add");
    };
    return (
      <TouchableOpacity onPress={handleAddMedication}>
        <IconSymbol
          name="plus.circle.fill"
          size={56}
          color={Colors.LOGO_BACKGROUND}
          style={styles.addButton}
        />
      </TouchableOpacity>
    );
  }

  if (type === "CLOSE") {
    const handleClose = () => {
      router.back();
    };
    return (
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <IconSymbol
          name="xmark"
          size={Platform.OS === "ios" ? 24 : 32}
          color={Colors.PRIMARY}
          style={Platform.OS === "ios" ? { marginTop: 10 } : { marginTop: 0 }}
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
