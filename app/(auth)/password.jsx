import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/ui/CustomInput";
import CustomButton from "../../components/ui/CustomButton";
import { useForm } from "react-hook-form";
import EMAIL_REGEX from "../../constants/EmailRegex";
import { router } from "expo-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const password = () => {
  // constants for the CustomInput component
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSendPressed = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, control._formValues.email)
      .then(() => {
        Alert.alert(
          "Email sent",
          "The password reset link was sent to your email address. Follow the instructions and login again ",
          [
            {
              text: "OK",
              onPress: () => {
                router.back();
              },
            },
          ]
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onBackToSignInPressed = () => {
    router.back();
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password </Text>

        <CustomInput
          name="email"
          placeholder="Enter your email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />
        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />
        <CustomButton
          text="Back to Sign In"
          onPress={onBackToSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default password;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
  },
  root: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: "50%",
  },
  title: {
    fontSize: 26,
    fontFamily: "outfit-medium",
    color: "#051C60",
    margin: 10,
  },
});
