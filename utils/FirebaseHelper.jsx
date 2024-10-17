import * as FirebaseConfig from "./FirebaseConfig";
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  collection,
  query,
  addDoc,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthenticatedUser = (credentials) => {
  return onAuthStateChanged(FirebaseConfig.auth, credentials);
};

export const SignInUser = async (email, password) => {
  await signInWithEmailAndPassword(FirebaseConfig.auth, email, password).catch(
    (error) => {
      if (error.code === "auth/user-not-found") {
        console.log("User not found");
        Alert.alert(
          "Email is invalid",
          "The email address " + email + " doesn't have an account.",
          [
            {
              text: "OK",
              onPress: () => {
                // try to set focus here
              },
            },
          ]
        );
      }

      if (error.code === "auth/invalid-credential") {
        console.log("Wrong password!");
        Alert.alert("Wrong password", "The password entered is wrong.", [
          {
            text: "OK",
            onPress: () => {
              // try to set focus here
            },
          },
        ]);
      }
      console.log(error);
      error = null;
    }
  );
};

export const CreateUser = async (email, password) => {
  await createUserWithEmailAndPassword(FirebaseConfig.auth, email, password)
    .then(() => {
      console.log("User signed in!");
      onAddNewUserToDB(email);
    })
    .catch((error) => {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
        Alert.alert(
          "Email in use",
          "The email address " + email + " is already in use!",
          [
            {
              text: "OK",
              onPress: () => {
                // try to set focus here
              },
            },
          ]
        );
      }
    });
};

const onAddNewUserToDB = async (email) => {
  try {
    const docRef = await addDoc(collection(FirebaseConfig.db, "users"), {
      email: email.toLowerCase(),
      dob: "",
      name: "",
      phone: "",
      photo: "",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    return null
  }
};

export const onUpdateUserToDB = async (email, dob, name, phone, photo) => {
  try {
    const q = query(
      collection(FirebaseConfig.db, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      await updateDoc(querySnapshot.docs[0].ref, {
        dob: dob,
        name: name,
        phone: phone,
        photo: photo,
      });
      console.log("Document updated with ID: ", querySnapshot.docs[0].ref.id);
    }
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const DeleteUserFromDB = async (docId) => {
  try {
    const userRef = doc(FirebaseConfig.db, "users", docId); // Reference to the user document
    await deleteDoc(userRef); // Delete the document
    console.log("User document with ID: ", docId, " has been deleted.");
    return true; // Return true to indicate successful deletion
  } catch (e) {
    console.error("Error deleting user document: ", e);
    return null; // Return null in case of an error
  }
};

export const GetUserDetails = async (email) => {
  // return the user details and pass them to the user screen
  try {
    const result = query(
      collection(FirebaseConfig.db, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(result);

    if (querySnapshot.empty) {
      console.log("User not found");
      return null;
    }

    const userDetails = querySnapshot.docs.map((doc) => doc.data());
    return userDetails[0];

  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export const GetMedsDetails = async (email) => {
  try {
    const result = query(
      collection(FirebaseConfig.db, "medication"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(result);

    if (querySnapshot.empty) {
      console.log("Meds not found");
      return null;
    }
    const medsDetails = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return medsDetails;
    
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export const AddMedToDB = async (
  email,
  name,
  quantity,
  intake,
  freq,
  date,
  startDate,
  startTime,
  instructions,
  imageUrl
) => {
  try {
    const docRef = await addDoc(collection(FirebaseConfig.db, "medication"), {
      email: email,
      name: name,
      quantity: quantity,
      intake: intake,
      frequency: freq,
      time: date,
      startDate: startDate,
      startTime: startTime,
      instructions: instructions == undefined ? " " : instructions,
      photo: imageUrl,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null
  }
};

export const UpdateMedInDB = async (
  docId, // The document ID of the medication to update
  email,
  name,
  quantity,
  intake,
  freq,
  date,
  startDate,
  startTime,
  instructions,
  imageUrl
) => {
  try {
    const medRef = doc(FirebaseConfig.db, "medication", docId); // Reference to the medication document
    await setDoc(medRef, {
      email: email,
      name: name,
      quantity: quantity,
      intake: intake,
      frequency: freq,
      time: date,
      startDate: startDate,
      startTime: startTime,
      instructions: instructions == undefined ? " " : instructions,
      photo: imageUrl,
    }, { merge: true }); // Use merge to update only the fields you want without overwriting the entire document

    console.log("Document updated with ID: ", docId);
    return medRef; // Return the reference of the updated document
  } catch (e) {
    console.error("Error updating document: ", e);
    return null;
  }
};

export const DeleteMedFromDB = async (docId) => {
  try {
    const medRef = doc(FirebaseConfig.db, "medication", docId); // Reference to the medication document
    await deleteDoc(medRef); // Delete the document
    console.log("Document with ID: ", docId, " has been deleted.");
    return true; // Return true to indicate successful deletion
  } catch (e) {
    console.error("Error deleting document: ", e);
    return null; // Return null in case of an error
  }
};
