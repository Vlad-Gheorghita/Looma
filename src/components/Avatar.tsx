import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle, Text, StyleSheet } from "react-native";

type AvatarProps = {
  initials: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const randomColor = (): string => {
  const colors = [
    "#FF6B6B",
    "#6BCB77",
    "#4D96FF",
    "#FFD93D",
    "#F59E0B",
    "#A78BFA",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Avatar: React.FC<AvatarProps> = ({ initials, size = 48, style }) => {
  const backgroundColor = useMemo(() => randomColor(), []);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>
        {initials.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Avatar;
