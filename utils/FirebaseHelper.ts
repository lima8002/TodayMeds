import * as FirebaseConfig from "./FirebaseConfig";
import { Alert } from "react-native";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const AuthenticatedUser = (
  credentials: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(FirebaseConfig.auth, credentials);
};

export const SignInUser = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await signInWithEmailAndPassword(FirebaseConfig.auth, email, password);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      console.log("User not found");
      Alert.alert(
        "Email is invalid",
        `The email address ${email} doesn't have an account.`,
        [{ text: "OK", onPress: () => {} }]
      );
    } else if (error.code === "auth/invalid-credential") {
      console.log("Wrong password!");
      Alert.alert("Wrong password", "The password entered is wrong.", [
        { text: "OK", onPress: () => {} },
      ]);
    }
    console.log(error);
  }
};

export const CreateUser = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(FirebaseConfig.auth, email, password);
    console.log("User signed in!");
    await onAddNewUserToDB(name, email);
  } catch (error: any) {
    console.log(error);
    if (error.code === "auth/email-already-in-use") {
      console.log("That email address is already in use!");
      Alert.alert(
        "Email in use",
        `The email address ${email} is already in use!`,
        [{ text: "OK", onPress: () => {} }]
      );
    }
  }
};

const onAddNewUserToDB = async (
  name: string,
  email: string
): Promise<DocumentReference | null> => {
  try {
    const docRef = await addDoc(collection(FirebaseConfig.db, "users"), {
      email: email.toLowerCase(),
      dob: "",
      name: name,
      phone: "",
      photo: "",
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};
