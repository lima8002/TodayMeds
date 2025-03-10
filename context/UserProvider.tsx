import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onUpdateUser,
  onGetUser,
  onDeleteUserDB,
} from "@/utils/FirebaseHelper";
import { UserDB } from "../constants/Types";
import * as FileSystem from "expo-file-system";
import { useAuthContext } from "./AuthProvider";

interface UserContextType {
  userDB: UserDB | null;
  setUserDB: React.Dispatch<React.SetStateAction<UserDB | null>>;
  fetchUser: (userEmail: string) => Promise<void>;
  updateUser: (
    userEmail: string,
    updatedUser: Partial<UserDB>
  ) => Promise<void>;
  deleteUser: () => Promise<void>;
  photoProfile: string | null;
  setPhotoProfile: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user } = useAuthContext();
  const [userDB, setUserDB] = useState<UserDB | null>(null);
  const [photoProfile, setPhotoProfile] = useState<string | null>(
    userDB?.photo || ""
  );

  useEffect(() => {
    const getUserDetails = async () => {
      await fetchUser(user?.email || "");
    };

    const checkProfilePhoto = async () => {
      try {
        if (userDB?.photo) {
          const fileInfo = await FileSystem.getInfoAsync(userDB.photo);
          if (fileInfo.exists && fileInfo.uri) {
            setPhotoProfile(fileInfo.uri);
          } else {
            setPhotoProfile("");
          }
        }
      } catch (error) {
        console.error("Error checking profile photo:", error);
      }
    };

    getUserDetails();
    checkProfilePhoto();
  }, []);

  const fetchUser = async (userEmail: string) => {
    try {
      const result = await onGetUser(userEmail);
      if (result !== null) {
        setUserDB(result);
        setPhotoProfile(result.photo);
      } else {
        console.warn("No user found for email:", userEmail);
      }
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  const updateUser = async (
    userEmail: string,
    updatedUser: Partial<UserDB>
  ) => {
    try {
      const userToUpdate = userDB?.email === userEmail;
      if (!userToUpdate) {
        throw new Error("User not found");
      }
      await onUpdateUser(userEmail, updatedUser);
      await fetchUser(userEmail);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async () => {
    try {
      await onDeleteUserDB(user?.email || "");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const contextValue: UserContextType = {
    userDB,
    setUserDB,
    updateUser,
    deleteUser,
    fetchUser,
    photoProfile,
    setPhotoProfile,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
