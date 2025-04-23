import React, { useRef, useState, useEffect } from "react";
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
  Alert,
  Modal,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { deleteToken } from "../../api/storage";
import { getUserProfile, getPoints } from "../../api/profile";
import { getToken } from "../../api/storage";
import { useIsFocused } from "@react-navigation/native";
import { getUserId } from "../../api/storage";
import { actionIcons, Header } from "../../components/Header";

const { width } = Dimensions.get("window");

const tiers = [
  { name: "Bronze", image: require("../../../assets/Bronze.png"), pointsToNextTier: 1200 },
  { name: "Silver", image: require("../../../assets/Silver.png"), pointsToNextTier: 3600 },
  { name: "Gold", image: require("../../../assets/Gold.png"), pointsToNextTier: 8000 },
  { name: "Elite", image: require("../../../assets/Elite.png"), pointsToNextTier: null },
];

const MainAccPageScreen = ({ setIsAuthenticated }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [points, setPoints] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const defaultProfilePicture =
    "https://th.bing.com/th/id/R.1871862d87bb8037d953317fb4497189?rik=MBf1NyuchSQUtQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile.png&ehk=Ouu2uMvvMPnkP1bdIY2BTAzbwhRoG9p03NUzbwGLhlg%3d&risl=&pid=ImgRaw&r=0";

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setRefreshing(true);
      const [profileData, pointsData] = await Promise.all([
        getUserProfile(),
        getPoints(),
      ]);
      setUserProfile(profileData);
      setPoints(pointsData);
    } catch (error) {
      Alert.alert("Error", "Unable to load profile data or points");
    } finally {
      setRefreshing(false);
    }
  };

  const menuItems = [
    {
      id: 2,
      title: "Tiers & Rewards",
      icon: "star-outline",
      color: "#26589c",
      screen: "TierScreen",
    },
    {
      id: 3,
      title: "Saved Addresses",
      icon: "location-outline",
      color: "#26589c",
      screen: "Savedaddresses",
    },
    {
      id: 4,
      title: "Payment Methods",
      icon: "card-outline",
      color: "#26589c",
      screen: "PaymentMethods",
    },
    {
      id: 5,
      title: "Wishlist",
      icon: "heart-outline",
      color: "#26589c",
      screen: "WishListScreen",
    },
    {
      id: 6,
      title: "Help Center",
      icon: "help-circle-outline",
      color: "#26589c",
      screen: "HelpCenter",
    },
    {
      id: 7,
      title: "Feedback",
      icon: "chatbox-outline",
      color: "#26589c",
      screen: "Feedback",
    },
  ];

  const determineTier = () => {
    let currentTier = tiers[0]; // Default to Bronze
    let tierIndex = 0;
    let pointsForCurrentTier = 0;

    for (let i = 0; i < tiers.length - 1; i++) {
      if (points < tiers[i].pointsToNextTier) {
        currentTier = tiers[i];
        tierIndex = i;
        pointsForCurrentTier = i === 0 ? 0 : tiers[i - 1].pointsToNextTier;
        break;
      } else if (i < tiers.length - 2 && points >= tiers[i].pointsToNextTier) {
        // Move to the next tier if points exceed current tier but not yet at Elite
        currentTier = tiers[i + 1];
        tierIndex = i + 1;
        pointsForCurrentTier = tiers[i].pointsToNextTier;
      }
    }

    // Handle Elite tier (points >= 8000)
    if (points >= tiers[tiers.length - 2].pointsToNextTier) {
      currentTier = tiers[tiers.length - 1]; // Elite
      tierIndex = tiers.length - 1;
      pointsForCurrentTier = tiers[tiers.length - 2].pointsToNextTier;
    }

    return { currentTier, tierIndex, pointsForCurrentTier };
  };

  const { currentTier, tierIndex, pointsForCurrentTier } = determineTier();
  const nextTier = tiers[tierIndex + 1] || null;
  const pointsToNextTier = nextTier ? nextTier.pointsToNextTier : null;
  const progress = pointsToNextTier
    ? Math.min(
        ((points - pointsForCurrentTier) / (pointsToNextTier - pointsForCurrentTier)) * 100,
        100
      )
    : 100;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [50, 35],
    extrapolate: "clamp",
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleRefresh = async () => {
    await fetchUserData();
  };

  const handleMenuPress = (screen) => {
    if (screen === "EditProfileScreen") {
      navigation.navigate("EditProfileScreen", {
        userData: {
          fullName: userProfile?.fullName || "",
          phoneNumber: userProfile?.phoneNumber || "",
          profilePicture:
            userProfile?.profilePictureUrl || defaultProfilePicture,
        },
        onSuccess: () => {
          fetchUserData();
        },
      });
    } else if (screen === "ChangePasswordScreen") {
      navigation.navigate("Account", {
        screen: "ChangePasswordScreen",
        params: {
          onSuccess: () => {
            navigation.navigate("Account", { screen: "ChangePasswordScreen" });
          },
        },
      });
    } else {
      navigation.navigate("Account", { screen });
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteToken();
              setIsAuthenticated(false);
              navigation.reset({
                index: 0,
                routes: [{ name: "AuthNavigation" }],
              });
            } catch (error) {
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderMenuItem = ({ id, title, icon, color, screen }) => (
    <TouchableOpacity
      key={id}
      style={styles.menuItem}
      onPress={() => handleMenuPress(screen)}
    >
      <View style={styles.menuItemLeft}>
        <LinearGradient
          colors={[color, color === "#26589c" ? "#26589c" : "#26589c"]}
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

  const renderProfileSection = () => (
    <View style={styles.profileSection}>
      <View style={styles.profileImageContainer}>
        <LinearGradient
          colors={["#26589c", "#26589c"]}
          style={styles.profileImageBorder}
        >
          <View style={styles.profileImageInner}>
            <Image
              source={{
                uri:
                  userProfile?.profilePictureUrl?.trim() &&
                  userProfile?.profilePictureUrl !== " "
                    ? userProfile.profilePictureUrl
                    : defaultProfilePicture,
              }}
              style={styles.profileImage}
            />
          </View>
        </LinearGradient>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => handleMenuPress("EditProfileScreen")}
        >
          <LinearGradient
            colors={["#26589c", "#26589c"]}
            style={styles.editButtonGradient}
          >
            <Ionicons name="pencil" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.nameText}>{userProfile?.fullName || "N/A"}</Text>
      <Text style={styles.emailText}>{userProfile?.email || "N/A"}</Text>
      <Text style={styles.emailText}>{"Mobile: " + userProfile?.phoneNumber || "N/A"}</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <LinearGradient
          colors={["#26589c", "#26589c"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.membershipBadge}
        >
          <Image
            source={currentTier.image}
            style={styles.tierBadgeImage}
            resizeMode="contain"
          />
          <Text style={styles.membershipText}>{currentTier.name} Member</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />

      <Header
        title="Profile"
        action={() => navigation.navigate("NotificationScreen")}
        actionIconName={actionIcons.notification}
      />
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#26589c"
            colors={["#26589c", "#26589c"]}
            progressBackgroundColor="#fff"
          />
        }
      >
        {renderProfileSection()}

        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={["#26589c", "#26589c"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutGradient}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>   {currentTier.name} Tier</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#26589c" />
              </TouchableOpacity>
            </View>
            <Image
              source={currentTier.image}
              style={styles.tierImage}
              resizeMode="contain"
            />
            <Text style={styles.pointsText}>{points} Points</Text>
            {currentTier.name === "Elite" ? (
              <Text style={styles.progressText}>You’ve reached the highest tier!</Text>
            ) : (
              <>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${progress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {points - pointsForCurrentTier} / {pointsToNextTier - pointsForCurrentTier} points to {nextTier.name} Tier
                </Text>
              </>
            )}
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Account", { screen: "TierScreen" });
              }}
            >
              <Text style={styles.detailsButtonText}>View Tier Details</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
  },
  innerContainer: {
    flex: 1,
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

    backgroundColor: "#fff",

  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    padding: 15,
    marginTop: 15,
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
    shadowColor: "#26589c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    marginBottom: 2,
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
  tierBadgeImage: {
    width: 24,
    height: 24,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 15,
    padding: 4,
    marginTop: 10,
    shadowColor: "#26589c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
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
    shadowColor: "#26589c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "50%",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Align items to the edges
    width: "100%",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#26589c",
  },
  tierImage: {
    width: width * 0.6,
    height: 150,
    marginBottom: 15,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 15,
  },
  progressBarContainer: {
    width: "80%",
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FFC300",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  detailsButton: {
    backgroundColor: "#26589c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MainAccPageScreen;