# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Firebase Config

Inside the utils folder, you have to create the firebase credantials file with the name FirebaseCredentials.js with the following content on your own project's credentials from firebase.

FirebaseCredentials.js

```bash
// Your web app's Firebase configuration
export const firebaseConfig = {
          
  apiKey: "------------your-apiKey----------------",
  authDomain: "----------authDomain---------",
  projectId: "--projectId--",
  storageBucket: "------storageBucket------",
  messagingSenderId: "--senderId--",
  appId: "-----------------appId-------------------",
};
```
