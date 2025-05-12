import { globalStyling } from "@styling";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { recognizeTextFromImage, parseBillText } from "@ocrService";
import { Button } from "@components";

type Item = {
  name: string;
  price: number;
};

const BillSplitScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  //TODO: Work in Progress
  const handleScanBill = async () => {
    console.log("button pressed");
    // const result = await launchCamera({ mediaType: "photo" });
    const result = await launchImageLibrary({mediaType: "photo"});
    // console.log(result);
    const uri = result.assets?.[0]?.uri;
    if (!uri) return;

    setImageUri(uri);
    // setLoading(true);

    try {
      const text = await recognizeTextFromImage(uri);
      console.log(text);
      // const parsed = parseBillText(text);
      // setItems(parsed);
    } catch (error) {
      Alert.alert("OCR Error", "Failed to recognize text from image.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <View style={[globalStyling.pageStyle]}>
      <Button title="Upload Photo" onPress={handleScanBill} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BillSplitScreen;
