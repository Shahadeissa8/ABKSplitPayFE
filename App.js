// import { StatusBar, View, Button } from "expo-status-bar";
import { StyleSheet, Text, Button, StatusBar, View } from "react-native";
import { useState } from "react";
import ShoppingNavigation from "./src/navigation/ShoppingNavigation";
import { NavigationContainer } from "@react-navigation/native";
import MainBottomNavigation from "./src/navigation/MainBottomNavigation";

export default function App() {
  // const [isStatusBarVisible, setIsStatusBarVisible] = useState(false);
  return (
    <NavigationContainer>
      {/* <ShoppingNavigation /> */}
      <MainBottomNavigation />
    </NavigationContainer>
    //   <View style={styles.container}>
    //     <Button
    //       title="Hide /Show StatusBar"
    //       onPress={() => setIsStatusBarVisible(!isStatusBarVisible)}
    //     />
    //     <Text>hello</Text>
    //     <StatusBar
    //       backgroundColor="lightblue"
    //       barStyle="dark-content"
    //       hidden={isStatusBarVisible}
    //     />
    //  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 60,
  },
});
