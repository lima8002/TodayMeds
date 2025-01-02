import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#5E75CA" : "#8f8f8f"}
      // resizeMode="cover"
      // className="size-6"
      // size={24}
    />
    <Text
      className={`${
        focused
          ? "text-[#5E75CA] font-outfit-medium"
          : "text-[#8f8f8f] font-outfit"
      } text-xs w-full text-center mt-1`}
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
            <TabIcon
              icon={require("@/assets/icons/pills.png")}
              focused={focused}
              title="TodayMeds"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={require("@/assets/icons/calendar.png")}
              focused={focused}
              title="Agenda"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={require("@/assets/icons/person.png")}
              focused={focused}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
