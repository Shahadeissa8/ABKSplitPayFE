import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const savedCards = [
  {
    id: "1",
    bank: "ABK",
    cardType: "Visa",
    lastFourDigits: "9231",
    expiryDate: "12/26",
    color: "#F7B500",
    secondaryColor: "#003B7B",
    isDefault: true,
  },
  // {
  //   id: "2",
  //   bank: "KFH",
  //   cardType: "Mastercard",
  //   lastFourDigits: "7823",
  //   expiryDate: "08/24",
  //   color: "#2B8F4C",
  //   secondaryColor: "#1D5F33",
  // },
  // {
  //   id: "3",
  //   bank: "NBK",
  //   cardType: "Visa",
  //   lastFourDigits: "4582",
  //   expiryDate: "05/25",
  //   color: "#003D7D",
  //   secondaryColor: "#E31B23",
  // },
];

const Payment = () => {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState(savedCards);

  const handleDeleteCard = (cardId) => {
    Alert.alert("Delete Card", "Are you sure you want to delete this card?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setCards(cards.filter((card) => card.id !== cardId));
          if (selectedCard?.id === cardId) {
            setSelectedCard(null);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const handleSetDefault = (cardId) => {
    Alert.alert(
      "Set as Default",
      "Do you want to set this card as your default payment method?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Set as Default",
          onPress: () => {
            setCards(
              cards.map((card) => ({
                ...card,
                isDefault: card.id === cardId,
              }))
            );
          },
        },
      ]
    );
  };

  const renderCard = (card) => (
    <TouchableOpacity
      key={card.id}
      style={[
        styles.cardContainer,
        selectedCard?.id === card.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedCard(card)}
    >
      <LinearGradient
        colors={[card.color, card.secondaryColor]}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.defaultButton}
            onPress={(e) => {
              e.stopPropagation();
              handleSetDefault(card.id);
            }}
          >
            <Ionicons
              name={card.isDefault ? "star" : "star-outline"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={(e) => {
              e.stopPropagation();
              handleDeleteCard(card.id);
            }}
          >
            <Ionicons name="trash-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {card.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultBadgeText}>Default</Text>
          </View>
        )}

        <View style={styles.cardHeader}>
          <Text style={styles.bankName}>{card.bank}</Text>
          <Text style={styles.cardType}>{card.cardType}</Text>
        </View>
        <View style={styles.cardNumber}>
          <Text style={styles.cardNumberText}>
            •••• •••• •••• {card.lastFourDigits}
          </Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.expiryLabel}>Expires</Text>
          <Text style={styles.expiryDate}>{card.expiryDate}</Text>
        </View>
        {selectedCard?.id === card.id && (
          <View style={styles.selectedCheckmark}>
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#26589c" />
      <LinearGradient
        colors={["#26589c", "#26589c"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Cards</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Payment")}
            style={styles.addCardButton}
          >
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        >
          {cards.map(renderCard)}
        </ScrollView>
      </View>
      {/* 
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, !selectedCard && styles.payButtonDisabled]}
          disabled={!selectedCard}
          onPress={() => navigation.goBack()}
        >
          <LinearGradient
            colors={
              selectedCard
                ? [selectedCard.color, selectedCard.secondaryColor]
                : ["#ccc", "#999"]
            }
            style={styles.payButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.payButtonText}>Select Card</Text>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  addCardButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cardsContainer: {
    gap: 16,
    paddingBottom: 16,
  },
  cardContainer: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#26589c",
  },
  cardGradient: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  bankName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  cardType: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  cardNumber: {
    marginBottom: 20,
  },
  cardNumberText: {
    fontSize: 22,
    letterSpacing: 2,
    color: "#fff",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiryLabel: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
    marginRight: 8,
  },
  expiryDate: {
    fontSize: 16,
    color: "#fff",
  },
  selectedCheckmark: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  payButton: {
    borderRadius: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonGradient: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardActions: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    gap: 8,
    zIndex: 1,
  },

  defaultButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultBadge: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  defaultBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
//
