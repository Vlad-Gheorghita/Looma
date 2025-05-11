import { Button } from "@components";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "state/AuthContext";

const HomeScreen: React.FC = () => {
  const { authState, logout } = useAuth();
  return (
    <View>
      <Text style={{ marginBottom: 10, marginTop: 10 }}>
        User {authState.user?.email} with username:{" "}
        {authState.user?.displayName} is logged in
      </Text>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
