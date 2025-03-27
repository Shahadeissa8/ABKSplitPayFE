import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Welcome To Our Store</Text>
      {/* <TouchableOpacity onPress={() => alert("Hello")}> */}
      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.button}>Register Now!!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
