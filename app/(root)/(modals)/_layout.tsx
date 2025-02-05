import { Stack } from "expo-router";
export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="add"
        options={{
          presentation: "fullScreenModal",
          title: "Add Medication",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          presentation: "fullScreenModal",
          title: "Edit Medication",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{
          presentation: "fullScreenModal",
          title: "Edit Medication",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
