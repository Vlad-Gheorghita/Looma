import { Button } from "@components";
import { globalStyling } from "@styling";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "state/AuthContext";

const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();

  return (
    <View style={[globalStyling.pageStyle, styles.pageStyle]}>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  pageStyle: {
    alignItems: "center",
  },
});

export default SettingsScreen;
