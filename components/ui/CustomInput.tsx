import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors } from "../../constants/Colors";

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  textStyle,
  keyboardType = "default",
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, textStyle]}
        placeholder={placeholder}
        placeholderTextColor={Colors.DARKGRAY}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: Colors.BORDERGRAY,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "outfit",
    backgroundColor: Colors.BACKGROUNDDISABLED,
  },
});
