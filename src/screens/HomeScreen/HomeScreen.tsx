import { logOut } from "@authService";
import Button from "@components/Button";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen: React.FC = () => {
    return (
        <View>
            <Text>This is the HomeScreen</Text>
            <Button title="Log Out" onPress={logOut}/>
        </View>
    );
}

const styles = StyleSheet.create({});

export default HomeScreen;