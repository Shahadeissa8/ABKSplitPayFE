import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const actionIcons = {
  cart: "cart-outline",
  backButton: "arrow-back",
  notification: "notifications-outline",
  addCard:"add-circle-outline"
};

const colors = {
  primary: "#2E3192",
  secondary: "#26589c",
  background: "#FFFFFF",
  backgroundLight: "#F5F5F5",
  textPrimary: "#333333",
  textSecondary: "#666666",
  border: "#EEEEEE",
  white: "#FFFFFF",
  gradientColors: ["#26589c", "#9cb2d8"],
};

const Header = ({
  title,
  action,
  actionIconName,
  description,
  backButtonAction,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {backButtonAction != null && (
          <LinearGradient
            colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={backButtonAction}
            >
              <Ionicons
                name={actionIcons.backButton}
                size={24}
                color={colors.white}
              />
            </TouchableOpacity>
          </LinearGradient>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
        {actionIconName != null && (
          <TouchableOpacity style={styles.actionButton} onPress={action}>
            <LinearGradient
              colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Ionicons name={actionIconName} size={30} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      if (description) {<Text style={styles.civilId}>{description}</Text>}
    </View>
  );
};

export { Header, actionIcons };

const styles = StyleSheet.create({
  actionButton: {
    padding: 8,
  },
  backButton: {
    padding: 15,
    marginRight: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  gradient: {
    padding: 4,
    borderRadius: 100,
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 20,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    alignContent: "center",
    paddingTop: 20,
  },

  civilId: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
});
