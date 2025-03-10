import { Tabs } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useUserContext } from "@/context/UserProvider";
import pills from "@/assets/icons/pills.png";
import calendar from "@/assets/icons/calendar.png";
import person from "@/assets/icons/person.png";
import presc from "@/assets/icons/presc.png";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  const { photoProfile } = useUserContext();

  return (
    <View style={styles.container}>
      <Image
        source={
          !photoProfile || (icon && title != "Profile")
            ? icon
            : !photoProfile && photoProfile.length === 0 && title === "Profile"
            ? require("@/assets/icons/person90.png")
            : {
                uri: photoProfile,
              }
        }
        style={[
          styles.icon,
          title === "Profile"
            ? !photoProfile
              ? {
                  width: 30,
                  height: 30,
                  marginTop: -2,
                  tintColor: focused ? Colors.LOGO_BACKGROUND : Colors.GRAY,
                }
              : photoProfile && {
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: focused ? Colors.LOGO_BACKGROUND : Colors.GRAY,
                  tintColor: undefined,
                }
            : focused
            ? { tintColor: Colors.LOGO_BACKGROUND }
            : { tintColor: Colors.GRAY },
        ]}
      />
      <Text
        style={[
          styles.text,
          focused ? styles.textFocused : styles.textUnfocused,
          { marginTop: title === "Profile" ? (!photoProfile ? 2 : 4) : 4 },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#EAECEF",
          position: "absolute",
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={pills} title={"TodayMeds"} />
          ),
        }}
      />
      <Tabs.Screen
        name="medication"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={presc} title={"Medications"} />
          ),
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={calendar} title={"Agenda"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={person} title={"Profile"} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: "cover",
    overflow: "hidden",
  },
  text: {
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
    width: "100%",
  },
  textFocused: {
    fontSize: 12,
    fontFamily: "outfit-medium",
    color: Colors.LOGO_BACKGROUND,
  },
  textUnfocused: {
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
});
