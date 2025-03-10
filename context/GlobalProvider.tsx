import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "./AuthProvider";

interface GlobalContextType {
  autosave: boolean;
  setAutosave: React.Dispatch<React.SetStateAction<boolean>>;
  showQtLeft: boolean;
  setShowQtLeft: React.Dispatch<React.SetStateAction<boolean>>;
  showFindMedsT: boolean;
  setShowFindMedsT: React.Dispatch<React.SetStateAction<boolean>>;
  showFindMedsM: boolean;
  setShowFindMedsM: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const { user } = useAuthContext();
  const [autosave, setAutosave] = useState<boolean>(false);
  const [showQtLeft, setShowQtLeft] = useState<boolean>(false);
  const [showFindMedsT, setShowFindMedsT] = useState<boolean>(false);
  const [showFindMedsM, setShowFindMedsM] = useState<boolean>(false);

  useEffect(() => {
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
    if (user?.email) getSettingsValues();
  }, [user?.email]);

  const contextValue: GlobalContextType = {
    autosave,
    setAutosave,
    showQtLeft,
    setShowQtLeft,
    showFindMedsM,
    setShowFindMedsM,
    showFindMedsT,
    setShowFindMedsT,
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
