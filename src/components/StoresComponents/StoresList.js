import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, FlatList, Text, Animated } from "react-native";
import StoresCard from "./StoresCard";

const StoresList = ({ stores = [], onStorePress, searchQuery = "" }) => {
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const animations = useRef(
    filteredStores.map(() => new Animated.Value(0))
  ).current;
  useEffect(() => {
    const animationTimings = filteredStores.map((_, index) =>
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      })
    );

    Animated.parallel(animationTimings).start();
  }, []); 
  const renderItem = ({ item, index }) => (
    <Animated.View
      style={{
        opacity: animations[index],
        transform: [
          {
            translateY: animations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
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
    paddingHorizontal: 10,
  },
  noResults: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});