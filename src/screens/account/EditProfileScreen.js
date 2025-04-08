import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const EditProfileScreen = ({ route, navigation }) => {
  // Get user data from navigation params
  const { userData: initialUserData } = route.params || {
    userData: {
      username: "Ahmad Ali",
      password: "••••••••••••",
      phoneNumber: "+971050600798",
      profilePicture: "https://via.placeholder.com/100",
    },
  };

  const [userData, setUserData] = useState(initialUserData);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const imageScale = useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Listen for navigation updates
  React.useEffect(() => {
    if (route.params?.updatedPassword) {
      setUserData((prev) => ({
        ...prev,
        password: "••••••••••••", // Show dots for security
      }));
    }
  }, [route.params?.updatedPassword]);

  const handleBack = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.goBack());
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

  const handleSave = () => {
    // Save the updated user data
    console.log("Saving changes:", userData);
    handleBack();
  };

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditPicture = () => {
    // Implement image picker functionality here
    console.log("Edit picture pressed");
  };

  const renderHeader = () => (
    <LinearGradient
      colors={["#26589c", "#9cb2d8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>
    </LinearGradient>
  );

  const renderProfilePicture = () => (
    <Animated.View
      style={[
        styles.profilePictureContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: imageScale }],
        },
      ]}
    >
      <LinearGradient
        colors={["#26589c", "#9cb2d8"]}
        style={styles.profilePictureBorder}
      >
        <View style={styles.profilePictureInner}>
          <Image
            source={{ uri: userData.profilePicture }}
            style={styles.profilePicture}
          />
        </View>
      </LinearGradient>
      <TouchableOpacity
        style={styles.editPictureButton}
        onPress={handleEditPicture}
      >
        <LinearGradient
          colors={["#26589c", "#9cb2d8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.editPictureGradient}
        >
          <Ionicons name="camera" size={18} color="#fff" />
          <Text style={styles.editPictureText}>Edit picture</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderInputField = (
    label,
    value,
    icon,
    onPress = null,
    isPassword = false,
    field = null
  ) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#26589c", "#9cb2d8"]}
          style={styles.inputIconContainer}
        >
          <Ionicons name={icon} size={20} color="#fff" />
        </LinearGradient>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => field && handleInputChange(field, text)}
            secureTextEntry={isPassword}
            editable={!onPress}
            placeholderTextColor="#999"
          />
        </View>
        {onPress && (
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={24} color="#26589c" />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#26589c" />
      {renderHeader()}

      <View style={styles.content}>
        <View>
          {renderProfilePicture()}
          <View style={styles.formContainer}>
            {renderInputField(
              "User name",
              userData.username,
              "person-outline",
              null,
              false,
              "username"
            )}
            {renderInputField(
              "Password",
              userData.password,
              "lock-closed-outline",
              () => navigation.navigate("ConfirmPasswordScreen"),
              true
            )}
            {renderInputField(
              "Phone number",
              userData.phoneNumber,
              "phone-portrait-outline",
              null,
              false,
              "phoneNumber"
            )}
          </View>
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
                colors={["#26589c", "#9cb2d8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveGradient}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 16,
    paddingHorizontal: 20,
    paddingBottom: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginTop: -30,
    marginBottom: 20,
  },
  profilePictureBorder: {
    padding: 4,
    borderRadius: 75,
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  profilePictureInner: {
    padding: 3,
    borderRadius: 71,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  editPictureButton: {
    marginTop: 16,
    overflow: "hidden",
    borderRadius: 25,
    transform: [{ scale: 1 }],
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  editPictureGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  editPictureText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(38, 88, 156, 0.1)",
  },
  inputIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#26589c",
    marginBottom: 4,
    fontWeight: "600",
    opacity: 0.8,
  },
  input: {
    fontSize: 16,
    color: "#000",
    padding: 0,
    fontWeight: "600",
  },
  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(38, 88, 156, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    paddingTop: 20,
    backgroundColor: "#fff",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "rgba(38, 88, 156, 0.05)",
  },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  saveGradient: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
