import { Tabs } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

import pills from "@/assets/icons/pills.png";
import calendar from "@/assets/icons/calendar.png";
import person from "@/assets/icons/person.png";
import presc from "@/assets/icons/presc.png";
import { useGlobalContext } from "@/context/GlobalProvider";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  const { userDB } = useGlobalContext();
  const imageURI =
    "https://firebasestorage.googleapis.com/v0/b/chatdc-be5f6.appspot.com/o/profile1.png?alt=media&token=f0952d92-d37f-414c-bab0-edefb7598fbd";

  return (
    <View style={styles.container}>
      {!userDB?.photo && title === "Profile" ? (
        <Image
          // source={{uri: userDB?.photo}}
          source={{ uri: imageURI }}
          style={[
            styles.icon,
            {
              borderRadius: 50,
              borderWidth: 1,
              borderColor: focused ? Colors.LOGO_BACKGROUND : Colors.GRAY,
              resizeMode: "cover",
              width: 30,
              height: 30,
            },
            // { tintColor: focused ? Colors.LOGO_BACKGROUND : Colors.GRAY },
          ]}
        />
      ) : (
        <Image
          source={icon}
          style={[
            styles.icon,
            { tintColor: focused ? Colors.LOGO_BACKGROUND : Colors.GRAY },
          ]}
        />
      )}
      <Text
        style={[
          styles.text,
          focused ? styles.textFocused : styles.textUnfocused,
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
    width: 30,
    height: 30,
    resizeMode: "contain",
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
