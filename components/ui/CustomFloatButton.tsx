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
      <TouchableOpacity
        onPress={handleAddMedication}
        style={styles.addButton}
        activeOpacity={0.7}
      >
        <Image
          source={require("@/assets/icons/plus.png")}
          style={styles.addImage}
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
        <Image
          source={require("@/assets/icons/xmark.png")}
          style={styles.closeImage}
        />
      </TouchableOpacity>
    );
  }
};

export default CustomFloatButton;

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    top: 50,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  addImage: {
    width: 40,
    height: 40,
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    tintColor: Colors.LOGO_BACKGROUND,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  closeImage: {
    marginTop: 3,
    padding: 2,
    width: 28,
    height: 28,
    tintColor: Colors.PRIMARY,
    resizeMode: "contain",
  },
});
