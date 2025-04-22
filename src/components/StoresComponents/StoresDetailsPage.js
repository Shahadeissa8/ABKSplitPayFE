import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const StoresDetailsPage = ({ StoreDetails }) => {
  const openWebsite = async (url) => {
    if (!url || typeof url !== "string") {
      Alert.alert("Error", "Invalid website URL");
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open this website URL");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open website");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
          <Image
            source={{ uri: StoreDetails.logoUrl }}
            style={{ width: 300, height: 100 }}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.storeName}>{StoreDetails.name}</Text>

        <Text style={styles.description}>{StoreDetails.description}</Text>
      </View>

      {/* View Website Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => openWebsite(StoreDetails.websiteUrl)}
          style={styles.Button}
        >
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.Gradient}
          >
            <Text style={styles.buttonText}>View Website</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 120,
  },
  storeName: {
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 40,
  },
  description: {
    textAlign: "center",
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    position: "absolute",
    top: "50%", // Position the button container in the middle of the screen vertically
    left: 0,
    right: 0,
    alignItems: "center", // Center the button horizontally
    paddingHorizontal: 10,
  },
  Button: {
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
        elevation: 6,
      },
    }),
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  Gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
});

export default StoresDetailsPage;