import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={{ flexDirection: "row" }}>
        Don't have an account?
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
        >
          <Text style={{ color: "red", flexDirection: "row" }}>Register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
