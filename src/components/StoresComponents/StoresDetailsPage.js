import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

const StoresDetailsPage = ({ StoreDetails }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: "#CB3737",
          // backgroundColor: "E3E3E3",
          padding: 7,
          marginStart: 5,
          marginEnd: 5,
          borderRadius: 10,
          alignItems: "center",
          width: 230,
        }}
      >
        <View style={{ borderWidth: 2, borderRadius: 5 }}>
          <Image
            source={{
              uri: StoreDetails.websiteUrl,
            }}
            width={200}
            height={100}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            marginTop: 5,
            fontWeight: "bold",
          }}
        >
          {StoreDetails.name}
        </Text>
        <Text>{StoreDetails.description}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoresDetailsPage;

const styles = StyleSheet.create({});
