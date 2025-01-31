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
} from "@/utils/FirebaseHelper";
import { User } from "firebase/auth";

interface UserDB {
  email: string;
  name: string;
  dob: string;
  photo: string;
}

interface MedsDB {
  id: string;
  email: string;
  name: string;
  dosage: string;
  frequency: string;
  dateTime: string;
  quantity: string;
  withFoodWater: boolean;
  active: boolean;
  intake: {
    dateTime: string;
    taken: boolean;
  }[];
}

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  userDB: UserDB | null;
  setUserDB: React.Dispatch<React.SetStateAction<UserDB | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  letUserSignOut: () => Promise<void>;
  medications: MedsDB[];
  setMedications: React.Dispatch<React.SetStateAction<MedsDB[]>>;
  addMedication: (medication: Omit<MedsDB, "id" | "intake">) => Promise<void>;
  updateMedication: (id: string, medication: Partial<MedsDB>) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
  getAllIntakes: () => {
    dateTime: string;
    medicationName: string;
    taken: boolean;
  }[];
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

  useEffect(() => {
    const unsubscribeAuth = AuthenticatedUser(async (authUser) => {
      setUser(authUser);
      setIsLoading(true);
      if (authUser) {
        setIsLoggedIn(true);
        await fetchMedications(authUser.email || "");
      } else {
        setMedications([]);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribeAuth(); // Unsubscribe when component unmounts
  }, []);

  const letUserSignOut = async () => {
    try {
      await SignOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const fetchMedications = async (userEmail: string) => {
    try {
      const meds = await onGetMedsByUser(userEmail);
      setMedications(meds);
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
      const newMedication: MedsDB = {
        ...medication,
        id: Date.now().toString(),
        email: user.email, // Add user's email
        intake: calculateIntakeArray(medication),
      };
      await onAddNewMedToDB(newMedication); // Use Firebase function
      await fetchMedications(user.email); // Refresh medications list
    } catch (error) {
      console.error("Error adding medication:", error);
    }
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
      await fetchMedications(user?.email || "");
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };

  const deleteMedication = async (id: string) => {
    try {
      await onDeleteMedById(id);
      setMedications(medications.filter((med) => med.id !== id));
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const calculateIntakeArray = (medication: Omit<MedsDB, "id" | "intake">) => {
    const intake: { dateTime: string; taken: boolean }[] = [];
    const startDateTime = new Date(medication.dateTime);
    const frequencyHours = parseInt(medication.frequency);
    const totalDoses = parseInt(medication.quantity);

    for (let i = 0; i < totalDoses; i++) {
      const intakeDateTime = new Date(
        startDateTime.getTime() + i * frequencyHours * 60 * 60 * 1000
      );
      intake.push({
        dateTime: intakeDateTime.toISOString(),
        taken: false,
      });
    }

    return intake;
  };

  const getAllIntakes = () => {
    return medications
      .flatMap((med) =>
        med.intake.map((intake) => ({
          dateTime: intake.dateTime,
          medicationName: med.name,
          taken: intake.taken,
        }))
      )
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
  };

  const contextValue: GlobalContextType = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    userDB,
    setUserDB,
    isLoading,
    setIsLoading,
    letUserSignOut,
    medications,
    setMedications,
    addMedication,
    updateMedication,
    deleteMedication,
    getAllIntakes,
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
