import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Header } from "../../components/Header";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const tiers = [
  {
    name: "Bronze",
    image: require("../../../assets/Bronze.png"),
    installmentLimit: "750KD",
    earnedPoint: 1,
    pointsToNextTier: 5000,
  },
  {
    name: "Silver",
    image: require("../../../assets/Silver.png"),
    installmentLimit: "1000KD",
    earnedPoint: 1.5,
    pointsToNextTier: 6000,
  },
  {
    name: "Gold",
    image: require("../../../assets/Gold.png"),
    installmentLimit: "1250KD",
    earnedPoint: 2,
    pointsToNextTier: 7000,
  },
  {
    name: "Elite",
    image: require("../../../assets/Elite.png"),
    installmentLimit: "1500KD",
    earnedPoint: 3,
    pointsToNextTier: null, // No next tier
  },
];

const TierScreen = () => {
  const navigation = useNavigation();
  const [currentTierIndex, setCurrentTierIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const flatListRef = useRef(null); // Reference to FlatList for scrolling
  const [currentPoints, setCurrentPoints] = useState(0); // Track points for the current tier

  // Handle tier change when swiping
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentTierIndex(index);
      // Reset points to 0 when switching tiers for simplicity
      setCurrentPoints(0);
    }
  }).current;

  const renderTierItem = ({ item }) => {
    const progress = item.pointsToNextTier
      ? (currentPoints / item.pointsToNextTier) * 100
      : 100; // Elite has no next tier
    return (
      <View style={styles.tierItem}>
        {/* Tier Information */}
        <View style={styles.tierInfo}>
          <Text style={styles.tierName}>{item.name} Tier</Text>
          <Text style={styles.points}>{currentPoints} Points</Text>
          <Text style={styles.installmentLimit}>
            Installment Limit: {item.installmentLimit}
          </Text>
          <Text style={styles.earnedPoint}>
            Earned Point Multiplier: {item.earnedPoint}x
          </Text>
        </View>

        {/* Image representing the tier */}
        <Image source={item.image} style={styles.image} resizeMode="contain" />

        {/* Progress Bar (hidden for Elite) */}
        {item.pointsToNextTier && (
          <>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(progress, 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentPoints} / {item.pointsToNextTier} points to next tier
            </Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Tiers" backButtonAction={() => navigation.goBack()} />
      <View>
        <View style={styles.content}>
          {/* Swipeable Tier Section */}
          <FlatList
            ref={flatListRef}
            data={tiers}
            renderItem={renderTierItem}
            keyExtractor={(item) => item.name}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            initialScrollIndex={0}
          />

          {/* Expandable How it works? Section */}
          <TouchableOpacity
            style={styles.expandableHeader}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.expandableTitle}>How it works?</Text>
            <Text style={styles.expandableIcon}>{isExpanded ? "−" : "+"}</Text>
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.expandableContent}>
              <Text style={styles.expandableText}>
                Earn more points by purchasing additional products and services
                to progress through tiers and unlock exclusive installment
                benefits and deals.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default TierScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", //
  },
  content: {
    marginTop: 40,
    width: width * 0.9,
    alignItems: "center",
    backgroundColor: "#fff", // White background for the content card
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    // justifyContent: "center",
    alignSelf: "center",
    // alignContent:"center"
    // alignItems:"center"
  },
  tierItem: {
    width: width * 0.9 - 40, // Adjust for padding
    alignItems: "center",
  },
  tierInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  tierName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#26589c", // Darker text color for better contrast
    marginBottom: 5,
  },
  points: {
    fontSize: 20,
    color: "#666", // Grey text color
    marginBottom: 5,
  },
  installmentLimit: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  earnedPoint: {
    fontSize: 16,
    color: "#666",
  },
  image: {
    width: width * 0.8,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#ddd", // Light grey background for the empty part of the bar
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FFC300", // Yellow color for the progress fill
    borderRadius: 5,
  },
  progressText: {
    fontSize: 16,
    color: "#666", // Grey text color
    marginBottom: 20,
  },
  expandableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#26589c",
  },
  expandableTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#26589c",
  },
  expandableIcon: {
    fontSize: 24,
    color: "#26589c",
  },
  expandableContent: {
    width: "100%",
    paddingVertical: 10,
  },
  expandableText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
