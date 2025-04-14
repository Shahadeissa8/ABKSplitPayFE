import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState } from "react";
import CategoryList from "../../components/ExploreComponents/CategoryList";
import InstructionsCard from "../../components/ExploreComponents/InstructionsCard";
import DealsList from "../../components/ExploreComponents/DealsList";
import ProductList from "../../components/ExploreComponents/ProductList";
import { useNavigation } from "@react-navigation/native";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // 👈 Step 1

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.instructionsContainer}>
          <InstructionsCard />
        </View>

        <View style={styles.contentContainer}>
          <DealsList />
        </View>

        <View>
          <CategoryList onSelectCategory={setSelectedCategoryId} />{" "}
          {/* ✅ Step 2 */}
        </View>

        <View>
          <ProductList
            selectedCategoryId={selectedCategoryId} // ✅ Step 3
            onPress={(productId) =>
              navigation.navigate("ProductDetailsScreen", { productId })
            }
          />
        </View>
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
  instructionsContainer: {
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
  },
});
