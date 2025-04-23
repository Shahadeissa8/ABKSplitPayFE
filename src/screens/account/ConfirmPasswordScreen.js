import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { changePassword } from "../../api/profile"; 
import { Header } from "../../components/Header";

const { width } = Dimensions.get("window");

const ConfirmPasswordScreen = () => {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBack = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.goBack());
  };

  const handleSave = async () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      shakeAnimation();
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");

      shakeAnimation();
      return;
    }
    setError("");

    try {
  
      await changePassword(currentPassword, newPassword);
      Alert.alert("Success", "Password changed successfully!");
      navigation.goBack(); 
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to change password.");
    }
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderInputField = (
    label,
    value,
    setValue,
    isVisible,
    setIsVisible,
    placeholder,
    isFirst = true
  ) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View
        style={[styles.inputContainer, !isFirst && styles.inputContainerSecond]}
      >
        <View style={styles.inputLeft}>
          <LinearGradient
            colors={["#26589c", "#26589c"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Ionicons name="lock-closed" size={20} color="#fff" />
          </LinearGradient>
          <Text style={styles.inputLabel}>{label}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            secureTextEntry={!isVisible}
            placeholder={placeholder}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.visibilityButton}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Ionicons
              name={isVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#26589c"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Change password"
        backButtonAction={() => navigation.goBack()}
      />


      <View style={styles.content}>
        <View style={styles.formContainer}>
          {renderInputField(
            "Current Password",
            currentPassword,
            setCurrentPassword,
            isCurrentPasswordVisible,
            setIsCurrentPasswordVisible,
            "Enter current password",

            true
          )}
          {renderInputField(
            "New Password",
            newPassword,
            setNewPassword,
            isNewPasswordVisible,
            setIsNewPasswordVisible,

            "Enter new password",
            false
          )}
          {renderInputField(
            "Confirm Password",
            confirmPassword,
            setConfirmPassword,
            isConfirmPasswordVisible,
            setIsConfirmPasswordVisible,
            "Confirm new password",

            false
          )}

          {error ? (
            <Animated.Text
              style={[
                styles.errorText,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              {error}
            </Animated.Text>
          ) : null}
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <LinearGradient
                colors={["#26589c", "#26589c"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveGradient}
              >
                <Text style={styles.saveButtonText}>Save Password</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
  },
  headerGradient: {
   
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputContainerSecond: {
    marginTop: 5,
  },
  inputLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(38, 88, 156, 0.1)",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 14,
    marginLeft: 12,
    color: "#26589c",
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    padding: 0,
    fontWeight: "500",
  },
  visibilityButton: {
    padding: 8,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    paddingTop: 20,

    width: "100%",
  },
  saveButton: {
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  saveGradient: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default ConfirmPasswordScreen;
