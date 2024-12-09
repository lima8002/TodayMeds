import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ViewStyle,
  TextStyle,
  View,
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
    | "ALERT";
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
        styles.container,
        otherTextStyles
          ? { alignItems: "flex-start" }
          : { alignItems: "center" },
        styles[`container_${type}` as keyof typeof styles],
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
  },
  container_PRIMARY: {
    // backgroundColor: '#192986',
    backgroundColor: Colors.LOGO_BACKGROUND,
  },
  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  container_QUATERNARY: {
    backgroundColor: "white",
    height: Platform.OS === "ios" ? null : "10%",
    borderColor: Colors.LIGHTGRAY,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: Platform.OS === "ios" ? 14 : 0,
    paddingHorizontal: 10,
    marginVertical: 5,
    shadowColor: "rgba(0, 0, 0, 0.1)",
  },
  container_ON: {
    borderColor: "#3B71F3",
    backgroundColor: "white",
    borderWidth: 2,
  },
  container_OFF: {
    borderColor: "lightgray",
    backgroundColor: "white",
    borderWidth: 2,
  },
  container_ALERT: {
    borderColor: "#b30000",
    backgroundColor: "#b30000",
    borderWidth: 2,
  },
  text: {
    fontFamily: "outfit-medium",
    color: "white",
    fontSize: 16,
  },
  text_SECONDARY: {
    color: "#3B71F3",
  },
  text_TERTIARY: {
    color: Colors.GRAY,
  },
  text_QUATERNARY: {
    fontFamily: "outfit",
    color: "Colors.GRAY",
  },
  text_ON: {
    fontSize: 14,
    fontFamily: "outfit",
    color: "black",
  },
  text_OFF: {
    fontSize: 14,
    color: "lightgray",
    fontFamily: "outfit",
  },
  text_ALERT: {
    fontFamily: "outfit-bold",
    color: "white",
    fontSize: 16,
  },
});
