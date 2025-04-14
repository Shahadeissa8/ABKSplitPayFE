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
      console.error("Error opening URL:", error);
      Alert.alert("Error", "Failed to open website");
    }
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 120,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
          <Image
            source={{ uri: StoreDetails.logoUrl }}
            style={{ width: 300, height: 100 }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            // flex: 1,
            textAlign: "center",
            marginTop: 5,
            fontWeight: "bold",
            fontSize: 40,
            // padding: 50,
          }}
        >
          {StoreDetails.name}
        </Text>

        <Text style={styles.description}>{StoreDetails.description}</Text>

        {/* View Website Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => openWebsite(StoreDetails.websiteUrl)} // Passing websiteUrl to the function
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
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 310,
    fontWeight: "bold",
    fontSize: 20,
  },
  Button: {
    margin: -40,
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
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 50,
  },
  gradient: {
    borderRadius: 16,
    overflow: "hidden",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
    borderRadius: 16,
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
});

export default StoresDetailsPage;
