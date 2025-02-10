import { Stack } from "expo-router";
export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="add"
        options={{
          presentation: "modal",
          title: "Add Medication",
          headerShown: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          presentation: "modal",
          animation: "fade",
          title: "Edit Medication",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
