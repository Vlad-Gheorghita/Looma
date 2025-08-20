
# Looma (Home-App-Assistant) 🚀


A modern, minimalist personal management app built with React Native, featuring bill splitting, authentication, and Firebase integration. Designed for Android, iOS, and web platforms.

## ✨ Features
- 💸 Bill splitting and management
- 🔒 Secure authentication (Google OAuth via Firebase)
- 🃏 Animated UI components and overlays
- 🧠 Context-based state management
- 🧭 Responsive navigation (App, Auth, Tab)
- ☁️ Firebase storage and services
- 🎨 Customizable themes and icons

## 🛠️ Tech Stack
- ⚛️ React Native
- 🟦 TypeScript
- 🔥 Firebase (Auth, Storage)
- 🧠 Context API
- 🧭 React Navigation
- 🏗️ Expo (with EAS)

## 📁 Project Structure
```
├── src/
│   ├── components/        # UI components
│   ├── screens/           # App screens
│   ├── services/          # Service layer (billSplitter, firebase, etc.)
│   ├── state/             # Context API
│   ├── styles/            # Centralized styling
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
├── android/               # Native Android files
├── assets/                # App icons and images
├── firebase/              # Firebase config
├── app.config.js          # Expo/React Native config
├── package.json           # Dependencies
```

## 🚦 Getting Started

## ⚙️ Prerequisites
- 🟩 Node.js >= 18.x
- 📦 npm
- 🏗️ Expo CLI (`npm install -g expo-cli`)
- 🤖 Android Studio (for Android emulator)
- 🍏 (Optional) Xcode for iOS builds

## 📝 Step-by-Step Installation & Setup Guide

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Vlad-Gheorghita/Home-App-Assistant.git
cd Home-App-Assistant
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Firebase
1. Create and add `google-services.json`:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project or select your existing project.
   - In the project dashboard, click the Android icon to add a new Android app.
   - Enter your Android package name (`com.homeAssistant`).
   - Download the generated `google-services.json` file.
   - Place the file in your project at `firebase/google-services.json`.
2. Confirm your Android package name is `com.homeAssistant` in both Firebase and `app.config.js`.
3. Verify OAuth client IDs and API keys in the Firebase console match your config.


### 4️⃣ Set Up Environment Variables
You can manage environment variables in two ways:

- **Local .env file:**
  Create a `.env` file in the project root:
  ```
  GOOGLE_SERVICES_JSON=./firebase/google-services.json
  GEMINI_API_KEY=your-gemini-api-key-here
  APP_VARIANT=development # or preview/production
  ```

- **Expo Dev Page:**
  You can also set environment variables directly in the [Expo Dev page](https://expo.dev/) for your project:
  1. Go to your project dashboard on Expo Dev.
  2. Select "Environment Variables" from the sidebar.
  3. Add the required keys (e.g., `GEMINI_API_KEY`, `GOOGLE_SERVICES_JSON`).
  4. When you run your app with `npx expo run:android` or build with EAS, these variables will be automatically injected into your app.
  5. To access these variables in your code, use `process.env.VARIABLE_NAME` (e.g., `process.env.GEMINI_API_KEY`).

**Note:** If you update environment variables on Expo Dev, restart your local development server to ensure changes take effect.

### 5️⃣ Start Android Emulator (Android Studio)
1. Open Android Studio.
2. Go to "Device Manager" and start an Android Virtual Device (AVD).
3. Ensure the emulator is running before starting the app.

### 6️⃣ Run the App
```sh
# Start Metro bundler and run on Android emulator
npx expo run:android
```

### 7️⃣ (Optional) Run on iOS
Requires macOS and Xcode:
```sh
npx expo run:ios
```

### 8️⃣ Build & Deploy
- Use EAS for builds: [Expo Application Services](https://docs.expo.dev/eas/)
- Android/iOS builds require proper keystore and provisioning profiles.

---

## 📲 Usage
- 💸 Bill splitting: Access via main app screen
- 🔒 Authentication: Google sign-in via Firebase
- 🧭 Navigation: Use bottom tabs and stack navigation

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
MIT

## 🙏 Credits
- 👤 [Vlad Gheorghita](https://github.com/Vlad-Gheorghita) (Author)
- ⚛️ [React Native](https://reactnative.dev/)
- 🔥 [Firebase](https://firebase.google.com/)
- 🏗️ [Expo](https://expo.dev/)
