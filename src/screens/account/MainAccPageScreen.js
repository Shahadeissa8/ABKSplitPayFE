import React, { useRef, useState } from "react";
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
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const MainAccPageScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);

  const menuItems = [
    {
      id: 1,
      title: "Edit profile",
      icon: "person-outline",
      color: "#26589c",
      screen: "EditProfile",
    },
    // {
    //   id: 2,
    //   title: "Change Password",
    //   icon: "lock-closed-outline",
    //   color: "#9cb2d8",
    //   screen: "ConfirmPassword",
    // },
    {
      id: 3,
      title: "Tiers & Rewards",
      icon: "star-outline",
      color: "#9cb2d8",
      screen: "Rewards",
    },
    {
      id: 4,
      title: "Saved Addresses",
      icon: "location-outline",
      color: "#26589c",
      screen: "Addresses",
    },
    {
      id: 5,
      title: "Payment Methods",
      icon: "card-outline",
      color: "#9cb2d8",
      screen: "Payments",
    },
    {
      id: 6,
      title: "Wishlist",
      icon: "heart-outline",
      color: "#26589c",
      screen: "Wishlist",
    },
    {
      id: 7,
      title: "Help Center",
      icon: "help-circle-outline",
      color: "#9cb2d8",
      screen: "Help",
    },
    {
      id: 8,
      title: "Feedback",
      icon: "chatbox-outline",
      color: "#26589c",
      screen: "Feedback",
    },
    {
      id: 9,
      title: "Settings",
      icon: "settings-outline",
      color: "#9cb2d8",
      screen: "Settings",
    },
  ];

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [
      Platform.OS === "android" ? 60 : 50,
      Platform.OS === "android" ? 45 : 35,
    ],
    extrapolate: "clamp",
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleMenuPress = (screen) => {
    if (screen === "EditProfile") {
      navigation.navigate("EditProfileScreen", {
        userData: {
          username: "John Doe",
          email: "john.doe@example.com",
          phoneNumber: "+971050600798",
          profilePicture: "https://via.placeholder.com/100",
        },
      });
    } else if (screen === "ConfirmPassword") {
      navigation.navigate("ConfirmPasswordScreen", {
        onSuccess: () => {
          navigation.navigate("EditPasswordScreen");
        },
      });
    } else {
      navigation.navigate(screen);
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigation.navigate("Login");
  };

  const renderMenuItem = ({ id, title, icon, color, screen }) => (
    <TouchableOpacity
      key={id}
      style={styles.menuItem}
      onPress={() => handleMenuPress(screen)}
    >
      <View style={styles.menuItemLeft}>
        <LinearGradient
          colors={[color, color === "#26589c" ? "#9cb2d8" : "#26589c"]}
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name={icon} size={24} color="#fff" />
        </LinearGradient>
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={22} color="#26589c" />
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <LinearGradient
      colors={["#26589c", "#9cb2d8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <LinearGradient
            colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.notificationGradient}
          >
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.civilId}>Civil Id: 571050600798</Text>
    </LinearGradient>
  );

  const renderProfileSection = () => (
    <View style={styles.profileSection}>
      <View style={styles.profileImageContainer}>
        <LinearGradient
          colors={["#26589c", "#9cb2d8"]}
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
          onPress={() => handleMenuPress("EditProfile")}
        >
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            style={styles.editButtonGradient}
          >
            <Ionicons name="pencil" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.emailText}>john.doe@example.com</Text>
      <LinearGradient
        colors={["#26589c", "#9cb2d8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.membershipBadge}
      >
        <Ionicons name="star" size={18} color="#fff" />
        <Text style={styles.membershipText}>Premium Member</Text>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { marginTop: Platform.OS === "android" ? -35 : 0 },
      ]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#26589c"
        translucent={true}
      />
      {renderHeader()}

      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { marginTop: -10 }]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#26589c"
            colors={["#26589c", "#9cb2d8"]}
            progressBackgroundColor="#fff"
            progressViewOffset={Platform.OS === "android" ? 80 : 0}
            size={Platform.OS === "ios" ? "large" : 40}
          />
        }
      >
        {renderProfileSection()}

        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutGradient}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 16,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  notificationButton: {
    overflow: "hidden",
    borderRadius: 20,
  },
  notificationGradient: {
    padding: 8,
    borderRadius: 20,
  },
  civilId: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    padding: 15,
    marginTop: 0,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImageBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 3,
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
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
    padding: 2,
    borderRadius: 52,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  },
  editButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  emailText: {
    fontSize: 15,
    color: "#666",
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    marginTop: 4,
  },
  membershipText: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 15,
    padding: 4,
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
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
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
    marginHorizontal: 4,
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
    backgroundColor: "rgba(38, 88, 156, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    margin: 15,
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
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
    padding: 16,
    paddingBottom: 24,
  },
  versionText: {
    fontSize: 12,
    color: "#999",
  },
});

export default MainAccPageScreen;
