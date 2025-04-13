// import React, { useEffect } from "react";
// import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const SplashScreen = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace("OnBoardingScreen");
//     }, 2000); // Adjust the delay as needed

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" color="#26589c" />
//       <Text style={styles.text}>Welcome to ABK SplitPay</Text>
//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   text: {
//     marginTop: 20,
//     fontSize: 18,
//     color: "#26589c",
//     fontWeight: "bold",
//   },
// });