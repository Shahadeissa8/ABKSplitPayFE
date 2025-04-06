// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const EditProfileScreen = () => {
//   return (
//     <View>
//       <Text>EditProfileScreen</Text>
//     </View>
//   )
// }

// export default EditProfileScreen

// const styles = StyleSheet.create({})
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

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    username: "Ahmad Ali",
    password: "••••••••••••",
    phoneNumber: "+971050600798",
    profilePicture: "https://via.placeholder.com/100",
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
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
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.goBack());
  };

  const handleEditPicture = () => {
    // Implement image picker functionality here
    console.log("Edit picture pressed");
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log("Save changes");
    handleBack();
  };

  const renderHeader = () => (
    <LinearGradient
      colors={["#2E3192", "#1BFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <LinearGradient
            colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveGradient}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.civilId}>Civil Id: 571050600798</Text>
    </LinearGradient>
  );

  const renderProfilePicture = () => (
    <Animated.View
      style={[
        styles.profilePictureContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={["#2E3192", "#1BFFFF"]}
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
          colors={["#2E3192", "#1BFFFF"]}
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
    isPassword = false
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
          colors={["#2E3192", "#1BFFFF"]}
          style={styles.inputIconContainer}
        >
          <Ionicons name={icon} size={20} color="#fff" />
        </LinearGradient>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            style={styles.input}
            value={value}
            secureTextEntry={isPassword}
            editable={!onPress}
            placeholderTextColor="#999"
          />
        </View>
        {onPress && (
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={24} color="#2E3192" />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      {renderHeader()}

      <View style={styles.content}>
        {renderProfilePicture()}

        <View style={styles.formContainer}>
          {renderInputField("User name", userData.username, "person-outline")}
          {renderInputField(
            "Password",
            userData.password,
            "lock-closed-outline",
            () => console.log("Navigate to password change"),
            true
          )}
          {renderInputField(
            "Phone number",
            userData.phoneNumber,
            "phone-portrait-outline"
          )}
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#2E3192",
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
  saveButton: {
    overflow: "hidden",
    borderRadius: 20,
  },
  saveGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  civilId: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  profilePictureBorder: {
    padding: 4,
    borderRadius: 65,
    ...Platform.select({
      ios: {
        shadowColor: "#2E3192",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  profilePictureInner: {
    padding: 3,
    borderRadius: 61,
    backgroundColor: "#fff",
  },
  profilePicture: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editPictureButton: {
    marginTop: 16,
    overflow: "hidden",
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: "#2E3192",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  editPictureGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  editPictureText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  formContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
    paddingHorizontal: 16,
  },
  inputIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  inputLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    color: "#000",
    padding: 0,
    fontWeight: "600",
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(46, 49, 146, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
