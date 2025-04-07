// import { StyleSheet, FlatList, Text, TouchableOpacity, View, Image,Animated } from "react-native";
// // import React from "react";
// import React, { Component } from 'react';

// const InstructionsCard = () => {
//   return (
//     <View>
// <FlatList data={[1]}> </FlatList>
//       <TouchableOpacity>
//         {/* <Text style={styles.text}>InstructionsCard</Text> */}
//         <Image
//           source={require("../../../assets/Ordernowpaylater.png")}
//           style={{
//             width: 380,
//             height: 110,
//             borderRadius: 15,
//             alignSelf: "center",
//           }}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default InstructionsCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     margin: 5,
//     // padding: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     flexDirection: "row",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     alignSelf: "center",
//     marginLeft: 10,
//   },
// });

// import React, { Component } from "react";
// import { View, StyleSheet, Animated } from "react-native";

// class ImageLoader extends Component {
//   state = {
//     opacity: new Animated.Value(0),
//   };

//   onLoad = () => {
//     Animated.timing(this.state.opacity, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   };

//   render() {
//     return (
//       <Animated.Image
//         onLoad={this.onLoad}
//         {...this.props}
//         style={[
//           {
//             opacity: this.state.opacity,
//             transform: [
//               {
//                 scale: this.state.opacity.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0.85, 1],
//                 }),
//               },
//             ],
//           },
//           this.props.style,
//         ]}
//       />
//     );
//   }
// }

// const InstructionsCard = () => (
//   <View style={styles.container}>
//     <ImageLoader
//       style={styles.image}
//       // source={{
//       //   uri: "https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
//       // }}
//       source={require("../../../assets/Ordernowpaylater.png")}
//     />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: 300,
//     height: 300,
//     borderRadius: 10,
//   },
// });

// export default InstructionsCard;
// import React, { Component } from "react";
// import { View, StyleSheet, Animated } from "react-native";

// // ImageLoader component to handle image switching and fade effect
// class ImageLoader extends Component {
//   state = {
//     opacity1: new Animated.Value(1), // Opacity for the first image (initially visible)
//     opacity2: new Animated.Value(0), // Opacity for the second image (initially hidden)
//     currentImage: require("../../../assets/Ordernowpaylater.png"), // Start with the first image
//   };

//   // Function to switch between images with fade effect
//   switchImage = () => {
//     // Fade out the current image
//     Animated.timing(this.state.opacity1, {
//       toValue: 0, // Fade to 0 (hidden)
//       duration: 500, // Duration of the fade-out
//       useNativeDriver: true,
//     }).start(() => {
//       // After fade-out is complete, switch the image and fade in the new one
//       const newImage =
//         this.state.currentImage ===
//         require("../../../assets/Ordernowpaylater.png")
//           ? require("../../../assets/Ordernowpaylater2.png") // Switch to second image
//           : require("../../../assets/Ordernowpaylater.png"); // Switch to first image

//       this.setState({ currentImage: newImage }, () => {
//         // Fade in the new image
//         Animated.timing(this.state.opacity2, {
//           toValue: 1, // Fade to full visibility
//           duration: 500, // Duration of the fade-in effect
//           useNativeDriver: true,
//         }).start();

//         // Switch opacity1 to make the other image fade out in the next cycle
//         Animated.timing(this.state.opacity1, {
//           toValue: 1, // Make the first image visible again after the fade-out
//           duration: 0,
//           useNativeDriver: true,
//         }).start();
//       });
//     });
//   };

//   componentDidMount() {
//     // Change image every 3 seconds
//     setInterval(this.switchImage, 3000); // Change the image every 3 seconds
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {/* First Image */}
//         <Animated.Image
//           source={require("../../../assets/Ordernowpaylater.png")}
//           style={[styles.image, { opacity: this.state.opacity1 }]} // Apply fade animation to first image
//         />
//         {/* Second Image */}
//         <Animated.Image
//           source={require("../../../assets/Ordernowpaylater2.png")}
//           style={[styles.image, { opacity: this.state.opacity2 }]} // Apply fade animation to second image
//         />
//       </View>
//     );
//   }
// }

