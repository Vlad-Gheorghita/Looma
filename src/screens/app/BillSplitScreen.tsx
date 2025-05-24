import { globalStyling } from "@styling";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AnimatedCard, Button, Card } from "@components";
import { pickImage, readRecipt } from "@billSpltterService";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { usePulseAnimation } from "@hooks";
import { ToastService } from "@toastService";

const BillSplitScreen: React.FC = () => {
  const { scale } = usePulseAnimation();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  //TODO: Work in Progress
  const handleScanBill = async () => {
    console.log("button pressed");
    try {
      const image = await pickImage();
      if (image.canceled) return;

      const aiResult = await readRecipt(image);
      console.log(aiResult.text);
    } catch (error) {
      ToastService.error("Error Scanning Recipt");
    }
  };

  return (
    <View style={[globalStyling.pageStyle]}>
      {/* <Button title="Upload Photo" onPress={handleScanBill} /> */}
      <View style={styles.reciptImageContainer}>
        <AnimatedCard style={styles.imageCard} animatedStyle={animatedStyle}>
          <Image
            source={require("@images/recipt_image_alt.png")} // make sure this is a valid path
            style={styles.reciptAltStyle}
            resizeMode="contain"
          />
        </AnimatedCard>
      </View>

      <View style={styles.reciptItemsListContainer}>
        <Card style={styles.cardStyle}>
          <Text>Salutaaare acesta este un card</Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reciptAltStyle: {
    height: "90%",
    aspectRatio: 1,
  },

  reciptImageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  imageCard: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    borderRadius: 20,
    shadowRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
    height: "80%",
    width: "80%",
  },

  reciptItemsListContainer: {
    flex: 1.5,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: "2%",
  },

  cardStyle: {
  },
});

export default BillSplitScreen;
