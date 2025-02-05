import * as FirebaseConfig from "./FirebaseConfig";
import { Alert } from "react-native";
import {
  collection,
  addDoc,
  DocumentReference,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  runTransaction,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";
import { MedsDB, UserDB } from "../constants/Types";

export const AuthenticatedUser = (
  credentials: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(FirebaseConfig.auth, credentials);
};

export const SignOutUser = async (): Promise<void> => {
  await signOut(FirebaseConfig.auth);
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
    await onAddNewUserToDB(name, email);
    console.log("User signed in!");
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

export const onAddNewUserToDB = async (
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

export const onAddNewMedToDB = async (
  medsData: MedsDB
): Promise<DocumentReference | null> => {
  try {
    console.log("medsData", medsData);
    const docRef = await addDoc(
      collection(FirebaseConfig.db, "medications"),
      medsData
    );
    console.log("Medication added with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding medication: ", e);
    return null;
  }
};

export const onGetUser = async (email: string): Promise<UserDB | null> => {
  try {
    const userDoc = query(
      collection(FirebaseConfig.db, "users"),
      where("email", "==", email.toLowerCase()),
      limit(1)
    );

    const userSnap = await getDocs(userDoc);

    if (!userSnap.empty) {
      return userSnap.docs[0].data() as UserDB;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const onGetMedsByUser = async (email: string): Promise<MedsDB[]> => {
  try {
    const medSnap = await getDocs(
      query(
        collection(FirebaseConfig.db, "medications"),
        where("email", "==", email.toLowerCase()),
        orderBy("name", "asc")
      )
    );

    const medications: MedsDB[] = [];

    medSnap.forEach((doc) => {
      const medicationData = doc.data() as MedsDB;
      medicationData.id = doc.id;
      medications.push(medicationData);
    });

    return medications;
  } catch (error) {
    console.error("Error getting medications:", error);
    return [];
  }
};

export const onUpdateMeds = async (
  medId: string,
  updatedMedsData: MedsDB
): Promise<void> => {
  try {
    const medRef = doc(FirebaseConfig.db, "medications", medId);
    await updateDoc(medRef, updatedMedsData);
    console.log("Medication updated:", medId);
  } catch (error) {
    console.error("Error updating medication:", error);
  }
};

export const onUpdateIntake = async (
  medicationId: string,
  intakeId: string,
  taken: boolean
) => {
  try {
    const medDoc = doc(
      collection(FirebaseConfig.db, "medications"),
      medicationId
    );

    await runTransaction(FirebaseConfig.db, async (transaction) => {
      const medSnap = await transaction.get(medDoc);

      if (!medSnap.exists()) {
        throw new Error("Medication not found in database");
      }
      const medData = medSnap.data() as MedsDB;
      const updatedIntakes = medData.intake.map(
        (intake) =>
          intake.intakeId === intakeId ? { ...intake, taken } : intake // Use intakeId for matching
      );
      transaction.update(medDoc, { intake: updatedIntakes });
    });
  } catch (error) {
    console.error("Error updating intake in database:", error);
    throw error;
  }
};

export const onDeleteUserDB = async (email: string): Promise<void> => {
  try {
    const usersSnap = await getDocs(
      query(
        collection(FirebaseConfig.db, "users"),
        where("email", "==", email.toLowerCase())
      )
    );
    if (usersSnap.size === 1) {
      await deleteDoc(usersSnap.docs[0].ref);
    }
    onDeleteMedByEmail(email);
    await FirebaseConfig.auth.currentUser?.delete();

    console.log("User and docs deleted with ID: ", email);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const onDeleteMedById = async (medId: string): Promise<void> => {
  try {
    const medRef = doc(FirebaseConfig.db, "medications", medId);
    await deleteDoc(medRef);
    console.log("Medication deleted:", medId);
  } catch (error) {
    console.error("Error deleting medication by ID:", error);
  }
};

export const onDeleteMedByEmail = async (email: string): Promise<void> => {
  try {
    const medSnap = await getDocs(
      query(
        collection(FirebaseConfig.db, "medications"),
        where("email", "==", email.toLowerCase())
      )
    );
    const medProm = medSnap.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
      console.log("Medication deleted:", doc.id);
    });
    await Promise.all(medProm);
    console.log("All medications deleted for user:", email);
  } catch (error) {
    console.error("Error deleting medications by email:", error);
  }
};