// const InstructionsCard = () => (
//   <View style={styles.container}>
//     <ImageLoader /> {/* Render the ImageLoader to handle image switching */}
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   image: {
//     width: 380,
//     height: 110,
//     borderRadius: 15,
//     alignSelf: "center",
//     position: "absolute", // Stack the images on top of each other
//   },
// });

// export default InstructionsCard;
// import React, { Component } from "react";
// import { View, StyleSheet, Animated } from "react-native";

// // ImageLoader component to handle image switching and fade effect
// class ImageLoader extends Component {
//   state = {
//     opacity1: new Animated.Value(1), // Opacity for the first image (initially visible)
//     opacity2: new Animated.Value(0), // Opacity for the second image (initially hidden)
//     currentImage: require("../../../assets/Ordernowpaylater.png"), // Start with the first image
//   };

//   // Function to switch between images with fade effect
//   switchImage = () => {
//     // Fade out the current image (either opacity1 or opacity2)
//     Animated.timing(this.state.opacity1, {
//       toValue: 0, // Fade out the first image
//       duration: 500, // Duration of the fade-out
//       useNativeDriver: true,
//     }).start(() => {
//       // After fade-out, switch images
//       const newImage =
//         this.state.currentImage ===
//         require("../../../assets/Ordernowpaylater.png")
//           ? require("../../../assets/Ordernowpaylater2.png") // Switch to second image
//           : require("../../../assets/Ordernowpaylater.png"); // Switch to first image

//       this.setState({ currentImage: newImage }, () => {
//         // Fade in the new image
//         Animated.timing(this.state.opacity2, {
//           toValue: 1, // Fade to full visibility
//           duration: 500, // Duration of the fade-in effect
//           useNativeDriver: true,
//         }).start(() => {
//           // After fade-in is complete, switch opacity1 to make the first image ready for the next cycle
//           Animated.timing(this.state.opacity1, {
//             toValue: 1, // Reset opacity1 to visible (next round)
//             duration: 0, // Instant visibility change, no fading
//             useNativeDriver: true,
//           }).start();
//         });
//       });
//     });
//   };

//   componentDidMount() {
//     // Change image every 3 seconds
//     this.imageSwitchInterval = setInterval(this.switchImage, 3000); // Change the image every 3 seconds
//   }

//   componentWillUnmount() {
//     // Clear the interval when component unmounts to avoid memory leak
//     clearInterval(this.imageSwitchInterval);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {/* First Image */}
//         <Animated.Image
//           source={require("../../../assets/Ordernowpaylater.png")}
//           style={[styles.image, { opacity: this.state.opacity1 }]} // Apply fade animation to first image
//         />
//         {/* Second Image */}
//         <Animated.Image
//           source={require("../../../assets/Ordernowpaylater2.png")}
//           style={[styles.image, { opacity: this.state.opacity2 }]} // Apply fade animation to second image
//         />
//       </View>
//     );
//   }
// }

// const InstructionsCard = () => (
//   <View style={styles.container}>
//     <ImageLoader /> {/* Render the ImageLoader to handle image switching */}
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   image: {
//     width: 380,
//     height: 110,
//     borderRadius: 15,
//     alignSelf: "center",
//     position: "absolute", // Stack the images on top of each other
//   },
// });

// export default InstructionsCard;
// import React, { Component } from "react";
// import { View, StyleSheet, Animated } from "react-native";

// class ImageLoader extends Component {
//   state = {
//     opacity1: new Animated.Value(1), // First image visible
//     opacity2: new Animated.Value(0), // Second image hidden
//   };

//   // Function to switch between images with fade effect
//   switchImage = () => {
//     // Fade out the first image
//     Animated.timing(this.state.opacity1, {
//       toValue: 0,
//       duration: 3000,
//       useNativeDriver: true,
//     }).start(() => {
//       // Fade in the second image
//       Animated.timing(this.state.opacity2, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start(() => {
//         // Once second image is fully visible, fade out it
//         Animated.timing(this.state.opacity2, {
//           toValue: 0,
//           duration: 1000,
//           useNativeDriver: true,
//         }).start(() => {
//           // Fade the first image back in after second image fades out
//           Animated.timing(this.state.opacity1, {
//             toValue: 1,
//             duration: 1000,
//             useNativeDriver: true,
//           }).start();
//         });
//       });
//     });
//   };

//   componentDidMount() {
//     // Keep switching the images every 3 seconds as long as the component is mounted
//     this.imageSwitchInterval = setInterval(this.switchImage, 1000);
//   }

//   componentWillUnmount() {
//     // Clear the interval when the component is unmounted to prevent memory leaks
//     clearInterval(this.imageSwitchInterval);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {/* First Image */}
//         <Animated.Image
//           source={require("../../../assets/Ordernowpaylater.png")}
//           style={[styles.image, { opacity: this.state.opacity1 }]}
//         />
//         {/* Second Image */}
//         <Animated.Image
//           source={require("../../../assets/Ordernowpaylater2.png")}
//           style={[styles.image, { opacity: this.state.opacity2 }]}
//         />
//       </View>
//     );
//   }
// }

// const InstructionsCard = () => (
//   <View style={styles.container}>
//     <ImageLoader />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   image: {
//     width: 380,
//     height: 110,
//     borderRadius: 15,
//     alignSelf: "center",
//     position: "absolute", // Stack images on top of each other
//   },
// });

// export default InstructionsCard;

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Animated } from "react-native";

// const ImageLoader = () => {
//   const opacity1 = useState(new Animated.Value(1))[0]; // First image visible
//   const opacity2 = useState(new Animated.Value(0))[0]; // Second image hidden

//   // Function to switch between images with fade effect
//   const switchImage = () => {
//     // Fade out the first image
//     Animated.timing(opacity1, {
//       toValue: 0,
//       duration: 3000,
//       useNativeDriver: true,
//     }).start(() => {
//       // Fade in the second image
//       Animated.timing(opacity2, {
//         toValue: 1,
//         duration: 3000,
//         useNativeDriver: true,
//       }).start(() => {
//         // Once second image is fully visible, fade out it
//         Animated.timing(opacity2, {
//           toValue: 0,
//           duration: 3000,
//           useNativeDriver: true,
//         }).start(() => {
//           // Fade the first image back in after second image fades out
//           Animated.timing(opacity1, {
//             toValue: 1,
//             duration: 3000,
//             useNativeDriver: true,
//           }).start();
//         });
//       });
//     });
//   };

//   useEffect(() => {
//     // Keep switching the images every 3 seconds as long as the component is mounted
//     const imageSwitchInterval = setInterval(switchImage, 3000);

//     // Clear the interval when the component is unmounted to prevent memory leaks
//     return () => clearInterval(imageSwitchInterval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* First Image */}
//       <Animated.Image
//         source={require("../../../assets/Ordernowpaylater.png")}
//         style={[styles.image, { opacity: opacity1 }]}
//       />
//       {/* Second Image */}
//       <Animated.Image
//         source={require("../../../assets/Ordernowpaylater2.png")}
//         style={[styles.image, { opacity: opacity2 }]}
//       />
//     </View>
//   );
// };

// const InstructionsCard = () => (
//   <View style={styles.container}>
//     <ImageLoader />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   image: {
//     width: 380,
//     height: 110,
//     borderRadius: 15,
//     alignSelf: "center",
//     position: "absolute", // Stack images on top of each other
//   },
// });

// export default InstructionsCard;
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Animated } from "react-native";

