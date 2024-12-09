import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface CustomInputProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  style,
  inputStyle,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View style={[styles.container, style, error && styles.errorStyles]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={[styles.input, inputStyle]}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && <Text style={styles.text}>{error.message || "Error"}</Text>}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  errorStyles: {
    borderColor: "red",
  },
  text: {
    color: "red",
    alignSelf: "flex-start",
  },
  input: {
    fontFamily: "outfit",
    fontSize: 16,
  },
});
