import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomInput from "../../components/ui/CustomInput";
import CustomButton from "../../components/ui/CustomButton";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";

// special characters used to validate the email
import EMAIL_REGEX from "../../constants/EmailRegex";
import { SignInUser } from "../../utils/FirebaseHelper";

const signin = () => {
  // const height with the value of the current screen the app is running
  const router = useRouter();

  // constants for the CustomInput component
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = () => {
    // when the signInPressed is pressed, it will check on the database after the validation of the input data
    // if it returns without errors from firebase authentication, it will navigate to he homescreen
    SignInUser(control._formValues.email, control._formValues.password);
  };

  const onForgotPasswordPressed = () => {
    // this will take the user to a screen where the user can replace the old password
    clearTextInput();
    router.push("/password");
  };

  const onSingUpPressed = () => {
    // this will take the user to the signUp screen to create a new account
    router.push("/signup");
    clearTextInput();
  };

  const clearTextInput = () => {
    control._reset();
  };

  const fillUser = () => {
    (control._formValues.email = "123@123.com"),
      (control._formValues.password = "password");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerLogo}>
        <TouchableOpacity onPress={() => fillUser()}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={[
              styles.shadow,
              {
                width: 128,
                height: 128,
                marginLeft: 24,
                paddingBottom: 15,
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
        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSingUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default signin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  containerLogo: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: "25%",
    alignItems: "center",
    // borderWidth: 1,
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
