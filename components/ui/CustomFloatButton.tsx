import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { router, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";

interface CustomFloatButtonProps {
  type?: "ADD" | "CLOSE" | "ADD2";
}

const CustomFloatButton: React.FC<CustomFloatButtonProps> = ({
  type = "ADD",
}) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  if (type === "ADD" || type === "ADD2") {
    const handleAddMedication = () => {
      router.push("/add");
    };
    return (
      <TouchableOpacity
        onPress={handleAddMedication}
        style={[
          styles.addButton,
          type === "ADD" ? styles.addTop : styles.add2Top,
        ]}
        activeOpacity={0.7}
      >
        <Image
          source={require("@/assets/icons/plus.png")}
          style={[
            styles.addImage,
            type === "ADD" ? styles.add1Style : styles.add2Style,
          ]}
        />
      </TouchableOpacity>
    );
  }

  if (type === "CLOSE") {
    const handleClose = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      } else {
        router.push("/medication");
        return false;
      }
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
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  addImage: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    tintColor: Colors.LOGO_BACKGROUND,
    resizeMode: "center",
  },
  addTop: {
    top: Platform.OS === "ios" ? "8%" : "7%",
  },
  add2Top: {
    top: Platform.OS === "ios" ? "5.5%" : "5%",
  },
  add1Style: {
    backgroundColor: "#fff",
    tintColor: Colors.LOGO_BACKGROUND,
  },
  add2Style: {
    backgroundColor: Colors.LOGO_BACKGROUND,
    tintColor: "#fff",
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
