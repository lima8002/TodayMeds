import { Stack } from "expo-router";
export default function MedsLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="add"
          options={{
            presentation: "fullScreenModal",
            title: "Add Medication",
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
}
