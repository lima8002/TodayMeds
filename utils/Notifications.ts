import * as Notifications from "expo-notifications";
import { MedsDB } from "@/constants/Types";
import { parseISO } from "date-fns";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { Platform } from "react-native";

import { onUpdateIntake } from "./FirebaseHelper";

export const setupNotificationCategories = async () => {
  await Notifications.setNotificationCategoryAsync("medication", [
    {
      identifier: "MARK_AS_TAKEN",
      buttonTitle: "Mark as Taken",
      options: {
        opensAppToForeground: false,
      },
    },
  ]);
};

const setupNotificationListeners = () => {
  Notifications.addNotificationResponseReceivedListener(async (response) => {
    const actionId = response.actionIdentifier;
    const notificationData = response.notification.request.content.data;

    if (actionId === "MARK_AS_TAKEN") {
      try {
        const intakeId = notificationData.intakeId as string;
        const medId = notificationData.medsId as string;
        await onUpdateIntake(medId, intakeId, false);
      } catch (error) {
        console.error("Error saving taken status:", error);
      }

      const notificationId = response.notification.request.identifier;
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log(
        `Cancelled notification ${notificationId} after marking as taken`
      );
    }
  });
};

export const scheduleNotifications = async (medsData: Partial<MedsDB>) => {
  console.log("medsData---> " + JSON.stringify(medsData, null, 2));
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("meds-channel", {
        name: "Medication Reminders",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
        vibrationPattern: [0, 250, 250, 250],
        enableVibrate: true,
      });
    }

    await setupNotificationCategories();
    setupNotificationListeners();

    if (medsData && medsData.intake && medsData.intake.length > 0) {
      for (let i = 1; i < medsData.intake.length; i++) {
        const notification = await Notifications.scheduleNotificationAsync({
          content: {
            title: "TodayMeds",
            body: `${medsData.name}: Take ${medsData.dosage} ${
              medsData.dosage === "1" ? "pill/tablet." : "pills/tablets."
            }${medsData.withFoodWater ? "\nTake with Food/Water." : ""}`,
            sound: true,
            priority: "high",
            interruptionLevel: "critical",
            data: {
              medsId: medsData.id,
              intakeRef: medsData.intakeRef,
              intakeId: medsData.intake[i].intakeId,
            },
          },
          trigger: {
            type: SchedulableTriggerInputTypes.DATE,
            date: parseISO(medsData.intake[i].dateTime),
          },
        });
        console.log(
          "Notification scheduled with id ",
          JSON.stringify(notification, null, 2)
        );
      }
    }
  } catch (error) {
    console.error("Error creating notification IDs:", error);
  }
};

export const checkAndDeleteNotifications = async (medRef: string) => {
  try {
    const ids = await Notifications.getAllScheduledNotificationsAsync();

    if (ids && ids?.length > 0) {
      for (let i = 0; i < ids.length; i++) {
        if (ids[i].content.data.intakeRef === medRef) {
          await Notifications.cancelScheduledNotificationAsync(
            ids[i].identifier
          );
          console.log("Cencelled notif id ---> ", ids[i].identifier);
        }
      }
    }
  } catch (error) {
    console.error("Error checking for notification IDs:", error);
  }
};

export const deleteAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("Cancelled all existing scheduled notifications");
  } catch (error) {
    console.error("Error cancelling scheduled notifications:", error);
  }
};
