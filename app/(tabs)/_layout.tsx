import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabelStyle: { fontFamily: "outfit" },
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Medication",
          tabBarLabelStyle: { fontFamily: "outfit" },
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabelStyle: { fontFamily: "outfit" },
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
