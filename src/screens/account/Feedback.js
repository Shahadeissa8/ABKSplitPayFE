import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";

const { width } = Dimensions.get("window");

const Feedback = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedbackModalContent, setFeedbackModalContent] = useState({
    title: "",
    message: "",
    icon: "checkmark-circle",
    iconColor: "#4CAF50",
    buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
  });

  const categories = [
    {
      id: 1,
      title: "App Experience",
      icon: "phone-portrait-outline",
      gradient: ["#FF6B6B", "#FF8787"],
    },
    {
      id: 2,
      title: "Customer Service",
      icon: "people-outline",
      gradient: ["#4FACFE", "#00F2FE"],
    },
    {
      id: 3,
      title: "Products",
      icon: "cart-outline",
      gradient: ["#43E97B", "#38F9D7"],
    },
    {
      id: 4,
      title: "Delivery",
      icon: "bicycle-outline",
      gradient: ["#FA709A", "#FEE140"],
    },
  ];

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <Ionicons
                name={rating >= star ? "star" : "star-outline"}
                size={45}
                color={rating >= star ? "#FFD700" : "rgba(38, 88, 156, 0.3)"}
              />
            </TouchableOpacity>
          ))}
        </View>
        {rating > 0 && (
          <View style={styles.ratingLabel}>
            <Text style={styles.ratingText}>
              {rating === 5
                ? "Excellent!"
                : rating === 4
                ? "Very Good!"
                : rating === 3
                ? "Good"
                : rating === 2
                ? "Fair"
                : "Poor"}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      setFeedbackModalContent({
        title: "Please Select",
        message: "Please choose a category to rate",
        icon: "alert-circle-outline",
        iconColor: "#FF4444",
        buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
      });
      setFeedbackModalVisible(true);
      return;
    }
    if (rating === 0) {
      setFeedbackModalContent({
        title: "Rating Required",
        message: "Please rate your experience",
        icon: "alert-circle-outline",
        iconColor: "#FF4444",
        buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
      });
      setFeedbackModalVisible(true);
      return;
    }
    setFeedbackModalContent({
      title: "Thank You!",
      message: "We appreciate your valuable feedback.",
      icon: "checkmark-circle",
      iconColor: "#4CAF50",
      buttons: [
        {
          text: "OK",
          onPress: () => {
            setFeedbackModalVisible(false);
            navigation.goBack();
          },
        },
      ],
    });
    setFeedbackModalVisible(true);
  };

  const renderFeedbackModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={feedbackModalVisible}
      onRequestClose={() => setFeedbackModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{feedbackModalContent.title}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFeedbackModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.feedbackContent}>
            <Ionicons
              name={feedbackModalContent.icon}
              size={48}
              color={feedbackModalContent.iconColor}
              style={styles.feedbackIcon}
            />
            <Text style={styles.modalMessage}>{feedbackModalContent.message}</Text>
            <View style={styles.feedbackButtons}>
              {feedbackModalContent.buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.feedbackButton}
                  onPress={button.onPress}
                >
                  <Text style={styles.feedbackButtonText}>{button.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
    
      <Header
        title="Feedback"
        backButtonAction={() => navigation.goBack()}
      /> 
       
      <View style={styles.safeArea}>
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>We'd love to hear from you!</Text>
            <Text style={styles.subtitle}>
              Your feedback helps us improve our services and provide a better
              experience.
            </Text>
          </View>

          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>What would you like to rate?</Text>
            <View style={styles.categories}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory?.id === category.id &&
                      styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <LinearGradient
                    colors={
                      selectedCategory?.id === category.id
                        ? category.gradient
                        : ["#fff", "#fff"]
                    }
                    style={styles.categoryGradient}
                  >
                    <Ionicons
                      name={category.icon}
                      size={32}
                      color={
                        selectedCategory?.id === category.id ? "#fff" : "#26589c"
                      }
                    />
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory?.id === category.id &&
                          styles.selectedCategoryText,
                      ]}
                    >
                      {category.title}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.sectionTitle}>How was your experience?</Text>
            {renderStars()}
          </View>

          <View style={styles.feedbackContainer}>
            <Text style={styles.sectionTitle}>Tell us more (Optional)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.feedbackInput}
                placeholder="Share your thoughts..."
                placeholderTextColor="#999"
                multiline
                value={feedback}
                onChangeText={setFeedback}
                textAlignVertical="top"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!selectedCategory || rating === 0) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={
                !selectedCategory || rating === 0
                  ? ["#ccc", "#999"]
                  : ["#26589c", "#26589c"]
              }
              style={styles.submitGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.submitText}>Submit Feedback</Text>
              <Ionicons
                name="send"
                size={20}
                color="#fff"
                style={styles.submitIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {renderFeedbackModal()}
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 60,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 44, 
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
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#26589c",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  categoriesContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#26589c",
    marginBottom: 15,
    paddingLeft: 5,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  categoryButton: {
    width: width * 0.43,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryGradient: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  categoryText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#26589c",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  ratingContainer: {
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  starsContainer: {
    alignItems: "center",
    paddingVertical: 15,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  starButton: {
    padding: 8,
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingLabel: {
    marginTop: 15,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#26589c",
    borderRadius: 25,
  },
  ratingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  feedbackContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  feedbackInput: {
    height: 150,
    padding: 15,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },
  submitButton: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#26589c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitGradient: {
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
  submitIcon: {
    marginLeft: 8,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    width: Dimensions.get("window").width * 0.9,
    maxHeight: Dimensions.get("window").height * 0.7,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#26589c",
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackContent: {
    padding: 20,
    alignItems: "center",
  },
  feedbackIcon: {
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  feedbackButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  feedbackButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#26589c",
    borderRadius: 10,
  },
  feedbackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});