// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const ConfirmPasswordScreen = () => {
//   return (
//     <View>
//       <Text>ConfirmPasswordScreen</Text>
//     </View>
//   )
// }

// export default ConfirmPasswordScreen

// const styles = StyleSheet.create({})
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const ConfirmPasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("55555555");
  const [confirmPassword, setConfirmPassword] = useState("55555555");

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderInputField = (label, value, onPress) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        style={[styles.inputContainer]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.inputLeft}>
          <LinearGradient
            colors={["#2E3192", "#1BFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Ionicons name="pencil" size={18} color="#fff" />
          </LinearGradient>
          <Text style={styles.inputLabel}>{label}</Text>
        </View>
        <View style={styles.inputRight}>
          <Text style={styles.inputValue}>{value}</Text>
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={20} color="#2E3192" />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />

      {/* Header */}
      <LinearGradient
        colors={["#2E3192", "#1BFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Password Editing</Text>
        </View>
      </LinearGradient>

      {/* Password Fields */}
      <View style={styles.content}>
        {renderInputField("Password", password, () =>
          navigation.navigate("EditPassword")
        )}
        {renderInputField("Confirm Password", confirmPassword, () =>
          navigation.navigate("EditConfirmPassword")
        )}
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerGradient: {
    ...Platform.select({
      ios: {
        shadowColor: "#2E3192",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: Platform.OS === "android" ? 60 + StatusBar.currentHeight : 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginRight: 40,
    color: "#fff",
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#2E3192",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
    fontWeight: "500",
  },
  inputRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputValue: {
    fontSize: 16,
    color: "#666",
    marginRight: 10,
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
