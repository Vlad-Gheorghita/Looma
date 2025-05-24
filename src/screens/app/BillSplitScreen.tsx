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
import CloseIcon from "@icons/close-square-icon.svg";
import { BillItem } from "../../types/billItemTypes";

const BillSplitScreen: React.FC = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BillItem | undefined>(
    undefined
  );
  const [gradientColor, setGradientColor] = useState("#eeeeee")

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

  const cardData: BillItem[] = [
    {
      id: 1,
      name: "Banane",
      price: "5.67",
      currency: "LEI",
    },
    {
      id: 2,
      name: "Carne",
      price: "27.30",
      currency: "LEI",
    },
    {
      id: 3,
      name: "Paine",
      price: "5.32",
      currency: "LEI",
    },
    {
      id: 4,
      name: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
    {
      id: 5,
      name: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
    {
      id: 6,
      name: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
    {
      id: 7,
      name: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
    {
      id: 8,
      name: "Lapte",
      price: "9.99",
      currency: "LEI",
    },
  ];


  const openCardPopup = (item: BillItem): void => {
    setSelectedItem(item);
    setPopupVisible(true);
    setGradientColor("#bbbbbb");
  };

  const closeCardPopup = (): void => {
    setPopupVisible(false);
    setGradientColor("#eeeeee");
  };

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
        <View style={styles.reciptItemsList}>
          <FlatList
            contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
            data={cardData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.cardStyle}>
                <View style={styles.cardItemDetailsStyle}>
                  <Pressable onPress={() => openCardPopup(item)}>
                    <View style={[styles.cartItemNameContainer]}>
                      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
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
          <LinearGradient
          colors={[gradientColor, gradientColor + "00"]}
          style={styles.topShadow}
          pointerEvents="none"
        />

          {/* Bottom gradient shadow */}
          <LinearGradient
            colors={[gradientColor + "00", gradientColor]}
            style={styles.bottomShadow}
            pointerEvents="none"
          />
        </View>

        <Card style={styles.cardStyle}>
          <View style={styles.cardTotalStyle}>
            <Text style={{ fontWeight: "bold" }}>Total</Text>
            <Text style={{ fontWeight: "bold" }}>127.38 LEI</Text>
          </View>
        </Card>
      </View>

      <AnimatedPopupCard visible={popupVisible} onClose={closeCardPopup}>
        <View style={styles.cardPopupContainer}>
          <View style={styles.cardPopupHeader}>
            <Text style={{ fontWeight: "bold" }}>{selectedItem?.name}</Text>
            <View style={styles.cardPopupHeaderClose}>
              <Text style={{ fontWeight: "bold" }}>
                {selectedItem?.price} {selectedItem?.currency}
              </Text>
              <Pressable onPress={closeCardPopup}>
                <CloseIcon width={30} height={30} />
              </Pressable>
            </View>
          </View>
          <View style={styles.cardPopupPersonsContainer}>
            <Avatar initials="Vl" />
            <Avatar initials="La" />
            <Avatar initials="Da" />
            <Avatar initials="Dr" />
          </View>
        </View>
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
    width: "50%",
  },

  reciptItemsListContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: "2%",
  },

  reciptItemsList: {
    flex: 20
  },

  cardStyle: {
    flex: 1,
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

  cardTotalStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardPopupContainer: {
    alignItems: "stretch",
    padding: "2%",
    paddingTop: 0,
    gap: 10,
  },

  cardPopupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardPopupHeaderClose: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  cardPopupItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardPopupPersonsContainer: { gap: 20 },

  topShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 20,
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
