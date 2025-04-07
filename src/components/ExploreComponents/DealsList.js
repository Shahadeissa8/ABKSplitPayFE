import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DealsCard from "./DealsCard";

const DealsList = () => {
  return (
    <View>
      <Text style={styles.Text}>Deals</Text>
      <DealsCard />
    </View>
  );
};

export default DealsList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
