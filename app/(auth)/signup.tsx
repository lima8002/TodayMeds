import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { router } from "expo-router";

import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import EMAIL_REGEX from "@/constants/EmailRegex";
import { CreateUser } from "@/utils/FirebaseHelper";
import { Colors } from "@/constants/Colors";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormData>();

  const onRegisterPressed: SubmitHandler<SignUpFormData> = (data) => {
    CreateUser(data.name, data.email, data.password);
  };

  const onSignInPressed = () => {
    router.back();
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>

          <CustomInput
            name="name"
            placeholder="Name"
            control={control}
            rules={{
              required: "Name is required",
            }}
          />
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
                value === getValues("password") || "Passwords do not match",
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  root: {
    marginTop: "35%",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  title: {
    fontSize: 26,
    fontFamily: "outfit-medium",
    color: Colors.TEXT_TITLE,
    margin: 10,
  },
});
