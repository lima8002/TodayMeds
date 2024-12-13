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
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  startTime: string;
  intake: any[];
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
  addMedication: (medication: Omit<MedsDB, "id">) => void;
  updateMedication: (id: string, medication: Partial<MedsDB>) => void;
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

  const addMedication = (medication: Omit<MedsDB, "id">) => {
    const newMedication: MedsDB = {
      ...medication,
      id: Date.now().toString(),
    };
    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);
    saveMedications(updatedMedications);
  };

  const updateMedication = (id: string, updatedMedication: Partial<MedsDB>) => {
    const updatedMedications = medications.map((med) =>
      med.id === id ? { ...med, ...updatedMedication } : med
    );
    setMedications(updatedMedications);
    saveMedications(updatedMedications);
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
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
