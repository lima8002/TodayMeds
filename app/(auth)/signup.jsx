import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/ui/CustomInput";
import CustomButton from "../../components/ui/CustomButton";
import { useForm } from "react-hook-form";
import EMAIL_REGEX from "../../constants/EmailRegex";
import { router } from "expo-router";
import { CreateUser } from "../../utils/FirebaseHelper";

const signup = () => {
  // constants for the CustomInput component
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegisterPressed = () => {
    CreateUser(control._formValues.email, control._formValues.password);
  };

  const onSignInPressed = () => {
    router.back();
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account </Text>

        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password should be minimum 3 characters long",
            },
          }}
          secureTextEntry
        />
        <CustomInput
          name="repeatPassword"
          placeholder="Repeat password"
          control={control}
          rules={{
            required: "Password is required",
            validate: (value) =>
              value === control._formValues.password || "Password do not match",
            minLength: {
              value: 3,
              message: "Password should be minimum 3 characters long",
            },
          }}
          secureTextEntry
        />
        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />
        <CustomButton
          text="Have an account? Sign In"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default signup;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
  },
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
    padding: 30,
  },
  title: {
    fontSize: 26,
    fontFamily: "outfit-medium",
    color: "#051C60",
    margin: 10,
  },
});
