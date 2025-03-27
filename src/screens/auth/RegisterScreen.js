import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>RegisterScreen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("LocationScreen");
        }}
      >
        <Text style={styles.button}>Choose your loaction address</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text>
          Already have an account?
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Text style={{ color: "red" }}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
