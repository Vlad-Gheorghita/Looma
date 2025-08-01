import { globalStyling } from "@styling";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AnimatedCard,
  AnimatedPopupCard,
  Avatar,
  Card,
  Input,
  Button,
} from "@components";
import { pickImage, readRecipt } from "@billSpltterService";
import { useAnimatedStyle } from "react-native-reanimated";
import { usePulseAnimation } from "@hooks";
import { ToastService } from "@toastService";
import { LinearGradient } from "expo-linear-gradient";
import EditIcon from "@icons/edit-icon.svg";
import CloseIcon from "@icons/close-square-icon.svg";
import AddPersonIcon from "@icons/add-person-icon.svg";
import { BillItem } from "../../types/billScanning/billItemType";
import { Person } from "../../types/billScanning/personType";
import { useNavigation } from "@react-navigation/native";

const BillSplitScreen: React.FC = () => {
  const navigation = useNavigation();
  const [editCardPopupVisible, setEditCardPopupVisible] = useState(false);
  const [addPersonPopupVisible, setAddPersonPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BillItem | undefined>(
    undefined
  );
  const [persons, setPersons] = useState<Person[]>([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [gradientColor, setGradientColor] = useState("#eeeeee");
  const [billItems, setBillItems] = useState<BillItem[]>([]);

  const { scale } = usePulseAnimation();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Set up header right button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => setAddPersonPopupVisible(true)}
          style={{ marginRight: 15 }}
        >
          <AddPersonIcon width={24} height={24} />
        </Pressable>
      ),
    });
  }, [navigation]);

  //TODO: Work in Progress
  const handleScanBill = async () => {
    console.log("button pressed");
    try {
      const image = await pickImage();
      if (image.canceled) return;

      const aiResult = await readRecipt(image);
      console.log(aiResult.text);
    } catch (error) {
      ToastService.error("Error Scanning Receipt");
    }
  };

  const handleReceiptImagePress = () => {
    // Show add person popup only if no persons are saved
    if (persons.length === 0) {
      setAddPersonPopupVisible(true);
      setGradientColor("#bbbbbb");
    } else {
      // If persons exist, show scan receipt functionality
      handleScanBill();
    }
  };

  const addPerson = () => {
    if (newPersonName.trim()) {
      const newPerson: Person = {
        name: newPersonName.trim(),
        payingItems: [],
      };
      setPersons([...persons, newPerson]);
      setNewPersonName("");
    }
  };

  const removePerson = (indexToRemove: number) => {
    setPersons(persons.filter((_, index) => index !== indexToRemove));
  };

  const closeAddPersonPopup = () => {
    setAddPersonPopupVisible(false);
    setGradientColor("#eeeeee");
    setNewPersonName("");
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
    setEditCardPopupVisible(true);
    setGradientColor("#bbbbbb");
  };

  const closeCardPopup = (): void => {
    setEditCardPopupVisible(false);
    setGradientColor("#eeeeee");
  };

  return (
    <View style={[globalStyling.pageStyle]}>
      {/* <Button title="Upload Photo" onPress={handleScanBill} /> */}
      <View style={styles.reciptImageContainer}>
        <AnimatedCard style={styles.imageCard} animatedStyle={animatedStyle}>
          <Pressable
            onPress={handleReceiptImagePress}
            style={styles.imageCardPressable}
          >
            <Image
              source={require("@images/recipt_image_alt.png")}
              style={styles.reciptAltStyle}
              resizeMode="contain"
            />
          </Pressable>
        </AnimatedCard>
      </View>

      <View style={styles.reciptItemsListContainer}>
        {persons.length === 0 ? (
          <View style={styles.pleaseMessageContainer}>
            <Text style={styles.pleaseMessageText}>Please scan a receipt</Text>
          </View>
        ) : (
          <>
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
                          <Text style={{ fontWeight: "bold" }}>
                            {item.name}
                          </Text>
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
          </>
        )}
      </View>

      <AnimatedPopupCard
        visible={editCardPopupVisible}
        onClose={() => closeCardPopup()}
      >
        <View style={styles.cardPopupContainer}>
          <View style={styles.cardPopupHeader}>
            <Text style={{ fontWeight: "bold" }}>{selectedItem?.name}</Text>
            <View style={styles.cardPopupHeaderClose}>
              <Text style={{ fontWeight: "bold" }}>
                {selectedItem?.price} {selectedItem?.currency}
              </Text>
              <Pressable onPress={() => closeCardPopup()}>
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

      <AnimatedPopupCard
        visible={addPersonPopupVisible}
        onClose={closeAddPersonPopup}
      >
        <View style={styles.addPersonPopupContainer}>
          <Text style={styles.addPersonTitle}>Add People to Split With</Text>

          <View style={styles.addPersonInputContainer}>
            <Input
              placeholder="Enter person's name"
              value={newPersonName}
              onChangeText={setNewPersonName}
              style={styles.personInput}
            />
            <Button
              title="Add"
              onPress={addPerson}
              disabled={!newPersonName.trim()}
              styling={{
                button: styles.addPersonButton,
                title: styles.addPersonButtonText,
              }}
            />
          </View>

          {persons.length > 0 && (
            <View style={styles.personsListContainer}>
              <Text style={styles.personsListTitle}>People:</Text>
              {persons.map((person, index) => (
                <View key={index} style={styles.personItem}>
                  <Text style={styles.personName}>{person.name}</Text>
                  <Pressable
                    onPress={() => removePerson(index)}
                    style={styles.removePersonButton}
                  >
                    <Text style={styles.removePersonText}>×</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}

          <Button
            title="Done"
            onPress={closeAddPersonPopup}
            disabled={persons.length === 0}
            styling={{
              button: styles.doneButton,
              title: styles.doneButtonText,
            }}
          />
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

  imageCardPressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  reciptItemsListContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: "2%",
  },

  pleaseMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  pleaseMessageText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },

  reciptItemsList: {
    flex: 20,
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

  addPersonPopupContainer: {
    alignItems: "stretch",
    padding: 16,
    gap: 16,
  },

  addPersonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  addPersonInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  personInput: {
    flex: 1,
    height: 40,
  },

  addPersonButton: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    height: 40,
    minHeight: 40,
  },

  addPersonButtonText: {
    fontSize: 16,
    padding: 0,
  },

  personsListContainer: {
    gap: 8,
  },

  personsListTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  personItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
  },

  personName: {
    fontSize: 16,
    flex: 1,
  },

  removePersonButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
  },

  removePersonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  doneButton: {
    marginTop: 8,
    paddingVertical: 8,
    height: 44,
    minHeight: 44,
  },

  doneButtonText: {
    fontSize: 16,
    padding: 4,
  },

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
