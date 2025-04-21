import React from "react";
import { StyleSheet, View, FlatList, Text, Animated, Platform } from "react-native";
import StoresCard from "./StoresCard";

const StoresList = ({ stores = [], onStorePress, searchQuery = "" }) => {
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }) => {
    const animation = new Animated.Value(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View
        style={{
          opacity: animation,
          transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        }}
      >
        <StoresCard
          storeId={item.storeId}
          name={item.name}
          logo={item.logoUrl}
          id={item.storeId}
          onPress={() => onStorePress(item)}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {filteredStores.length === 0 ? (
        <Text style={styles.noResults}>No stores found</Text>
      ) : (
        <FlatList
          data={filteredStores}
          renderItem={renderItem}
          keyExtractor={(item) => item.storeId.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default StoresList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
  },
  listContainer: {
    paddingBottom: 100, 
  },
  noResults: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});