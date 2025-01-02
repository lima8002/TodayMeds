import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { router } from "expo-router";

import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import EMAIL_REGEX from "@/constants/EmailRegex";

interface PasswordResetFormData {
  email: string;
}

const PasswordReset: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>();

  const onSendPressed: SubmitHandler<PasswordResetFormData> = (data) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        Alert.alert(
          "Email sent",
          "The password reset link was sent to your email address. Follow the instructions and login again",
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
        Alert.alert(
          "Error",
          "Failed to send password reset email. Please try again."
        );
      });
  };

  const onBackToSignInPressed = () => {
    router.back();
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.root}>
          <Text style={styles.title}>Reset your password</Text>

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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default PasswordReset;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  keyboardAvoidingView: {
    flex: 1,
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
