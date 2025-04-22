import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import StoresList from "../../components/StoresComponents/StoresList";
import { actionIcons, Header } from "../../components/Header";
import StoreDetailsModal from "../../components/StoresComponents/StoreDetailsModal";
import { GetStores } from "../../api/StoreAPI";

const { width } = Dimensions.get("window");
const ShopScreen = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await GetStores();
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleStorePress = (store) => {
    setSelectedStore(store);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      <Header title="Stores" />
      <View style={styles.instructionsContainer}>
        {!loading && <StoresList stores={stores} />}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={24} color="#26589c" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search stores..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {!loading ? (
          <StoresList
            stores={stores}
            onStorePress={handleStorePress}
            searchQuery={searchQuery}
          />
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#26589c" />
            <Text style={{ marginTop: 10, fontSize: 16 }}>Loading stores...</Text>
          </View>
        )}
      </View>
      <StoreDetailsModal
        isVisible={modalVisible}
        storeDetails={selectedStore}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#26589c",
    paddingBottom: 60,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        paddingTop: 50,
      },
      android: {
        paddingTop: 30,
      },
    }),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginTop: 1,
    

  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 20, 
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 12, 
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 18, 
    color: "#333",
    paddingVertical: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});