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
import { BillItem, PersonShare } from "../../types/billScanning/billItemType";
import { Person, ItemShareData } from "../../types/billScanning/personType";
import { useNavigation } from "@react-navigation/native";
import { parseReceiptResponse } from "@utils";

const BillSplitScreen: React.FC = () => {
  const navigation = useNavigation();
  const [editCardPopupVisible, setEditCardPopupVisible] = useState(false);
  const [addPersonPopupVisible, setAddPersonPopupVisible] = useState(false);
  const [totalBreakdownPopupVisible, setTotalBreakdownPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BillItem | undefined>(
    undefined
  );
  const [persons, setPersons] = useState<Person[]>([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [billTotal, setBillTotal] = useState<string>("0.00");
  const [itemShares, setItemShares] = useState<ItemShareData>({}); // New state for managing shares

  // Move openCardPopup inside the component to access state
  const openCardPopup = (item: BillItem): void => {
    setSelectedItem(item);
    setEditCardPopupVisible(true);
  };

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
    const currentShares = getPersonShareForItem(billItem.id, personIndex);
    if (currentShares > 0) {
      // Remove person from item (set shares to 0)
      updatePersonShares(billItem.id, personIndex, 0);
    } else {
      // Add person to item with 1 share by default
      updatePersonShares(billItem.id, personIndex, 1);
    }
  };

  const isPersonSelectedForItem = (billItem: BillItem, personIndex: number): boolean => {
    return isPersonAssignedToItem(billItem.id, personIndex);
  };

  const getPersonInitials = (name: string): string => {
    return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2);
  };

  // New share management functions
  const getSharesForItem = (itemId: number): PersonShare[] => {
    return itemShares[itemId] || [];
  };

  const updatePersonShares = (itemId: number, personIndex: number, shares: number) => {
    setItemShares(prevShares => {
      const itemSharesArray = prevShares[itemId] || [];
      const existingShareIndex = itemSharesArray.findIndex(share => share.personIndex === personIndex);
      
      let updatedShares: PersonShare[];
      
      if (shares <= 0) {
        // Remove person from shares if shares is 0 or negative
        updatedShares = itemSharesArray.filter(share => share.personIndex !== personIndex);
      } else {
        if (existingShareIndex >= 0) {
          // Update existing share
          updatedShares = [...itemSharesArray];
          updatedShares[existingShareIndex] = { personIndex, shares };
        } else {
          // Add new share
          updatedShares = [...itemSharesArray, { personIndex, shares }];
        }
      }

      // Calculate percentages
      const totalShares = updatedShares.reduce((sum, share) => sum + share.shares, 0);
      const sharesWithPercentages = updatedShares.map(share => ({
        ...share,
        percentage: totalShares > 0 ? (share.shares / totalShares) * 100 : 0
      }));

      return {
        ...prevShares,
        [itemId]: sharesWithPercentages
      };
    });
  };

  const getPersonShareForItem = (itemId: number, personIndex: number): number => {
    const shares = getSharesForItem(itemId);
    const personShare = shares.find(share => share.personIndex === personIndex);
    return personShare?.shares || 0;
  };

  const isPersonAssignedToItem = (itemId: number, personIndex: number): boolean => {
    return getPersonShareForItem(itemId, personIndex) > 0;
  };

  const closeCardPopup = (): void => {
    setEditCardPopupVisible(false);
  };

  const openTotalBreakdownPopup = (): void => {
    setTotalBreakdownPopupVisible(true);
  };

  const closeTotalBreakdownPopup = (): void => {
    setTotalBreakdownPopupVisible(false);
  };

  // Calculate how much each person owes
  const calculatePersonTotals = () => {
    const personTotals: { [personIndex: number]: number } = {};
    
    // Initialize all persons with 0
    persons.forEach((_, index) => {
      personTotals[index] = 0;
    });

    // Calculate totals for each person based on their shares
    billItems.forEach(item => {
      const itemPrice = parseFloat(item.price);
      const shares = getSharesForItem(item.id);
      const totalShares = shares.reduce((sum, share) => sum + share.shares, 0);
      
      if (totalShares > 0) {
        shares.forEach(share => {
          const personAmount = (itemPrice * share.shares) / totalShares;
          personTotals[share.personIndex] += personAmount;
        });
      }
    });

    return personTotals;
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
              Tap the + button above to add people
            </Text>
          </View>
        ) : billItems.length === 0 ? (
          <View style={styles.pleaseMessageContainer}>
            <Text style={styles.pleaseMessageText}>
              Tap the receipt above to scan your bill
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
                      {persons.length > 0 ? (
                        persons.map((person, personIndex) => {
                          const shares = getPersonShareForItem(item.id, personIndex);
                          const isAssigned = shares > 0;
                          return (
                            <View key={personIndex} style={styles.personAvatarContainer}>
                              <Avatar
                                initials={getPersonInitials(person.name)}
                                size={36}
                                isSelected={isAssigned}
                                onPress={() => togglePersonForItem(item, personIndex)}
                                selectedColor="#4D96FF"
                                unselectedColor="#E5E7EB"
                              />
                              {isAssigned && (
                                <Text style={styles.sharesBadge}>{shares}</Text>
                              )}
                            </View>
                          );
                        })
                      ) : (
                        <Text style={styles.noPersonsText}>No people added</Text>
                      )}
                    </View>
                  </Card>
                )}
              />
            </View>

            <Card style={styles.cardStyle}>
              <Pressable onPress={openTotalBreakdownPopup}>
                <View style={styles.cardTotalStyle}>
                  <Text style={{ fontWeight: "bold" }}>Total</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {billTotal} {billItems[0]?.currency ?? "RON"}
                  </Text>
                </View>
              </Pressable>
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
            <View style={styles.cardPopupHeaderLeft}>
              <Text style={styles.itemNameText}>{selectedItem?.name}</Text>
              <Text style={styles.itemPriceText}>
                {selectedItem?.price} {selectedItem?.currency}
              </Text>
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
              <View style={styles.sharesContainer}>
                <FlatList
                  data={persons}
                  keyExtractor={(_, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  style={[styles.personsVerticalList]}
                  contentContainerStyle={{padding: 8, flexGrow: 1}}
                  renderItem={({ item: person, index: personIndex }) => {
                    const currentShares = getPersonShareForItem(selectedItem?.id || 0, personIndex);
                    const shares = getSharesForItem(selectedItem?.id || 0);
                    const totalShares = shares.reduce((sum, share) => sum + share.shares, 0);
                    const percentage = totalShares > 0 && currentShares > 0 
                      ? ((currentShares / totalShares) * 100).toFixed(1) 
                      : '0';

                    return (
                      <View style={[styles.personShareItem]}>
                        <View style={styles.personShareRow}>
                          <View style={styles.personShareInfo}>
                            <Avatar
                              initials={getPersonInitials(person.name)}
                              size={48}
                              isSelected={currentShares > 0}
                              onPress={() => {
                                if (currentShares > 0) {
                                  updatePersonShares(selectedItem?.id || 0, personIndex, 0);
                                } else {
                                  updatePersonShares(selectedItem?.id || 0, personIndex, 1);
                                }
                              }}
                              selectedColor="#4D96FF"
                              unselectedColor="#E5E7EB"
                            />
                            <View style={styles.personShareDetails}>
                              <Text style={[
                                styles.personNameLabel,
                                { color: currentShares > 0 ? "#4D96FF" : "#6B7280" }
                              ]}>
                                {person.name}
                              </Text>
                              <Text style={styles.percentageLabel}>
                                {percentage}%
                              </Text>
                            </View>
                          </View>
                          <View style={styles.shareInputContainer}>
                            <Input
                              value={currentShares.toString()}
                              onChangeText={(value) => {
                                const shares = parseInt(value) || 0;
                                updatePersonShares(selectedItem?.id || 0, personIndex, shares);
                              }}
                              keyboardType="numeric"
                              style={[
                                styles.shareInput,
                                { 
                                  borderColor: currentShares > 0 ? "#4D96FF" : "#E5E7EB",
                                  backgroundColor: currentShares > 0 ? "#F0F7FF" : "#FFFFFF"
                                }
                              ]}
                              placeholder="0"
                            />
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
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
        </View>
      </AnimatedPopupCard>

      <AnimatedPopupCard
        visible={totalBreakdownPopupVisible}
        onClose={closeTotalBreakdownPopup}
      >
        <View style={styles.totalBreakdownPopupContainer}>
          <View style={styles.totalBreakdownHeader}>
            <Text style={styles.totalBreakdownTitle}>Bill Split Breakdown</Text>
            <Pressable 
              onPress={closeTotalBreakdownPopup}
              style={styles.closeButtonContainer}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <CloseIcon width={30} height={30} />
            </Pressable>
          </View>
          
          <View style={styles.totalBreakdownContent}>
            <FlatList
              data={persons}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.personTotalsList}
              renderItem={({ item: person, index: personIndex }) => {
                const personTotals = calculatePersonTotals();
                const personAmount = personTotals[personIndex] || 0;
                const currency = billItems[0]?.currency ?? "RON";
                
                return (
                  <View style={styles.personTotalItem}>
                    <View style={styles.personTotalInfo}>
                      <Avatar
                        initials={getPersonInitials(person.name)}
                        size={48}
                        isSelected={personAmount > 0}
                        selectedColor="#4D96FF"
                        unselectedColor="#E5E7EB"
                      />
                      <View style={styles.personTotalDetails}>
                        <Text style={[
                          styles.personTotalName,
                          { color: personAmount > 0 ? "#374151" : "#9CA3AF" }
                        ]}>
                          {person.name}
                        </Text>
                        <Text style={styles.personTotalAmount}>
                          {personAmount.toFixed(2)} {currency}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
            
            <View style={styles.totalSummaryCard}>
              <View style={styles.totalSummaryRow}>
                <Text style={styles.totalSummaryLabel}>Total Bill:</Text>
                <Text style={styles.totalSummaryValue}>
                  {billTotal} {billItems[0]?.currency ?? "RON"}
                </Text>
              </View>
            </View>
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
    maxHeight: "85%", // Reduce from 90% to ensure content fits
    minHeight: 400, // Ensure minimum height for content
  },

  cardPopupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  cardPopupHeaderLeft: {
    flex: 1,
    alignItems: "flex-start",
  },

  itemNameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },

  itemPriceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },

  closeButtonContainer: {
    padding: 4,
    borderRadius: 4,
  },

  cardPopupItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardPopupPersonsContainer: { 
    flex: 1, // Take available space
    minHeight: 200, // Ensure minimum height
  },

  personsVerticalList: {
    flex: 1, // Take available space within parent
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

  sharesBadge: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4D96FF",
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    textAlign: "center",
    marginTop: 2,
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

  // New styles for sharing functionality
  sharesContainer: {
    flex: 1,
  },

  sharesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },

  sharesSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    lineHeight: 20,
  },

  personShareItem: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  personShareRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  personShareInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },

  personShareDetails: {
    flex: 1,
  },

  percentageLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },

  shareInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  shareInput: {
    width: 60,
    height: 36,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  shareInputLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },

  shareSummary: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  shareSummaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
  },

  shareSummaryText: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 2,
  },

  // Total breakdown popup styles
  totalBreakdownPopupContainer: {
    alignItems: "stretch",
    padding: 16,
    gap: 16,
    maxHeight: "85%",
    minHeight: 400,
  },

  totalBreakdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  totalBreakdownTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
  },

  totalBreakdownContent: {
    flex: 1,
  },

  personTotalsList: {
    flex: 1,
    marginBottom: 16,
  },

  personTotalItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  personTotalInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  personTotalDetails: {
    flex: 1,
  },

  personTotalName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },

  personTotalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
  },

  totalSummaryCard: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },

  totalSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalSummaryLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },

  totalSummaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
});

export default BillSplitScreen;
