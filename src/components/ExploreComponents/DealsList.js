import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DealsCard from "./DealsCard";

const DealsList = () => {
  return (
    <View>
      <Text style={styles.Text}>Deals</Text>
      <View style={styles.containerScroll}>
        <DealsCard />
      </View>
    </View>
  );
};

export default DealsList;

const styles = StyleSheet.create({
  Text: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: "bold",
  },

  containerScroll: {
    // marginTop: -3,
    // paddingHorizontal: 10,
    marginRight: -10,
    marginLeft: 0,
  },
});
