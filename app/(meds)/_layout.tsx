import { Stack } from "expo-router";
export default function MedsLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="add"
          options={{
            presentation: "modal",
            title: "Add Medication",
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
}
