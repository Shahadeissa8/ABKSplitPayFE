import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import StoresList from "../../components/StoresComponents/StoresList";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native"; 
import { GetStores } from "../../api/StoreAPI"; // Adjust the import path as necessary
const ShopScreen = ({}) => {
  // const navigation = useNavigation();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await GetStores();
        setStores(data); // set the fetched store list here
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleStorePress = (store) => {
    // You can navigate to a detail screen here
    console.log("Pressed store:", store.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.instructionsContainer}>
          {!loading && (
            <StoresList stores={stores} onStorePress={handleStorePress} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "600",
    color: "#181725",
    fontFamily: "Lato",
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 16,
    color: "#7C7C7C",
    fontFamily: "Lato",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  instructionsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
  },
  dealsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
});
