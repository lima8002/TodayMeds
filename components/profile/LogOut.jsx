import { View, StyleSheet } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/FirebaseConfig";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../ui/CustomButton";

const LogOut = () => {
  const { setUserDB, setUser, setIsLoggedIn } = useGlobalContext();

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      setUser(null);
      setUserDB(null);
    });
  };
  return (
    <View style={[styles.container, styles.shadow]}>
      <CustomButton
      style={{width:'50%'}}
        text="Log Out"
        onPress={() => handleLogout()}
        type="SECONDARY"
      />
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        marginHorizontal: 20,
        height: '100%',
        alignItems: "center",
      },
      shadow: {
        shadowColor: "silver",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1.3,
        elevation: 1,
      },
})
