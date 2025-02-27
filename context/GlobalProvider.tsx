import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  AuthenticatedUser,
  SignOutUser,
  onUpdateUser,
  onGetMedsByUser,
  onAddNewMedToDB,
  onUpdateMeds,
  onDeleteMedById,
  onUpdateIntake,
  onDeleteMedByEmail,
  onGetUser,
  onDeleteUserDB,
} from "@/utils/FirebaseHelper";
import { User } from "firebase/auth";
import { Intake, MedsDB, UserDB } from "../constants/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import {
  checkAndDeleteNotifications,
  deleteAllNotifications,
  scheduleNotifications,
} from "@/utils/Notifications";

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  userDB: UserDB | null;
  setUserDB: React.Dispatch<React.SetStateAction<UserDB | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (
    userEmail: string,
    updatedUser: Partial<UserDB>
  ) => Promise<void>;
  deleteUser: () => Promise<void>;
  letUserSignOut: () => Promise<void>;
  medications: MedsDB[];
  fetchMeds: (userEmail: string) => Promise<void>;
  fetchUser: (userEmail: string) => Promise<void>;
  setMedications: React.Dispatch<React.SetStateAction<MedsDB[]>>;
  addMedication: (medication: Omit<MedsDB, "id" | "intake">) => Promise<void>;
  updateMedication: (
    id: string,
    medication: Partial<MedsDB>,
    newIntake?: string
  ) => Promise<void>;
  updateIntake: (
    medicationId: string,
    intakeId: string,
    taken: boolean
  ) => Promise<void>;
  deleteAllMedication: (id: string) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
  getAllIntakes: () => Intake[];
  autosave: boolean;
  setAutosave: React.Dispatch<React.SetStateAction<boolean>>;
  showQtLeft: boolean;
  setShowQtLeft: React.Dispatch<React.SetStateAction<boolean>>;
  showFindMedsT: boolean;
  setShowFindMedsT: React.Dispatch<React.SetStateAction<boolean>>;
  showFindMedsM: boolean;
  setShowFindMedsM: React.Dispatch<React.SetStateAction<boolean>>;
  photoProfile: string | null;
  setPhotoProfile: React.Dispatch<React.SetStateAction<string | null>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userDB, setUserDB] = useState<UserDB | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [medications, setMedications] = useState<MedsDB[]>([]);
  const [autosave, setAutosave] = useState<boolean>(false);
  const [showQtLeft, setShowQtLeft] = useState<boolean>(false);
  const [showFindMedsT, setShowFindMedsT] = useState<boolean>(false);
  const [showFindMedsM, setShowFindMedsM] = useState<boolean>(false);
  const [photoProfile, setPhotoProfile] = useState<string | null>(
    userDB?.photo || ""
  );

  useEffect(() => {
    const unsubscribeAuth = AuthenticatedUser(async (authUser) => {
      setUser(authUser);
      setIsLoading(true);
      if (authUser) {
        setIsLoggedIn(true);
        await fetchUser(authUser.email || "");
        await fetchMeds(authUser.email || "");
      } else {
        setMedications([]);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

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

    const getSettingsValues = async () => {
      try {
        let value = await AsyncStorage.getItem(`${user?.email}` + "-Autosave");
        if (value !== null) {
          setAutosave(value === "true");
        }
        value = await AsyncStorage.getItem(`${user?.email}` + "-ShowQtLeft");
        if (value !== null) {
          setShowQtLeft(value === "true");
        }
        value = await AsyncStorage.getItem(`${user?.email}` + "-ShowFindMedsT");
        if (value !== null) {
          setShowFindMedsT(value === "true");
        }
        value = await AsyncStorage.getItem(`${user?.email}` + "-ShowFindMedsM");
        if (value !== null) {
          setShowFindMedsM(value === "true");
        }
      } catch (error) {
        console.error("Error getting Autosave:", error);
      }
    };
    checkProfilePhoto();
    getSettingsValues();
    return () => unsubscribeAuth();
  }, []);

  const letUserSignOut = async () => {
    try {
      await SignOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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

  const fetchMeds = async (userEmail: string) => {
    try {
      const result = await onGetMedsByUser(userEmail);
      setMedications(result);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  const addMedication = async (medication: Omit<MedsDB, "id" | "intake">) => {
    if (!user?.email) {
      console.error("User email is missing. Cannot add medication.");
      return;
    }
    try {
      const RefId = Date.now().toString();
      const newMedication: MedsDB = {
        ...medication,
        id: RefId,
        email: user?.email,
        intakeRef: RefId,
        intake: calculateIntakeArray(medication, RefId),
      };
      const docRef = await onAddNewMedToDB(newMedication);
      if (docRef) {
        const newMedicationWithId: MedsDB = {
          ...newMedication,
          id: docRef?.id,
        };
        await scheduleNotifications(newMedicationWithId);
      }
      await fetchMeds(user.email);
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  const calculateIntakeArray = (
    medication: Omit<MedsDB, "id" | "intake">,
    RefId: string
  ) => {
    const intake: Intake[] = [];
    const startDateTime = new Date(medication.dateTime);
    const frequencyHours = medication.frequency;
    const totalDoses =
      parseInt(medication.quantity) / parseInt(medication.dosage);

    for (let i = 0; i < totalDoses; i++) {
      const intakeDateTime = new Date(
        startDateTime.getTime() + i * frequencyHours * 60 * 60 * 1000
      );
      intake.push({
        intakeRef: RefId,
        intakeId: i.toString(),
        dateTime: intakeDateTime.toISOString(),
        taken: false,
      });
    }

    return intake;
  };

  const getAllIntakes = (): Intake[] => {
    return medications
      .filter((med) => med.active)
      .flatMap((med) => med.intake || [])
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
  };

  const updateMedication = async (
    id: string,
    updatedMedication: Partial<MedsDB>,
    newIntake?: string
  ) => {
    try {
      const medsToUpdate = medications.find((med) => med.id === id);

      if (!medsToUpdate) {
        throw new Error("Medication not found");
      }
      if (newIntake === undefined || "") {
        await onUpdateMeds(id, { ...medsToUpdate, ...updatedMedication });
      } else {
        const intake = calculateIntakeArray(
          updatedMedication as MedsDB,
          medsToUpdate.intakeRef
        );
        const updatedMedicationWithIntake: Partial<MedsDB> = {
          ...updatedMedication,
          intake: intake,
        };
        await onUpdateMeds(id, updatedMedicationWithIntake);
        await scheduleNotifications(updatedMedicationWithIntake);
      }

      await fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };

  const updateIntake = async (
    medicationId: string,
    intakeId: string,
    taken: boolean
  ) => {
    try {
      await onUpdateIntake(medicationId, intakeId, taken);
      await fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error updating intake:", error);
    }
  };

  const deleteMedication = async (id: string) => {
    try {
      const notifitcationsToDelete = medications.find((med) => med.id === id);
      if (notifitcationsToDelete) {
        await checkAndDeleteNotifications(notifitcationsToDelete?.intakeRef);
      }
      await onDeleteMedById(id);
      await fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const deleteAllMedication = async (id: string) => {
    try {
      await onDeleteMedByEmail(id);
      await deleteAllNotifications();
      await fetchMeds(user?.email || "");
      setMedications([]);
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const contextValue: GlobalContextType = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    userDB,
    setUserDB,
    isLoading,
    setIsLoading,
    updateUser,
    deleteUser,
    letUserSignOut,
    medications,
    fetchMeds,
    fetchUser,
    setMedications,
    addMedication,
    updateMedication,
    updateIntake,
    deleteAllMedication,
    deleteMedication,
    getAllIntakes,
    autosave,
    setAutosave,
    showQtLeft,
    setShowQtLeft,
    showFindMedsM,
    setShowFindMedsM,
    showFindMedsT,
    setShowFindMedsT,
    photoProfile,
    setPhotoProfile,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
