import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../../components/Header";

const { width } = Dimensions.get("window");

const HelpCenter = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", title: "All", icon: "apps-outline" },
    { id: "account", title: "Account", icon: "person-outline" },
    { id: "orders", title: "Orders", icon: "cart-outline" },
    { id: "payment", title: "Payment", icon: "card-outline" },
    { id: "delivery", title: "Delivery", icon: "bicycle-outline" },
    { id: "technical", title: "Technical", icon: "hardware-chip-outline" },
  ];

  const faqItems = [
    {
      id: 1,
      category: "account",
      question: "How can I change my password?",
      answer:
        "You can change your password by going to account settings, then selecting 'Change Password' and entering your old and new password.",
    },
    {
      id: 2,
      category: "orders",
      question: "How can I track my order?",
      answer:
        "You can track your order by going to the 'My Orders' section and selecting the order you want to track. You'll find the tracking number and current order status there.",
    },
    {
      id: 3,
      category: "payment",
      question: "What payment methods are available?",
      answer:
        "We accept credit and debit cards, cash on delivery, bank transfers, and gift cards.",
    },
    {
      id: 4,
      category: "delivery",
      question: "How long does delivery take?",
      answer:
        "Delivery typically takes 1-3 business days within the city and 3-5 business days to other cities.",
    },
    {
      id: 5,
      category: "technical",
      question: "The app is not working properly, what should I do?",
      answer:
        "Try closing the app and reopening it. If the problem persists, update the app to the latest version or reinstall it.",
    },
  ];

  const filteredFaqItems =
    activeCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const renderHeader = () => (
    // <View style={styles.header}>
    //   <View style={styles.headerContent}>
    //     <TouchableOpacity
    //       onPress={() => navigation.goBack()}
    //       style={styles.backButton}
    //     >
    //       <Ionicons name="arrow-back" size={24} color="#fff" />
    //     </TouchableOpacity>
    //     <Text style={styles.headerTitle}>Help Center</Text>
    //     <View style={{ width: 40 }} />
    //   </View>
    // </View>
    <Header
      title="Help center"
      backButtonAction={() => navigation.goBack()}
    />
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for help..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Ionicons
              name={category.icon}
              size={20}
              color={activeCategory === category.id ? "#fff" : "#26589c"}
            />
            <Text
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderFaqItems = () => (
    <View style={styles.faqContainer}>
      <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
      {filteredFaqItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.faqItem}>
          <View style={styles.faqQuestionContainer}>
            <Text style={styles.faqQuestion}>{item.question}</Text>
            <Ionicons name="chevron-down" size={20} color="#26589c" />
          </View>
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContactSupport = () => (
    <TouchableOpacity style={styles.contactButton}>
      <LinearGradient
        colors={["#26589c", "#9cb2d8"]}
        style={styles.contactGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Ionicons name="headset-outline" size={24} color="#fff" />
        <Text style={styles.contactText}>Contact Support Team</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    // <LinearGradient
    //   colors={["#26589c", "#9cb2d8"]}
    //   style={styles.container}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 0 }}
    // >
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />
      <View style={styles.innerContainer}>
        {/* <SafeAreaView style={styles.innerContainer}> */}
        {renderHeader()}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderSearchBar()}
          {renderCategories()}
          {renderFaqItems()}
          {renderContactSupport()}
        </ScrollView>
        {/* </SafeAreaView> */}
      </View>
    </View>
    //  </LinearGradient>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Preserve the grayish background
  },
  scrollContent: {
    paddingBottom: 32,
  },
  searchContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  categoriesContainer: {
    marginBottom: 24,
    width: "100%",
    flexDirection: "row",
  },
  categoriesScroll: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 0,
    marginLeft: 0,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeCategoryButton: {
    backgroundColor: "#26589c",
    borderRightColor: "#26589c",
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#26589c",
  },
  activeCategoryText: {
    color: "#fff",
  },
  faqContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 16,
  },
  faqQuestionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  contactButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
    shadowColor: "#26589c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  contactGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
