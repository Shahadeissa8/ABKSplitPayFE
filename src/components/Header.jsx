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
  backButton: "chevron-back",
  notification: "notifications-outline",
  addButton: "add",
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
        <View style={styles.side}>
          {backButtonAction != null && (
            <View>
              <TouchableOpacity onPress={backButtonAction}>
                <Ionicons
                  name={actionIcons.backButton}
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.side}>
          {actionIconName != null && (
            <TouchableOpacity onPress={action}>
              <View>
                <Ionicons name={actionIconName} size={25} color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* if (description) {<Text style={styles.description}>{description}</Text>} */}
    </View>
  );
};

export { Header, actionIcons };

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 100,
  },
  header: {
    backgroundColor: "#26589c",
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  titleMiddle: {
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
    padding: 3,
  },
  side: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
});
