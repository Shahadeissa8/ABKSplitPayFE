import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

const ImageLoader = () => {
  // Array of images you want to display; add as many as you want here
  const images = [
    require("../../../assets/pic1.png"),
    require("../../../assets/pic2.png"),
    // Add more images as required
  ];

  // Set initial opacity values for all images
  const [opacities, setOpacities] = useState(
    images.map((_, index) => new Animated.Value(index === 0 ? 1 : 0)) // Set the first image to opacity 1
  );

  const [currentIndex, setCurrentIndex] = useState(0); // Index to track current image

  // Function to transition between images
  const switchImage = () => {
    const nextIndex = (currentIndex + 1) % images.length; // Cycle through the images

    // Fade out the current image and fade in the next image at the same time
    Animated.parallel([
      Animated.timing(opacities[currentIndex], {
        toValue: 0, // Fade out the current image
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacities[nextIndex], {
        toValue: 1, // Fade in the next image
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(nextIndex); // Update the current image index
    });
  };

  useEffect(() => {
    // Set the interval to switch images every 3 seconds
    const interval = setInterval(switchImage, 3000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Animated.Image
          key={index}
          source={image}
          style={[styles.image, { opacity: opacities[index] }]}
        />
      ))}
    </View>
  );
};

const InstructionsCard = () => (
  <View style={styles.container}>
    <ImageLoader />
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingBottom: 50,
  },
  image: {
    width: 370,
    height: 150,
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute", // Stack images on top of each other
  },
});

export default InstructionsCard;
