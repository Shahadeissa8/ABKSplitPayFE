import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.95);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    // Add your login logic here
    console.log("Login pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#26589c" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <LinearGradient
          colors={["#26589c", "#9cb2d8"]}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animated.View
              style={[
                styles.headerContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
                  style={styles.logoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="storefront-outline" size={60} color="#fff" />
                </LinearGradient>
              </View>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitle}>
                Sign in to continue your shopping experience
              </Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <View style={styles.inputContainer}>
                <LinearGradient
                  colors={["#26589c", "#9cb2d8"]}
                  style={styles.iconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="mail-outline" size={20} color="#fff" />
                </LinearGradient>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <LinearGradient
                  colors={["#26589c", "#9cb2d8"]}
                  style={styles.iconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="lock-closed-outline" size={20} color="#fff" />
                </LinearGradient>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#666"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#26589c"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#26589c", "#9cb2d8"]}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons
                    name="log-in-outline"
                    size={24}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialButtonsContainer}>
                {[
                  { icon: "logo-google", color: "#DB4437" },
                  { icon: "logo-apple", color: "#000000" },
                  { icon: "logo-facebook", color: "#4267B2" },
                ].map((social, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.socialButton}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[
                        "rgba(255,255,255,0.1)",
                        "rgba(255,255,255,0.05)",
                      ]}
                      style={styles.socialButtonGradient}
                    >
                      <Ionicons
                        name={social.icon}
                        size={24}
                        color={social.color}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.footerContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}
                activeOpacity={0.8}
              >
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 60 : 40,
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    maxWidth: width * 0.75,
    lineHeight: 22,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
    marginHorizontal: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(38, 88, 156, 0.08)",
    overflow: "hidden",
    height: 54,
  },
  iconContainer: {
    width: 44,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 15,
    color: "#26589c",
    height: 54,
  },
  eyeIcon: {
    padding: 10,
    marginRight: 2,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: -4,
  },
  forgotPasswordText: {
    color: "#26589c",
    fontSize: 13,
    fontWeight: "600",
  },
  loginButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
    marginTop: 8,
    shadowColor: "#26589c",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 3,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  buttonIcon: {
    marginRight: 8,
    marginLeft: -8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(38, 88, 156, 0.08)",
  },
  orText: {
    color: "#666",
    marginHorizontal: 12,
    fontSize: 13,
    fontWeight: "500",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 4,
  },
  socialButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  socialButtonGradient: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "rgba(38, 88, 156, 0.08)",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 20,
  },
  footerText: {
    color: "#fff",
    fontSize: 15,
  },
  registerText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textDecorationLine: "underline",
    marginLeft: 4,
  },
});