// const ImageLoader = () => {
//   // Initialize opacity for two images
//   const opacity1 = useState(new Animated.Value(1))[0]; // First image visible
//   const opacity2 = useState(new Animated.Value(0))[0]; // Second image hidden

//   // Function to switch between images with fade effect
//   const switchImage = () => {
//     // Fade out the first image and fade in the second image at the same time
//     Animated.parallel([
//       Animated.timing(opacity1, {
//         toValue: 0,
//         duration: 3000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(opacity2, {
//         toValue: 1,
//         duration: 3000,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       // Once the second image is fully visible, fade out the second image
//       Animated.timing(opacity2, {
//         toValue: 0,
//         duration: 3000,
//         useNativeDriver: true,
//       }).start(() => {
//         // Fade the first image back in after the second image fades out
//         Animated.timing(opacity1, {
//           toValue: 1,
//           duration: 3000,
//           useNativeDriver: true,
//         }).start();
//       });
//     });
//   };

//   useEffect(() => {
//     // Start switching images every 3 seconds
//     const imageSwitchInterval = setInterval(switchImage, 3000);

//     // Clear the interval when the component is unmounted to prevent memory leaks
//     return () => clearInterval(imageSwitchInterval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* First Image */}
//       <Animated.Image
//         source={require("../../../assets/Ordernowpaylater.png")}
//         style={[styles.image, { opacity: opacity1 }]}
//       />
//       {/* Second Image */}
//       <Animated.Image
//         source={require("../../../assets/Ordernowpaylater2.png")}
//         style={[styles.image, { opacity: opacity2 }]}
//       />
//     </View>
//   );
// };

