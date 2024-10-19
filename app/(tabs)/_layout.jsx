import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.TERTIARY,
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            borderTopWidth: 1,
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "TodayMeds",
            headerShown: false,
            tabBarIcon: ({color})=> <Ionicons name="home" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="medication"
          options={{
            title: "Medication",
            headerShown: false,
            tabBarIcon: ({color})=> <Ionicons name="medkit" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({color})=> <Ionicons name="person-circle" size={24} color={color} />
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
