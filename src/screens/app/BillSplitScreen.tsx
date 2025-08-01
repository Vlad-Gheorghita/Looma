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
import EditIcon from "@icons/edit-icon.svg";
import CloseIcon from "@icons/close-square-icon.svg";
import AddPersonIcon from "@icons/add-person-icon.svg";
import { BillItem } from "../../types/billScanning/billItemType";
import { Person } from "../../types/billScanning/personType";
import { useNavigation } from "@react-navigation/native";
import { parseReceiptResponse } from "@utils";

// Move openCardPopup outside the component and pass setters as arguments
const openCardPopup = (
  item: BillItem,
  setSelectedItem: React.Dispatch<React.SetStateAction<BillItem | undefined>>,
  setEditCardPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  setSelectedItem(item);
  setEditCardPopupVisible(true);
};

const BillSplitScreen: React.FC = () => {
  const navigation = useNavigation();
  const [editCardPopupVisible, setEditCardPopupVisible] = useState(false);
  const [addPersonPopupVisible, setAddPersonPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BillItem | undefined>(
    undefined
  );
  const [persons, setPersons] = useState<Person[]>([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [billTotal, setBillTotal] = useState<string>("0.00");

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
      console.log("AI Response:", aiResult.text);
      
      // Parse the JSON response using utility function
      const { items, total } = parseReceiptResponse(aiResult.text);
      
      // Update state with parsed data
      setBillItems(items);
      setBillTotal(total);
      
      console.log("Parsed items:", items);
      console.log("Total:", total);
      
    } catch (error) {
      console.error("Error parsing receipt data:", error);
      ToastService.error("Error Scanning Receipt");
    }
  };

  const handleReceiptImagePress = () => {
    // Show add person popup only if no persons are saved
    if (persons.length === 0) {
      setAddPersonPopupVisible(true);
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
    setNewPersonName("");
  };

  const togglePersonForItem = (billItem: BillItem, personIndex: number) => {
    setPersons(prevPersons => {
      const updatedPersons = [...prevPersons];
      const person = updatedPersons[personIndex];
      
      // Check if this item is already in the person's payingItems
      const itemIndex = person.payingItems.findIndex(item => item.id === billItem.id);
      
      if (itemIndex >= 0) {
        // Remove item from person's payingItems immutably
        person.payingItems = person.payingItems.filter(item => item.id !== billItem.id);
      } else {
        // Add item to person's payingItems immutably
        person.payingItems = [...person.payingItems, billItem];
      }
      console.log(`Updated ${person.name}'s paying items:`, person.payingItems);
      return updatedPersons;
    });
  };

  const isPersonSelectedForItem = (billItem: BillItem, personIndex: number): boolean => {
    return persons[personIndex]?.payingItems.some(item => item.id === billItem.id) || false;
  };

  const getPersonInitials = (name: string): string => {
    return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2);
  };

  // openCardPopup moved outside the component to avoid recreation on each render

  const closeCardPopup = (): void => {
    setEditCardPopupVisible(false);
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
            <Text style={styles.pleaseMessageText}>
              Welcome to Bill Split!{'\n'}
              Tap the + button above to add people to split with
            </Text>
          </View>
        ) : billItems.length === 0 ? (
          <View style={styles.pleaseMessageContainer}>
            <Text style={styles.pleaseMessageText}>
              Great! Now tap the receipt above to scan your bill
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.reciptItemsList}>
              <FlatList
                contentContainerStyle={{ gap: 10, paddingBottom: 8 }}
                showsVerticalScrollIndicator={false}
                data={billItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Card style={styles.cardStyle}>
                    <View style={styles.cardItemDetailsStyle}>
                      <Pressable onPress={() => openCardPopup(item, setSelectedItem, setEditCardPopupVisible)}>
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
                      {persons.length > 0 ? (
                        persons.map((person, personIndex) => (
                          <Avatar
                            key={personIndex}
                            initials={getPersonInitials(person.name)}
                            size={36}
                            isSelected={isPersonSelectedForItem(item, personIndex)}
                            onPress={() => togglePersonForItem(item, personIndex)}
                            selectedColor="#4D96FF"
                            unselectedColor="#E5E7EB"
                          />
                        ))
                      ) : (
                        <Text style={styles.noPersonsText}>No people added</Text>
                      )}
                    </View>
                  </Card>
                )}
              />
            </View>

            <Card style={styles.cardStyle}>
              <View style={styles.cardTotalStyle}>
                <Text style={{ fontWeight: "bold" }}>Total</Text>
                <Text style={{ fontWeight: "bold" }}>
                  {billTotal} {billItems[0]?.currency ?? "RON"}
                </Text>
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
            {persons.length === 0 ? (
              <View style={styles.noPersonsContainer}>
                <Text style={styles.noPersonsMessage}>
                  No people added yet.{'\n'}
                  Tap the + button above to add people to split with.
                </Text>
                <Button
                  title="Add People"
                  onPress={() => {
                    closeCardPopup();
                    setTimeout(() => setAddPersonPopupVisible(true), 300);
                  }}
                  styling={{
                    button: { marginTop: 16, paddingHorizontal: 20 }
                  }}
                />
              </View>
            ) : (
              <FlatList
                data={persons}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={true}
                style={styles.personsVerticalList}
                renderItem={({ item: person, index: personIndex }) => (
                  <View style={styles.personVerticalItem}>
                    <Avatar
                      initials={getPersonInitials(person.name)}
                      size={48}
                      isSelected={selectedItem ? isPersonSelectedForItem(selectedItem, personIndex) : false}
                      onPress={() => selectedItem && togglePersonForItem(selectedItem, personIndex)}
                      selectedColor="#4D96FF"
                      unselectedColor="#E5E7EB"
                    />
                    <Text style={[
                      styles.personNameLabel,
                      { color: selectedItem && isPersonSelectedForItem(selectedItem, personIndex) ? "#4D96FF" : "#6B7280" }
                    ]}>
                      {person.name}
                    </Text>
                  </View>
                )}
              />
            )}
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
              <FlatList
                style={styles.personsScrollableList}
                data={persons}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View style={styles.personItem}>
                    <Text style={styles.personName}>{item.name}</Text>
                    <Pressable
                      onPress={() => removePerson(index)}
                      style={styles.removePersonButton}
                    >
                      <Text style={styles.removePersonText}>×</Text>
                    </Pressable>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              />
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
    borderRadius: 12,
    backgroundColor: "#fafafa",
    paddingHorizontal: 8,
    paddingTop: 8,
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
    padding: 16,
    paddingTop: 0,
    gap: 16,
    maxHeight: "90%", // Limit popup height to 90% of screen
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

  cardPopupPersonsContainer: { 
    // Remove flex and height, let it size naturally
  },

  personsVerticalList: {
    maxHeight: 300, // Similar to the working personsScrollableList
  },

  personVerticalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 16,
  },

  personAvatarContainer: {
    alignItems: "center",
    gap: 8,
  },

  personNameLabel: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },

  noPersonsText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontStyle: "italic",
  },

  noPersonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  noPersonsMessage: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },

  addPersonPopupContainer: {
    alignItems: "stretch",
    padding: 16,
    gap: 16,
    maxHeight: "90%", // Ensure popup doesn't exceed 90% of screen height
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

  personsScrollableList: {
    maxHeight: 200, // Limit height to prevent popup overflow
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
});

export default BillSplitScreen;
