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
  onAddNewMedToDB,
  onGetMedsByUser,
  onUpdateMeds,
  onDeleteMedById,
  onUpdateIntake,
  onDeleteMedByEmail,
  onGetUser,
} from "@/utils/FirebaseHelper";
import { User } from "firebase/auth";
import { Intake, MedsDB, UserDB } from "../constants/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  userDB: UserDB | null;
  setUserDB: React.Dispatch<React.SetStateAction<UserDB | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  screenName: string;
  setScreenName: (value: string) => void;
  letUserSignOut: () => Promise<void>;
  medications: MedsDB[];
  fetchMeds: (userEmail: string) => Promise<void>;
  setMedications: React.Dispatch<React.SetStateAction<MedsDB[]>>;
  addMedication: (medication: Omit<MedsDB, "id" | "intake">) => Promise<void>;
  updateMedication: (id: string, medication: Partial<MedsDB>) => Promise<void>;
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
  const [screenName, setScreenName] = useState<string>("");
  const [medications, setMedications] = useState<MedsDB[]>([]);
  const [autosave, setAutosave] = useState<boolean>(false);

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

    const getAutoValue = async () => {
      try {
        const value = await AsyncStorage.getItem("Autosave");
        if (value !== null) {
          setAutosave(value === "true");
        }
      } catch (error) {
        console.error("Error getting Autosave:", error);
      }
    };
    getAutoValue();
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
      setUserDB(result);
    } catch (error) {
      console.error("Error fetching medications:", error);
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
      const newId = Date.now().toString();
      const newMedication: MedsDB = {
        ...medication,
        id: newId,
        email: user.email,
        intakeRef: newId,
        intake: calculateIntakeArray(medication, newId),
      };
      await onAddNewMedToDB(newMedication);
      await fetchMeds(user.email);
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  const calculateIntakeArray = (
    medication: Omit<MedsDB, "id" | "intake">,
    newId: string
  ) => {
    const intake: Intake[] = [];
    const startDateTime = new Date(medication.dateTime);
    const frequencyHours = medication.frequency;
    const totalDoses = parseInt(medication.quantity);

    for (let i = 0; i < totalDoses; i++) {
      const intakeDateTime = new Date(
        startDateTime.getTime() + i * frequencyHours * 60 * 60 * 1000
      );
      intake.push({
        intakeRef: newId,
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
    updatedMedication: Partial<MedsDB>
  ) => {
    try {
      const medsToUpdate = medications.find((med) => med.id === id);

      if (!medsToUpdate) {
        throw new Error("Medication not found");
      }

      const mergedMedication = { ...medsToUpdate, ...updatedMedication };

      await onUpdateMeds(id, mergedMedication);
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
      await onUpdateIntake(medicationId, intakeId, taken); // Pass intakeId to FirebaseHelper function
      await fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error updating intake:", error);
    }
  };

  const deleteMedication = async (id: string) => {
    try {
      await onDeleteMedById(id);
      await fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const deleteAllMedication = async (id: string) => {
    try {
      await onDeleteMedByEmail(id);
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
    screenName,
    setScreenName,
    letUserSignOut,
    medications,
    fetchMeds,
    setMedications,
    addMedication,
    updateMedication,
    updateIntake,
    deleteAllMedication,
    deleteMedication,
    getAllIntakes,
    autosave,
    setAutosave,
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
