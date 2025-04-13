import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import React from "react";
import StoresCard from "./StoresCard";

const StoresList = ({ stores = [], onStorePress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stores</Text>
      <ScrollView>
        {stores.map((store) => (
          <StoresCard
            key={store.storeId}
            storeId={store.storeId}
            name={store.name}
            logo={store.logoUrl}
            id={store.storeId}
            gradient={["#26589c", "#9cb2d8"]}
          />
        ))}
      </ScrollView>
    </View>
  );
};
export default StoresList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
