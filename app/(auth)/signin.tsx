import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { Redirect, Slot, useRouter } from "expo-router";

import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import EMAIL_REGEX from "@/constants/EmailRegex";
import { SignInUser } from "@/utils/FirebaseHelper";
import { useGlobalContext } from "@/context/GlobalProvider";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useGlobalContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SignInFormData>();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/" />;
  } else {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.containerLogo}>
            <TouchableOpacity
              onPress={() => {
                setValue("email", "123@123.com");
                setValue("password", "password");
              }}
            >
              <Image
                source={require("@/assets/images/logo.png")}
                style={[
                  styles.shadow,
                  {
                    width: 128,
                    height: 128,
                    marginLeft: 24,
                    paddingBottom: 15,
                    resizeMode: "contain",
                  },
                ]}
              />
            </TouchableOpacity>
            <Text style={[styles.textLogo, styles.shadow]}>TodayMeds</Text>

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
                  value: 6,
                  message: "Password should be minimum 6 characters long",
                },
              }}
              secureTextEntry
            />
            <CustomButton
              text="Sign In"
              onPress={handleSubmit(onSignInPressed)}
            />
            <CustomButton
              text="Forgot Password?"
              onPress={() => {
                reset();
                router.push("/password");
              }}
              type="TERTIARY"
            />
            <CustomButton
              text="Don't have an account? Create one"
              onPress={() => {
                reset();
                router.push("/signup");
              }}
              type="TERTIARY"
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
};

const onSignInPressed: SubmitHandler<SignInFormData> = (data) => {
  SignInUser(data.email, data.password);
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  containerLogo: {
    backgroundColor: "#fff",
    marginTop: "35%",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "silver",
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  shadow: {
    shadowColor: "silver",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  textLogo: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginVertical: 15,
    color: "#172e74",
  },
});
