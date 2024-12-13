import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { router } from "expo-router";

// UserDB interface
interface UserDB {
  email: string;
  name: string;
  dob: string;
  photo: string;
}

interface MedsDB {
  email: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  startTime: string;
  intake: [];
}

// Define types for the context value
interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  userDB: any | null;
  setUserDB: React.Dispatch<React.SetStateAction<any | null>>;
  isLoading: boolean;
  medsDB: any[];
  setMedsDB: React.Dispatch<React.SetStateAction<any[]>>;
  // fetchMedsDetails: (email: string) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  userDB: null,
  setUserDB: () => {},
  isLoading: false,
  setIsLoading: () => {},
  medsDB: [],
  setMedsDB: () => {},
});

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [userDB, setUserDB] = useState<UserDB | null>(null);
  const [medsDB, setMedsDB] = useState<MedsDB[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const contextValue: GlobalContextType = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    userDB,
    setUserDB,
    isLoading,
    medsDB,
    setMedsDB,
    // fetchMedsDetails,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
