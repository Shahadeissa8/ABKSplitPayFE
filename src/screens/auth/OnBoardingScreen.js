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
    <LinearGradient
      colors={["#9cb2d8", "#26589c"]}
      style={styles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#9cb2d8" />
      <SafeAreaView style={styles.contentContainer}>
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
                onError={(error) => console.log("Video Error:", error)}
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
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoBackground: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "80%",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 20,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#26589c",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26589c",
  },
});