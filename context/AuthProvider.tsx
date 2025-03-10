import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthenticatedUser, SignOutUser } from "@/utils/FirebaseHelper";
import { User } from "firebase/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  letUserSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribeAuth = AuthenticatedUser(async (authUser) => {
      setUser(authUser);
      setIsLoading(true);
      if (authUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const letUserSignOut = async () => {
    try {
      await SignOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    isLoading,
    setIsLoading,
    letUserSignOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export default AuthProvider;
