import React from "react";
import { TextInput, StyleSheet, View, Text, Platform } from "react-native";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import { Colors } from "@/constants/Colors";

interface CustomInputProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
  placeholder?: string;
  secureTextEntry?: boolean;
  onEditable?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  onEditable,
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
          <View style={[styles.container, error ? styles.errorStyles : null]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={"darkgray"}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              editable={onEditable}
              keyboardType={"default"}
            />
          </View>
          {error && error.message?.trim() ? (
            <Text style={styles.text}>{error.message || "Error"}</Text>
          ) : null}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 46,
    backgroundColor: "white",
    borderColor: Colors.SHADOW,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 0,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  errorStyles: {
    borderColor: Colors.ALERT,
  },
  text: {
    color: Colors.ALERT,
    alignSelf: "flex-start",
  },
  input: {
    fontFamily: "outfit",
    fontSize: 16,
    marginTop: Platform.OS === "ios" ? 0 : 11,
  },
});
