import { SafeAreaView, StyleSheet } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import React from "react";
import { AuthProvider, useAuth } from "state/AuthContext";
import {LoadingOverlay} from "@components";
import Toast from "react-native-toast-message";

const AppContent = () => {
  const { authState } = useAuth(); // Access the loading state from AuthContext

  return (
    <>
      <LoadingOverlay visible={authState.loading} />
      <AppNavigator />
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppContent />
      </SafeAreaView>
      <Toast />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
