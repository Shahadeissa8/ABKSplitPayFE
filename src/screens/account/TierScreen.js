import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get('window');

const TierScreen = () => {
  const currentTier = "Elite";
  const currentPoints = 1500; // Example points
  const pointsToNextTier = 5000; // Example points needed for the next tier
  const progress = (currentPoints / pointsToNextTier) * 100; // Calculate progress percentage
  const [isExpanded, setIsExpanded] = useState(false); // State for expandable section

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Tier Information */}
        <View style={styles.tierInfo}>
          <Text style={styles.tierName}>{currentTier} Tier</Text>
          <Text style={styles.points}>{currentPoints} Points</Text>
        </View>

        {/* Image representing the tier */}
        <Image
          source={require("../../../assets/ABKTier.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${Math.min(progress, 100)}%` }]} />
        </View>

        {/* Progress Text */}
        <Text style={styles.progressText}>{currentPoints} / {pointsToNextTier} points to next tier</Text>

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
              Earn more points by purchasing additional products and services to progress through tiers and unlock exclusive installment benefits.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TierScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa", // Light grey background
  },
  content: {
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
  },
  tierInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tierName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Darker text color for better contrast
    marginBottom: 5,
  },
  points: {
    fontSize: 20,
    color: "#666", // Grey text color
  },
  image: {
    width: width * 0.8,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd', // Light grey background for the empty part of the bar
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFC300', // Green color for the progress fill
    borderRadius: 5,
  },
  progressText: {
    fontSize: 16,
    color: "#666", // Grey text color
    marginBottom: 20,
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  expandableTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  expandableIcon: {
    fontSize: 24,
    color: '#333',
  },
  expandableContent: {
    width: '100%',
    paddingVertical: 10,
  },
  expandableText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});