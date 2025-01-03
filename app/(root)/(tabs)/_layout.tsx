import { Tabs } from "expo-router";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { HapticTab } from "@/components/ui/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";

const TabIcon = ({
  focused,
  icon,
}: // title,
{
  focused: boolean;
  icon: any;
  // title: string;
}) => (
  <View style={styles.container}>
    <Image
      source={icon}
      tintColor={focused ? Colors.LOGO_BACKGROUND : Colors.GRAY}
      style={styles.icon}
    />
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.LOGO_BACKGROUND,
        tabBarInactiveTintColor: Colors.GRAY,
        tabBarLabelStyle: styles.text,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: { size: { height: 0 } },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "TodayMeds",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={require("@/assets/icons/pills.png")}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="agenda"
        options={{
          title: "Agenda",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={require("@/assets/icons/calendar.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={require("@/assets/icons/person.png")}
            />
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
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginTop: Platform.OS === "ios" ? 2 : 0,
  },
  text: {
    fontSize: 11,
    marginTop: Platform.OS === "ios" ? 4 : 0,
    fontFamily: "outfit",
    textAlign: "center",
  },
});
