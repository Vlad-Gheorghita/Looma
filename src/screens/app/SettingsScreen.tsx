import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "state/AuthContext";

const SettingsScreen: React.FC = () => {
    const {logout} = useAuth();

    return (
        <View>
            <Text>Settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default SettingsScreen;