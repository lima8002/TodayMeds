import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { Colors } from "../../constants/Colors";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  onEditable,
  keyboardType,
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
              keyboardType={keyboardType ? keyboardType : "none"}
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
    backgroundColor: "white",
    height: Platform.OS === "ios" ? null : "10%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: Platform.OS === "ios" ? 14 : 0,
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
