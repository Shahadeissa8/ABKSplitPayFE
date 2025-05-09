import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getPaymentMethods, deletePaymentMethod } from "../../api/profile";
import { actionIcons, Header } from "../../components/Header";

const cardTypeColors = {
  Visa: { color: "#1A1F71", secondaryColor: "#F7B500" },
  Mastercard: { color: "#CC0000", secondaryColor: "#FF9900" },
};

const Payment = ({ navigation, route }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadPaymentMethods();
  }, [route.params?.refresh]);
  const loadPaymentMethods = async () => {
    try {
      const paymentMethods = await getPaymentMethods();
      setCards(paymentMethods);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to load payment methods. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const handleDeleteCard = async (cardId) => {
    Alert.alert("Delete Card", "Are you sure you want to delete this card?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePaymentMethod(cardId);
            const updatedCards = cards.filter(
              (card) => card.paymentMethodId !== cardId
            );
            setCards(updatedCards);
            if (selectedCard?.paymentMethodId === cardId) {
              setSelectedCard(null);
            }
            Alert.alert("Success", "Card deleted successfully", [
              { text: "OK" },
            ]);
          } catch (error) {
            Alert.alert("Error", "Failed to delete card. Please try again.", [
              { text: "OK" },
            ]);
          }
        },
      },
    ]);
  };
  const renderCard = (card) => {
    const colors = cardTypeColors[card.cardType] || {
      color: "#26589c",
      secondaryColor: "#9cb2d8",
    };
  
    // Map cardType to its corresponding image
    const cardTypeImages = {
      Visa: require("../../../assets/Visa.png"),
      Mastercard: require("../../../assets/Mastercard-logo.png"),
    };
  
    return (
      <TouchableOpacity
        key={card.paymentMethodId}
        style={[styles.cardContainer]}
      >
        <LinearGradient
          colors={[colors.color, colors.secondaryColor]}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={(e) => {
                e.stopPropagation();
                handleDeleteCard(card.paymentMethodId);
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
  
          <View style={styles.cardHeader}>
            <Text style={styles.cardHolder}>{card.token}</Text>
            {/* Replace cardType name with its image */}
            <Image
              source={cardTypeImages[card.cardType]}
              style={styles.cardTypeImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardNumber}>
            <Text style={styles.cardNumberText}>
              •••• •••• •••• {card.lastFourDigits}
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.expiryLabel}>Expires</Text>
            <Text style={styles.expiryDate}>
              {card.expiryMonth}/{card.expiryYear.toString().slice(-2)}
            </Text>
          </View>


          {card.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
  
          {selectedCard?.paymentMethodId === card.paymentMethodId && (
            <View style={styles.selectedCheckmark}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />

      <Header
        title="Payment methods"
        backButtonAction={() => navigation.goBack()}
        action={() => navigation.navigate("Payment")}
        actionIconName={actionIcons.addButton}
      />

      <View style={styles.content}>
        {cards.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="card-outline" size={64} color="#26589c" />
            <Text style={styles.emptyText}>No Saved Cards</Text>
            <Text style={styles.emptySubtext}>
              Press + to add a new payment method
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {cards.map(renderCard)}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
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
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#26589c",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  cardsContainer: {
    gap: 16,
    paddingBottom: 16,
  },
  cardContainer: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
  cardHolder: {
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
  defaultBadge: {
    position: "absolute",
    bottom: 10,
    left: "60%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  cardTypeImage: {
    width: 50, // Adjust size as needed
    height: 30,
  },
});
