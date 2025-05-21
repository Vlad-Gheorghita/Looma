import { globalStyling } from "@styling";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@components";
import { pickImage, readRecipt } from "@billSpltterService";

const BillSplitScreen: React.FC = () => {

  //TODO: Work in Progress
  const handleScanBill = async () => {
    console.log("button pressed");
    const image = await pickImage();
    if(image.canceled) return;

    const aiResult = await readRecipt(image);
    console.log(aiResult.text);
  };

  return (
    <View style={[globalStyling.pageStyle]}>
      <Button title="Upload Photo" onPress={handleScanBill} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BillSplitScreen;
