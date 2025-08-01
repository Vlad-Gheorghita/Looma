import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle, Text, StyleSheet, Pressable } from "react-native";

type AvatarProps = {
  initials: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  isSelected?: boolean;
  onPress?: () => void;
  selectedColor?: string;
  unselectedColor?: string;
};

const Avatar: React.FC<AvatarProps> = ({ 
  initials, 
  size = 48, 
  style,
  isSelected = false,
  onPress,
  selectedColor = "#4D96FF",
  unselectedColor = "#9CA3AF"
}) => {
  const backgroundColor = isSelected ? selectedColor : unselectedColor;
  const textColor = isSelected ? "#fff" : "#6B7280";

  const avatarContent = (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? selectedColor : "#D1D5DB",
        },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.4, color: textColor }]}>
        {initials.toUpperCase()}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.pressable}>
        {avatarContent}
      </Pressable>
    );
  }

  return avatarContent;
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
  pressable: {
    // Allow for easy touch interaction
  },
});

export default Avatar;
