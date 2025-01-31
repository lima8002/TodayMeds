import { Tabs } from "expo-router";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

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
}) => (
  <View style={styles.container}>
    <Image
      source={icon}
      style={[
        styles.icon,
        { tintColor: focused ? Colors.LOGO_BACKGROUND : Colors.GRAY },
      ]}
    />
    <Text
      style={[styles.text, focused ? styles.textFocused : styles.textUnfocused]}
    >
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#00611FF1A",
          borderTopWidth: 1,
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
        name="agenda"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={calendar} title={"Agenda"} />
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
    marginTop: Platform.OS === "ios" ? 2 : 0,
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
