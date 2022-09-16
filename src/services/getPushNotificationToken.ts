import * as Notification from "expo-notifications";

export async function getPushNotificationToken() {
  const { granted } = await Notification.getPermissionsAsync();

  if (!granted) {
    await Notification.getPermissionsAsync();
  }

  const pushToken = await Notification.getExpoPushTokenAsync();
  console.log(`PUSH TOKEN => ${pushToken.data} <= PUSH TOKEN`);

  return pushToken.data;
}
