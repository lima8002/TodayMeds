import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { Redirect, useRouter } from "expo-router";
import { SignInUser } from "@/utils/FirebaseHelper";
import { useAuthContext } from "@/context/AuthProvider";
import { Colors } from "@/constants/Colors";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import EMAIL_REGEX from "@/constants/EmailRegex";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useAuthContext();
  const [isModalLoading, setModalIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>();

  const onSignInPressed: SubmitHandler<SignInFormData> = (data) => {
    setModalIsLoading(true);
    SignInUser(data.email, data.password);
    setTimeout(() => {
      setModalIsLoading(false);
    }, 500);
  };

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
            <Image
              source={require("@/assets/images/logo.png")}
              style={[styles.shadow, styles.imageLogo]}
            />
            <Text style={styles.textLogo}>TodayMeds</Text>

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
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalLoading}
          >
            <View style={styles.modal}>
              <ActivityIndicator size="small" color={Colors.PRIMARY} />
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  containerLogo: {
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
    elevation: 10,
  },
  imageLogo: {
    width: 128,
    height: 128,
    marginLeft: 24,
    paddingBottom: 15,
    resizeMode: "contain",
  },
  textLogo: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginVertical: 15,
    color: Colors.PRIMARY,
    textShadowColor: Colors.SHADOW,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000040",
  },
});
