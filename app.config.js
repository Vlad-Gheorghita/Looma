const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getAppName = () => {
  if (IS_DEV) {
    return "Looma (Dev)";
  }

  if (IS_PREVIEW) {
    return "Looma (Preview)";
  }

  return "Looma";
};

export default {
  expo: {
    name: getAppName(),
    slug: "Home-App-Assistant",
    version: "0.4.0",
    orientation: "portrait",
    icon: "./assets/images/app-icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/looma-logo_no-bg.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon.png",
        backgroundColor: "#ffffff",
      },
      googleServicesFile:  process.env.GOOGLE_SERVICES_JSON ?? "./firebase/google-services.json",
      package: "com.homeAssistant",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["@react-native-firebase/app", "@react-native-firebase/auth"],
    extra: {
      eas: {
        projectId: "ff1ff33a-91ec-4d4d-bf32-cab93983300d",
      },
      gemini_api_key: process.env.GEMINI_API_KEY
    },
  },
};
