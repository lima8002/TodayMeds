import { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";
import {
  AuthenticatedUser,
  GetUserDetails,
  GetMedsDetails,
} from "@/utils/FirebaseHelper";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userDB, setUserDB] = useState(null);
  const [medsDB, setMedsDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const subscriber = AuthenticatedUser((credentials) => {
      if (credentials) {
        console.log("User is signed in:");
        // Perform actions for signed-in user
        setIsLoggedIn(true);
        setUser(credentials);
        fetchAllData(credentials.email);
        router.replace("(tabs)/home");
      } else {
        console.log("User is signed out");
        // Perform actions for signed-out user
        setIsLoggedIn(false);
        router.replace("/signin");
      }
    });
    setIsLoading(false);
    return () => subscriber();
    // check if user logged with facebook or google
  }, [user]);

  const fetchAllData = (email) => {
    fetchUserDetails(email);
    fetchMedsDetails(email);
  };

  const fetchUserDetails = async (email) => {
    const userDetails = await GetUserDetails(email);
    setUserDB(userDetails);
  };

  const fetchMedsDetails = async (email) => {
    const medsDetails = await GetMedsDetails(email);
    setMedsDB(medsDetails);
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        userDB,
        setUserDB,
        isLoading,
        medsDB,
        setMedsDB,
        fetchMedsDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
