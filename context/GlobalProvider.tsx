import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  intake: {
    dateTime: string;
    taken: boolean;
  }[];
}

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  userDB: UserDB | null;
  setUserDB: React.Dispatch<React.SetStateAction<UserDB | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  medications: MedsDB[];
  addMedication: (medication: Omit<MedsDB, "id" | "intake">) => void;
  updateMedication: (id: string, medication: Partial<MedsDB>) => void;
  getAllIntakes: () => {
    dateTime: string;
    medicationName: string;
    taken: boolean;
  }[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [userDB, setUserDB] = useState<UserDB | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [medications, setMedications] = useState<MedsDB[]>([]);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const storedMedications = await AsyncStorage.getItem("medications");
      if (storedMedications) {
        setMedications(JSON.parse(storedMedications));
      }
    } catch (error) {
      console.error("Error loading medications:", error);
    }
  };

  const saveMedications = async (updatedMedications: MedsDB[]) => {
    try {
      await AsyncStorage.setItem(
        "medications",
        JSON.stringify(updatedMedications)
      );
    } catch (error) {
      console.error("Error saving medications:", error);
    }
  };

  const addMedication = (medication: Omit<MedsDB, "id" | "intake">) => {
    const newMedication: MedsDB = {
      ...medication,
      id: Date.now().toString(),
      intake: calculateIntakeArray(medication),
    };
    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);
    saveMedications(updatedMedications);
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

  const updateMedication = async (id: string, updatedMedication: MedsDB) => {
    const updatedMedications = medications.map((med) =>
      med.id === id ? { ...med, ...updatedMedication } : med
    );
    setMedications(updatedMedications);
    await saveMedications(updatedMedications);
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
    setUser,
    userDB,
    setUserDB,
    isLoading,
    setIsLoading,
    medications,
    addMedication,
    updateMedication,
    getAllIntakes,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
