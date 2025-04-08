import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import React from "react";
import CategoryList from "../../components/ExploreComponents/CategoryList";
import InstructionsCard from "../../components/ExploreComponents/InstructionsCard";
import DealsList from "../../components/ExploreComponents/DealsList";
import { LinearGradient } from "expo-linear-gradient";

const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      <ScrollView
        // showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={["rgba(46, 49, 146, 0.1)", "rgba(27, 255, 255, 0.1)"]}
          style={styles.background}
        >
          <View style={styles.instructionsContainer}>
            <InstructionsCard />
          </View>
          <View style={styles.CategoryContainer}>
            <CategoryList />
          </View>
          <View style={styles.contentContainer}>
            <DealsList />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  instructionsContainer: {
    // marginTop: 40,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
  },
  dealsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  // CategoryContainer: { marginTop:  },
});
