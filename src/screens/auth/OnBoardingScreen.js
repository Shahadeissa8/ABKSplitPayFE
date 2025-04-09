// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
//   Platform,
//   Animated,
//   Image,
// } from "react-native";
// import React, { useEffect, useRef } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// const OnBoardingScreen = () => {
//   const navigation = useNavigation();
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(50)).current;
//   const scaleAnim = useRef(new Animated.Value(0.9)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#9cb2d8" />
//       <LinearGradient
//         colors={["#9cb2d8", "#26589c"]}
//         style={styles.gradientBackground}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//       >
//         <View style={styles.contentContainer}>
//           <Animated.View
//             style={[
//               styles.logoContainer,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
//               },
//             ]}
//           >
//             <LinearGradient
//               colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
//               style={styles.logoBackground}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//             >
//               <View style={styles.logoWrapper}>
//                 <Image
//                   source={require("../../../assets/SplitPaylogo.png")}
//                   style={styles.logo}
//                   resizeMode="contain"
//                 />
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View
//             style={[
//               styles.textContainer,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }],
//               },
//             ]}
//           >
//             <Text style={styles.title}>Welcome To{"\n"}ABK SplitPay</Text>
//             <Text style={styles.subtitle}>
//               Split your bills easily and securely
//             </Text>
//           </Animated.View>

//           <Animated.View
//             style={[
//               styles.buttonContainer,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }],
//               },
//             ]}
//           >
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate("RegisterScreen")}
//               activeOpacity={0.8}
//             >
//               <LinearGradient
//                 colors={["#26589c", "#1a3b6c"]}
//                 style={styles.gradientButton}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Text style={styles.buttonText}>Get Started</Text>
//                 <Ionicons
//                   name="arrow-forward-outline"
//                   size={24}
//                   color="#fff"
//                   style={styles.buttonIcon}
//                 />
//               </LinearGradient>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.button, styles.loginButton]}
//               onPress={() => navigation.navigate("LoginScreen")}
//               activeOpacity={0.8}
//             >
//               <View style={styles.gradientButton}>
//                 <Text style={styles.loginButtonText}>
//                   I already have an account
//                 </Text>
//                 <Ionicons
//                   name="log-in-outline"
//                   size={24}
//                   color="#26589c"
//                   style={styles.buttonIcon}
//                 />
//               </View>
//             </TouchableOpacity>
//           </Animated.View>
//         </View>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// export default OnBoardingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradientBackground: {
//     flex: 1,
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 40 : 60,
//     paddingBottom: 40,
//     paddingHorizontal: 24,
//   },
//   logoContainer: {
//     width: width * 0.9,
//     height: height * 0.3,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   logoBackground: {
//     width: width * 0.85,
//     height: width * 0.45,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.2)",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 15,
//     elevation: 10,
//     backgroundColor: "rgba(255,255,255,0.05)",
//   },
//   logoWrapper: {
//     width: "90%",
//     height: "80%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logo: {
//     width: "100%",
//     height: "100%",
//   },
//   textContainer: {
//     alignItems: "center",
//     marginVertical: 30,
//   },
//   title: {
//     fontSize: 38,
//     fontWeight: "700",
//     color: "#fff",
//     textAlign: "center",
//     marginBottom: 16,
//     lineHeight: 46,
//     textShadowColor: "rgba(0, 0, 0, 0.15)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 3,
//   },
//   subtitle: {
//     fontSize: 17,
//     color: "rgba(255, 255, 255, 0.9)",
//     textAlign: "center",
//     maxWidth: width * 0.8,
//     lineHeight: 24,
//     letterSpacing: 0.3,
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 12,
//   },
//   button: {
//     borderRadius: 16,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.12,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   gradientButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 18,
//     backgroundColor: "#fff",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//     marginRight: 8,
//     letterSpacing: 0.5,
//   },
//   loginButtonText: {
//     color: "#26589c",
//     fontSize: 18,
//     fontWeight: "600",
//     marginRight: 8,
//     letterSpacing: 0.5,
//   },
//   buttonIcon: {
//     marginLeft: 4,
//   },
//   loginButton: {
//     borderWidth: 1,
//     borderColor: "rgba(38,88,156,0.3)",
//   },
// });
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  Animated,
  Image,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const videoRef = useRef(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#9cb2d8" />
      <LinearGradient
        colors={["#9cb2d8", "#26589c"]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.contentContainer}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
              style={styles.logoBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.logoWrapper}>
                <Video
                  ref={videoRef}
                  source={require("../../../assets/SplitPay_1.mp4")}
                  style={styles.video}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  isMuted
                />
              </View>
            </LinearGradient>
          </Animated.View>

          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>Welcome To{"\n"}ABK SplitPay</Text>
            <Text style={styles.subtitle}>
              Split your bills easily and securely
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("RegisterScreen")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#26589c", "#1a3b6c"]}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={24}
                  color="#fff"
                  style={styles.buttonIcon}
                />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={() => navigation.navigate("LoginScreen")}
              activeOpacity={0.8}
            >
              <View style={styles.gradientButton}>
                <Text style={styles.loginButtonText}>
                  I already have an account
                </Text>
                <Ionicons
                  name="log-in-outline"
                  size={24}
                  color="#26589c"
                  style={styles.buttonIcon}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 40 : 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: width,
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logoBackground: {
    width: width * 0.85,
    height: width * 0.48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    overflow: "hidden",
  },
  logoWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 46,
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 17,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    maxWidth: width * 0.8,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
    letterSpacing: 0.5,
  },
  loginButtonText: {
    color: "#26589c",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "rgba(38,88,156,0.3)",
  },
});
