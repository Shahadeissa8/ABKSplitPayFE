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
  Dimensions,
  ScrollView,
  RefreshControl,
  Alert,
  Modal,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { deleteToken } from "../../api/storage";
import { getUserProfile, getPoints } from "../../api/profile";
import { getToken } from "../../api/storage";
import { getUserId } from "../../api/storage";
import { actionIcons, Header } from "../../components/Header";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const tiers = [
  { name: "Bronze", image: require("../../../assets/Bronze.png"), minPoints: 0, pointsToNextTier: 1200 },
  { name: "Silver", image: require("../../../assets/Silver.png"), minPoints: 1200, pointsToNextTier: 3600 },
  { name: "Gold", image: require("../../../assets/Gold.png"), minPoints: 3600, pointsToNextTier: 8000 },
  { name: "Elite", image: require("../../../assets/Elite.png"), minPoints: 8000, pointsToNextTier: null },
];

const MainAccPageScreen = ({ setIsAuthenticated }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
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
      setUserProfile(profileData || {});
      setPoints(pointsData || 0);
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
    let currentTier = tiers[0];
    let tierIndex = 0;

    for (let i = 0; i < tiers.length; i++) {
      if (points >= tiers[i].minPoints && (i === tiers.length - 1 || points < tiers[i + 1].minPoints)) {
        currentTier = tiers[i];
        tierIndex = i;
        break;
      }
    }

    const nextTier = tiers[tierIndex + 1] || null;
    const pointsForCurrentTier = currentTier.minPoints;
    const pointsToNextTier = nextTier ? nextTier.minPoints : null;

    const progress = pointsToNextTier
      ? Math.min(
          ((points - pointsForCurrentTier) / (pointsToNextTier - pointsForCurrentTier)) * 100,
          100
        )
      : 100;
    const pointsNeeded = pointsToNextTier ? pointsToNextTier - points : 0;

    return { currentTier, tierIndex, pointsForCurrentTier, nextTier, pointsToNextTier, progress, pointsNeeded };
  };

  const { currentTier, pointsForCurrentTier, nextTier, pointsToNextTier, progress, pointsNeeded } = determineTier();

  const handleRefresh = async () => {
    await fetchUserData();
  };

  const handleMenuPress = (screen) => {
    if (!navigation) return;
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
              if (setIsAuthenticated) {
                setIsAuthenticated(false);
              }
              if (navigation) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "AuthNavigation" }],
                });
              }
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

  const getProgressColors = () => {
    switch (currentTier.name) {
      case "Bronze":
        return ["#CD7F32", "#C0C0C0"]; // Bronze to Silver
      case "Silver":
        return ["#C0C0C0", "#FFD700"]; // Silver to Gold
      case "Gold":
        return ["#FFD700", "#000000"]; // Gold to Black (Elite)
      case "Elite":
        return ["#000000", "#000000"]; // Black
      default:
        return ["#26589c", "#26589c"];
    }
  };

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
      <Text style={styles.emailText}>{"Mobile: " + (userProfile?.phoneNumber || "N/A")}</Text>
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

  const renderModalContent = () => {
    const isElite = currentTier.name === "Elite";
    const size = 200; // Size of the SVG ring to encircle the 180x180 badge
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressStroke = (progress / 100) * circumference;

    return (
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{currentTier.name} Tier</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={24} color="#26589c" />
          </TouchableOpacity>
        </View>
        <View style={styles.modalBadgeContainer}>
          <Svg height={size} width={size} style={styles.circularProgress}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#ddd"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={isElite ? "#000000" : getProgressColors()[0]}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progressStroke}
            />
          </Svg>
          <Image source={currentTier.image} style={styles.modalTierImage} resizeMode="contain" />
        </View>
        {currentTier.name === "Elite" ? (
          <Text style={styles.progressText}>You’ve reached the highest tier!</Text>
        ) : (
          <Text style={styles.progressText}>
            Points to {nextTier ? nextTier.name : "Elite"} Tier: {pointsNeeded}
          </Text>
        )}
        <Text style={styles.pointsText}>My points: {points}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => {
            setModalVisible(false);
            navigation?.navigate("Account", { screen: "TierScreen" });
          }}
        >
          <Text style={styles.detailsButtonText}>View Tier Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />
      <Header
        title="Profile"
        action={() => navigation?.navigate("NotificationScreen")}
        actionIconName={actionIcons.notification}
      />
      <SafeAreaView style={styles.content}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
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
        </ScrollView>
      </SafeAreaView>
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
          {renderModalContent()}
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
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 15,
    position: "relative",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#26589c",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  closeButton: {
    padding: 5,
  },
  modalBadgeContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
    height: 200, // Adjusted to accommodate SVG size
  },
  modalTierImage: {
    width: 180,
    height: 180,
    position: "absolute",
    zIndex: 1,
  },
  circularProgress: {
    position: "absolute",
    zIndex: 0,
    bottom: 15,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#26589c",
    marginTop: 10,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#26589c",
    marginTop: 10,
  },
  detailsButton: {
    backgroundColor: "#26589c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MainAccPageScreen;