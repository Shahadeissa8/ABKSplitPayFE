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
    //installmentLimit: "750KD",
    earnedPoint: 1,
    pointsToNextTier: 1200,
  },
  {
    name: "Silver",
    image: require("../../../assets/Silver.png"),
    //installmentLimit: "1000KD",
    earnedPoint: 1.5,
    pointsToNextTier: 3600,
  },
  {
    name: "Gold",
    image: require("../../../assets/Gold.png"),
    //installmentLimit: "1250KD",
    earnedPoint: 2,
    pointsToNextTier: 8000,
  },
  {
    name: "Elite",
    image: require("../../../assets/Elite.png"),
    //installmentLimit: "1500KD",
    earnedPoint: 3,
    pointsToNextTier: null,
  },
];

const TierScreen = () => {
  const navigation = useNavigation();
  const [currentTierIndex, setCurrentTierIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const flatListRef = useRef(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentTierIndex(index);

      setCurrentPoints(0);
    }
  }).current;

  const renderTierItem = ({ item, index }) => {
    const progress = item.pointsToNextTier
      ? (currentPoints / item.pointsToNextTier) * 100
      : 100;
    return (
      <View style={styles.tierItem}>

        {/* Left Arrow Indicator */}
        {index > 0 && <Text style={styles.leftArrow}>&gt;</Text>}
  

        {/* Tier Information */}

        <View style={styles.tierInfo}>
          <Text style={styles.tierName}>{item.name} Tier</Text>
        </View>

  
        {/* Image representing the tier */}

        <Image source={item.image} style={styles.image} resizeMode="contain" />
  
        {/* Right Arrow Indicator */}
        {index < tiers.length - 1 && <Text style={styles.rightArrow}>&lt;</Text>}
  
        {/* Progress Text (hidden for Elite) */}
        {item.pointsToNextTier && (
          <Text style={styles.progressText}>
            {item.pointsToNextTier} points to next tier
          </Text>
        )}

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Tiers & Rewards" backButtonAction={() => navigation.goBack()} />
      <View>
        <View style={styles.content}>
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
  leftArrow: {
    position: "absolute",
    left: -20,
    top: "50%",
    fontSize: 24,
    color: "#26589c",
    fontWeight: "bold",
  },
  rightArrow: {
    position: "absolute",
    right: -20,
    top: "50%",
    fontSize: 24,
    color: "#26589c",
    fontWeight: "bold",
  },
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: 90,
    width: width * 0.9,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    alignSelf: "center",
  },
  tierItem: {
    width: width * 0.9 - 40,
    alignItems: "center",
  },
  tierInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  tierName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#26589c",
    marginBottom: 5,
  },
  points: {
    fontSize: 20,
    color: "#666",
    marginBottom: 5,
  },
  // installmentLimit: {
  //   fontSize: 16,
  //   color: "#666",
  //   marginBottom: 5,
  // },
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
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FFC300",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 16,
    color: "#666",
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
