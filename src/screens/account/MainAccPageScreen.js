// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const MainAccPageScreen = () => {
//   return (
//     <View>
//       <Text>MainAccPageScreen</Text>
//     </View>
//   );
// };

// export default MainAccPageScreen;

// const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const MainAccPageScreen = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [refreshing, setRefreshing] = useState(false);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [
      Platform.OS === "android" ? 90 : 70,
      Platform.OS === "android" ? 60 : 40,
    ],
    extrapolate: "clamp",
  });

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
    ]).start();
  }, []);

  const menuItems = [
    {
      id: 1,
      title: "Edit profile",
      icon: "person-outline",
      color: "#2E3192",
      screen: "EditProfile",
    },
    {
      id: 2,
      title: "Tiers & Rewards",
      icon: "star-outline",
      color: "#1BFFFF",
      screen: "Rewards",
    },
    {
      id: 3,
      title: "Saved Addresses",
      icon: "location-outline",
      color: "#2E3192",
      screen: "Addresses",
    },
    {
      id: 4,
      title: "Payment Methods",
      icon: "card-outline",
      color: "#1BFFFF",
      screen: "Payments",
    },
    {
      id: 5,
      title: "Wishlist",
      icon: "heart-outline",
      color: "#2E3192",
      screen: "Wishlist",
    },
    {
      id: 6,
      title: "Help Center",
      icon: "help-circle-outline",
      color: "#1BFFFF",
      screen: "Help",
    },
    {
      id: 7,
      title: "Feedback",
      icon: "chatbox-outline",
      color: "#2E3192",
      screen: "Feedback",
    },
    {
      id: 8,
      title: "Settings",
      icon: "settings-outline",
      color: "#1BFFFF",
      screen: "Settings",
    },
  ];

  const handleLogout = () => {
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
    ]).start(() => {
      // Add your logout logic here
      console.log("Logging out...");
    });
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const scrollViewRef = useRef(null);
  const lastOffset = useRef(0);
  const scrollDirection = useRef(new Animated.Value(1)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const direction = currentOffset > lastOffset.current ? 0 : 1;
        if (direction !== scrollDirection._value) {
          Animated.spring(scrollDirection, {
            toValue: direction,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
        lastOffset.current = currentOffset;
      },
    }
  );

  const MenuItem = ({ title, icon, color, screen, style }) => (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.menuItem}
        activeOpacity={0.7}
        onPress={() => navigation.navigate(screen)}
      >
        <View style={styles.menuItemLeft}>
          <LinearGradient
            colors={[color, color === "#2E3192" ? "#1BFFFF" : "#2E3192"]}
            style={styles.iconContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={icon} size={22} color="#fff" />
          </LinearGradient>
          <Text style={styles.menuItemText}>{title}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={22} color="#2E3192" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderHeader = () => (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <LinearGradient
        colors={["#2E3192", "#1BFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.notificationButton}
            >
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const renderProfileSection = () => (
    <Animated.View
      style={[
        styles.profileSection,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.profileImageContainer}>
        <LinearGradient
          colors={["#2E3192", "#1BFFFF"]}
          style={styles.profileImageBorder}
        >
          <View style={styles.profileImageInner}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.profileImage}
            />
          </View>
        </LinearGradient>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <LinearGradient
            colors={["#2E3192", "#1BFFFF"]}
            style={styles.editButtonGradient}
          >
            <Ionicons name="pencil" size={16} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.emailText}>john.doe@example.com</Text>
      <LinearGradient
        colors={["#2E3192", "#1BFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.membershipBadge}
      >
        <Ionicons name="star" size={16} color="#fff" />
        <Text style={styles.membershipText}>Premium Member</Text>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      {renderHeader()}

      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={true}
        overScrollMode="always"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#2E3192"
            colors={["#2E3192", "#1BFFFF"]}
            progressBackgroundColor="#fff"
            progressViewOffset={Platform.OS === "android" ? 80 : 0}
            size={Platform.OS === "ios" ? "large" : 40}
          />
        }
        decelerationRate="normal"
        fadingEdgeLength={2}
        onMomentumScrollEnd={() => {
          const offset = lastOffset.current;
          const snapPoint = Math.round(offset / 100) * 100;
          scrollViewRef.current?.scrollTo({
            y: snapPoint,
            animated: true,
          });
        }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-100, 0, 100],
                  outputRange: [-50, 0, 50],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          {renderProfileSection()}

          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <MenuItem
                key={item.id}
                title={item.title}
                icon={item.icon}
                color={item.color}
                screen={item.screen}
                style={{
                  transform: [
                    {
                      translateX: scrollY.interpolate({
                        inputRange: [100 * index, 100 * (index + 1)],
                        outputRange: [0, -10],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                }}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.logoutButton,
              {
                transform: [
                  {
                    scale: scrollDirection.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ],
              },
            ]}
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <LinearGradient
              colors={["#2E3192", "#1BFFFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.logoutGradient}
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.logoutText}>Log Out</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default MainAccPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#2E3192",
    zIndex: 1000,
  },
  headerGradient: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#2E3192",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  settingsButton: {
    overflow: "hidden",
    borderRadius: 20,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
    marginTop: 10,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImageBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 4,
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
  profileImageInner: {
    padding: 3,
    borderRadius: 51,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButtonGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  editProfileButton: {
    position: "absolute",
    right: -5,
    bottom: -5,
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#2E3192",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  nameText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  membershipBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
  },
  membershipText: {
    marginLeft: 6,
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 15,
    padding: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#2E3192",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
    marginHorizontal: 5,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
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
  logoutButton: {
    margin: 20,
    marginTop: 30,
    borderRadius: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#2E3192",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  versionContainer: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
  },
  versionText: {
    fontSize: 12,
    color: "#999",
  },
});
