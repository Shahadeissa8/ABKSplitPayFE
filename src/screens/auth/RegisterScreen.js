import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../api/auth";
import { setToken } from "../../api/storage";

const { width } = Dimensions.get("window");

const RegisterScreen = ({ setIsAuthenticated }) => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    profilePictureUrl: " ", // Set default value to a single space
  });

  const validateForm = () => {
    if (!formData.userName.trim()) {
      Alert.alert("Error", "Please enter your username");
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return false;
    }
    if (!formData.fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    return true;
  };

  const handleRegister = useCallback(async () => {
    if (!validateForm()) return;

    try {
      const userInfo = {
        userName: formData.userName,
        email: formData.email,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        profilePictureUrl: formData.profilePictureUrl, // This will now be " "
      };
      const response = await register(userInfo);
      const { token } = response;
      if (token) {
        await setToken(token); // Store the token after successful login
        console.log("Stored Token:", token);
        Alert.alert("Registration Successful");

        // Update authentication state
        setIsAuthenticated(true);

        // Reset the navigation stack and navigate to MainBottomNavigation
        navigation.reset({
          index: 0,
          routes: [{ name: "MainBottomNavigation" }],
        });
      } else {
        Alert.alert("Error", "Failed to retrieve token. Please try again.");
      }
      // await register(userInfo);
      // Alert.alert("Success", "Registration successful! Please log in.");
      // navigation.navigate("LoginScreen");
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Registration failed. Please try again."
      );
    }
  }, [formData, navigation, setIsAuthenticated]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#26589c" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        }
      >
        <LinearGradient
          colors={["#26589c", "#9cb2d8"]}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.subtitle}>
                Please fill in the form to create your account
              </Text>
            </View>

            <View style={styles.formContainer}>
              {/* Username */}
              <View style={styles.inputContainer}>
                <LinearGradient
                  colors={["#26589c", "#9cb2d8"]}
                  style={styles.iconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="person-outline" size={20} color="#fff" />
                </LinearGradient>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={formData.userName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, userName: text })
                  }
                  placeholderTextColor="#666"
                />
              </View>

              {/* Email */}
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
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#666"
                />
              </View>

              {/* Full Name */}
              <View style={styles.inputContainer}>
                <LinearGradient
                  colors={["#26589c", "#9cb2d8"]}
                  style={styles.iconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="person-outline" size={20} color="#fff" />
                </LinearGradient>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, fullName: text })
                  }
                  placeholderTextColor="#666"
                />
              </View>

              {/* Phone Number */}
              <View style={styles.inputContainer}>
                <LinearGradient
                  colors={["#26589c", "#9cb2d8"]}
                  style={styles.iconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="call-outline" size={20} color="#fff" />
                </LinearGradient>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phoneNumber: text })
                  }
                  keyboardType="phone-pad"
                  placeholderTextColor="#666"
                />
              </View>

              {/* Password */}
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
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
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

              {/* Confirm Password */}
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
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    setFormData({ ...formData, confirmPassword: text })
                  }
                  secureTextEntry={!showConfirmPassword}
                  placeholderTextColor="#666"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={24}
                    color="#26589c"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#26589c", "#9cb2d8"]}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                activeOpacity={0.8}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    marginTop: 40,
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
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
    shadowOffset: { width: 0, height: 6 },
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
  registerButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
    marginTop: 8,
    shadowColor: "#26589c",
    shadowOffset: { width: 0, height: 3 },
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
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
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
  loginText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textDecorationLine: "underline",
    marginLeft: 4,
  },
});
