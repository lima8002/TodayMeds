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
  container_PRIMARY: {
    backgroundColor: Colors.LOGO_BACKGROUND,
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
  container_TERTIARY: {
    backgroundColor: "#fff",
    paddingBottom: -4,
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
  container_ON: {
    borderColor: Colors.PRIMARY_100,
    backgroundColor: "white",
    borderWidth: 2,
  },
  container_OFF: {
    borderColor: "lightgray",
    backgroundColor: "white",
    borderWidth: 2,
  },
  container_ALERT: {
    borderColor: Colors.ALERT,
    backgroundColor: Colors.ALERT,
    borderWidth: 2,
  },
  text: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    textAlign: "center",
    padding: 2,
  },
  text_PRIMARY: {
    color: "#fff",
  },
  text_SECONDARY: {
    color: Colors.PRIMARY_100,
  },
  text_TERTIARY: {
    color: Colors.GRAY,
  },
  text_QUATERNARY: {
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  text_ON: {
    fontSize: 14,
    fontFamily: "outfit",
    color: "#000",
  },
  text_OFF: {
    fontSize: 14,
    color: Colors.GRAY,
    fontFamily: "outfit",
  },
  text_ALERT: {
    fontFamily: "outfit-bold",
    color: "#fff",
    fontSize: 16,
  },
});