// const InstructionsCard = () => (
//   <View style={styles.container}>
//     <ImageLoader />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   image: {
//     width: 380,
//     height: 110,
//     borderRadius: 15,
//     alignSelf: "center",
//     position: "absolute", // Stack images on top of each other
//   },
// });

// export default InstructionsCard;
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Animated } from "react-native";

// const ImageLoader = () => {
//   // Initialize opacity for two images
//   const opacity1 = useState(new Animated.Value(1))[0]; // First image visible
//   const opacity2 = useState(new Animated.Value(0))[0]; // Second image hidden

//   // Function to switch between images with fade effect
//   const switchImage = () => {
//     // First image fades out and second fades in
//     Animated.timing(opacity1, {
//       toValue: 0, // Fade out the first image
//       duration: 2000,
//       useNativeDriver: true,
//     }).start();

//     Animated.timing(opacity2, {
//       toValue: 1, // Fade in the second image
//       duration: 2000,
//       useNativeDriver: true,
//     }).start();
//   };

//   // Reset the images (fade out second and fade in the first)
//   const resetImages = () => {
//     Animated.timing(opacity2, {
//       toValue: 0, // Fade out the second image
//       duration: 2000,
//       useNativeDriver: true,
//     }).start();

//     Animated.timing(opacity1, {
//       toValue: 1, // Fade in the first image
//       duration: 2000,
//       useNativeDriver: true,
//     }).start();
//   };

//   useEffect(() => {
//     // Start image switching every 4 seconds to cycle through both images
//     const imageSwitchInterval = setInterval(() => {
//       switchImage();
//       setTimeout(resetImages, 2000); // Reset after 2 seconds (fade-out time)
//     }, 4000);

//     // Clear the interval when the component is unmounted to prevent memory leaks
//     return () => clearInterval(imageSwitchInterval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* First Image */}
//       <Animated.Image
//         source={require("../../../assets/Ordernowpaylater.png")}
//         style={[styles.image, { opacity: opacity1 }]}
//       />
//       {/* Second Image */}
//       <Animated.Image
//         source={require("../../../assets/Ordernowpaylater2.png")}
//         style={[styles.image, { opacity: opacity2 }]}
//       />
//     </View>
//   );
// };

// const InstructionsCard = () => (
//   <View style={styles.container}>
//     <ImageLoader />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   image: {
//     width: 380,
//     height: 110,
//     borderRadius: 15,
//     alignSelf: "center",
//     position: "absolute", // Stack images on top of each other
//   },
// });

