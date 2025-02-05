import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors } from "../../constants/Colors";

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  type?:
    | "PRIMARY"
    | "SECONDARY"
    | "TERTIARY"
    | "QUATERNARY"
    | "ON"
    | "OFF"
    | "ALERT"
    | "TAKEN";
  bgColor?: string;
  fgColor?: string;
  otherStyles?: ViewStyle;
  otherTextStyles?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  otherStyles,
  otherTextStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        type === "TAKEN" ? null : styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
        otherStyles,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}` as keyof typeof styles],
          fgColor ? { color: fgColor } : {},
          otherTextStyles,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    minWidth: "55%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    height: 46,
  },
  text: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    textAlign: "center",
    padding: 2,
  },
  container_ON: {
    borderColor: Colors.PRIMARY_100,
    backgroundColor: "white",
    borderWidth: 2,
  },
  text_ON: {
    fontSize: 14,
    fontFamily: "outfit",
    color: "#000",
  },
  container_OFF: {
    borderColor: "lightgray",
    backgroundColor: "white",
    borderWidth: 2,
  },
  text_OFF: {
    fontSize: 14,
    color: Colors.GRAY,
    fontFamily: "outfit",
  },
  container_PRIMARY: {
    backgroundColor: Colors.LOGO_BACKGROUND,
  },
  text_PRIMARY: {
    color: "#fff",
  },
  container_SECONDARY: {
    borderColor: Colors.LOGO_BACKGROUND,
    borderWidth: 1,
    shadowColor: Colors.SHADOW,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 2 },
    backgroundColor: "white",
  },
  text_SECONDARY: {
    color: Colors.PRIMARY_100,
  },
  container_TERTIARY: {
    backgroundColor: "#fff",
    paddingBottom: -4,
  },
  text_TERTIARY: {
    color: Colors.GRAY,
  },
  container_QUATERNARY: {
    backgroundColor: "white",
    borderColor: Colors.LIGHTGRAY,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: Platform.OS === "ios" ? 14 : 0,
    paddingHorizontal: 10,
    marginVertical: 5,
    shadowColor: Colors.SHADOW,
  },
  text_QUATERNARY: {
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  container_ALERT: {
    borderColor: Colors.ALERT,
    backgroundColor: Colors.ALERT,
    borderWidth: 2,
  },
  text_ALERT: {
    fontFamily: "outfit-bold",
    color: "#fff",
    fontSize: 16,
  },
  container_TAKEN: {
    backgroundColor: Colors.TAKEN_200,
    borderWidth: 1,
    borderColor: Colors.TAKEN_100,
    borderRadius: 8,
    ...(Platform.OS === "android"
      ? {
          elevation: 3,
        }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }),
  },
  text_TAKEN: {
    fontFamily: "outfit-bold",
    color: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 1,
    fontSize: Platform.OS === "ios" ? 12 : 14,
  },
});
