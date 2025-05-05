import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

const ImageLoader = () => {
  const images = [
    require("../../../assets/pic1.png"),
    require("../../../assets/pic2.png"),
    require("../../../assets/pic3.png"),
  ];

  const [opacities, setOpacities] = useState(
    images.map((_, index) => new Animated.Value(index === 0 ? 1 : 0))
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const switchImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;

    Animated.parallel([
      Animated.timing(opacities[currentIndex], {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacities[nextIndex], {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(nextIndex);
    });
  };

  useEffect(() => {
    let isMounted = true;

    const interval = setInterval(() => {
      if (isMounted) switchImage();
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      opacities.forEach((opacity) => opacity.stopAnimation());
    };
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