// export default InstructionsCard;
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Animated } from "react-native";

// const ImageLoader = () => {
//   // Initialize opacity for two images
//   const opacity1 = useState(new Animated.Value(1))[0]; // First image visible
//   const opacity2 = useState(new Animated.Value(0))[0]; // Second image hidden

//   // Function to switch between images with fade effect
//   const switchImage = () => {
//     // Fade out the first image and fade in the second image at the same time
//     Animated.parallel([
//       Animated.timing(opacity1, {
//         toValue: 0, // Fade out the first image
//         duration: 4000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(opacity2, {
//         toValue: 1, // Fade in the second image
//         duration: 4000,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       // Once the second image is fully visible, fade out the second image and fade in the first image again
//       Animated.parallel([
//         Animated.timing(opacity2, {
//           toValue: 0, // Fade out the second image
//           duration: 4000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(opacity1, {
//           toValue: 1, // Fade the first image back in
//           duration: 4000,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     });
//   };

//   useEffect(() => {
//     // Start switching images every 4 seconds
//     const imageSwitchInterval = setInterval(switchImage, 4000);

//     // Clear the interval when the component is unmounted to prevent memory leaks
//     return () => clearInterval(imageSwitchInterval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* First Image */}
//       <Animated.Image
//         source={require("../../../assets/Ordernowpaylater.png")}
//         style={[styles.image, { opacity: opacity1 }]}
//       />
//       {/* Second Image */}
//       <Animated.Image
//         source={require("../../../assets/Ordernowpaylater2.png")}
//         style={[styles.image, { opacity: opacity2 }]}
//       />
//     </View>
//   );
// };

// const InstructionsCard = () => (
//   <View style={styles.container}>
//     <ImageLoader />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   image: {
//     width: 380,
//     height: 110,
//     borderRadius: 15,
//     alignSelf: "center",
//     position: "absolute", // Stack images on top of each other
//   },
// });

// export default InstructionsCard;
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Animated } from "react-native";

// const ImageLoader = () => {
//   // Array of images you want to display; add as many as you want here
//   const images = [
//     require("../../../assets/Ordernowpaylater.png"),
//     require("../../../assets/Ordernowpaylater2.png"),
//     // Add more images as required
//   ];

//   // Set initial opacity values for all images
//   const [opacities, setOpacities] = useState(
//     images.map(() => new Animated.Value(0)) // All images initially hidden
//   );

//   const [currentIndex, setCurrentIndex] = useState(0); // Index to track current image

//   // Function to transition between images
//   const switchImage = () => {
//     const nextIndex = (currentIndex + 1) % images.length; // Cycle through the images

//     // Fade out the current image and fade in the next image at the same time
//     Animated.parallel([
//       Animated.timing(opacities[currentIndex], {
//         toValue: 0,
//         duration: 2000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(opacities[nextIndex], {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       setCurrentIndex(nextIndex); // Update the current image index
//     });
//   };

//   useEffect(() => {
//     // Set the interval to switch images every 3 seconds
//     const interval = setInterval(switchImage, 3000);

//     // Cleanup on component unmount
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   return (
//     <View style={styles.container}>
//       {images.map((image, index) => (
//         <Animated.Image
//           key={index}
//           source={image}
//           style={[styles.image, { opacity: opacities[index] }]}
//         />
//       ))}
//     </View>
//   );
// };

// const InstructionsCard = () => (
//   <View style={styles.container}>
//     <ImageLoader />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   image: {
//     width: 380,
//     height: 110,
//     borderRadius: 15,
//     alignSelf: "center",
//     position: "absolute", // Stack images on top of each other
//   },
// });

// export default InstructionsCard;
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

const ImageLoader = () => {
  // Array of images you want to display; add as many as you want here
  const images = [
    require("../../../assets/Ordernowpaylater.png"),
    require("../../../assets/Ordernowpaylater2.png"),
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    width: 380,
    height: 110,
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute", // Stack images on top of each other
  },
});

export default InstructionsCard;
