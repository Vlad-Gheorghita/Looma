import { globalStyling } from "@styling";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AnimatedCard, AnimatedPopupCard, Avatar, Card } from "@components";
import { pickImage, readRecipt } from "@billSpltterService";
import { useAnimatedStyle } from "react-native-reanimated";
import { usePulseAnimation } from "@hooks";
import { ToastService } from "@toastService";
import { LinearGradient } from "expo-linear-gradient";
import EditIcon from "@icons/edit-icon.svg";

const BillSplitScreen: React.FC = () => {
  const [popupVisible, setPopupVisible] = useState(false);

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

  const cardData = [
    {
      id: "1",
      itemName: "Banane",
      price: "5.67",
      currency: "LEI",
    },
    {
      id: "2",
      itemName: "Carne",
      price: "27.30",
      currency: "LEI",
    },
    {
      id: "3",
      itemName: "Paine",
      price: "5.32",
      currency: "LEI",
    },
    {
      id: "4",
      itemName: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
    {
      id: "5",
      itemName: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
    {
      id: "6",
      itemName: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
    {
      id: "7",
      itemName: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
    {
      id: "8",
      itemName: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
  ];

  const bgColor = "#dddddd";

  return (
    <View style={[globalStyling.pageStyle]}>
      {/* <Button title="Upload Photo" onPress={handleScanBill} /> */}
      <View style={styles.reciptImageContainer}>
        <AnimatedCard style={styles.imageCard} animatedStyle={animatedStyle}>
          <Image
            source={require("@images/recipt_image_alt.png")}
            style={styles.reciptAltStyle}
            resizeMode="contain"
          />
        </AnimatedCard>
      </View>

      <View style={styles.reciptItemsListContainer}>
        <FlatList
          contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          data={cardData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.cardStyle}>
              <View style={styles.cardItemDetailsStyle}>
                <Pressable onPress={() => setPopupVisible(true)}>
                  <View style={[styles.cartItemNameContainer]}>
                    <Text style={{ fontWeight: "bold" }}>{item.itemName}</Text>
                    <EditIcon width={"15%"} height={"100%"} />
                  </View>
                </Pressable>
                <Text style={{ fontWeight: "bold" }}>
                  {item.price} {item.currency}
                </Text>
              </View>
              <View style={styles.cardAssignedPersonsStyle}>
                <Avatar initials="Vl" />
                <Avatar initials="La" />
                <Avatar initials="Da" />
                <Avatar initials="Dr" />
              </View>
            </Card>
          )}
        />

        {/* Top gradient shadow */}
        {/* <LinearGradient
          colors={[bgColor, bgColor + "00"]}
          style={styles.topShadow}
          pointerEvents="none"
        /> */}

        {/* Bottom gradient shadow */}
        <LinearGradient
          colors={[bgColor + "00", bgColor]}
          style={styles.bottomShadow}
          pointerEvents="none"
        />
      </View>

      <AnimatedPopupCard
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      >
        <Text>Hopaaaa</Text>
        <Pressable onPress={() => setPopupVisible(false)}>
          <Text style={{ fontWeight: "bold" }}>Inchiiideee baaa</Text>
        </Pressable>
      </AnimatedPopupCard>
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
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: 20,
  },

  cardItemDetailsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cartItemNameContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "5%",
  },

  cardAssignedPersonsStyle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    flexWrap: "wrap",
  },

  topShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 10,
  },

  bottomShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 10,
  },
});

export default BillSplitScreen;
