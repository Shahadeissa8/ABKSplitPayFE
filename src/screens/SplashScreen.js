// import { StyleSheet, View } from "react-native";
// import React, { useEffect } from "react";
// import { Video } from "expo-av";

// const SplashScreen = ({ onFinish }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onFinish(); // Trigger switch to MainNavigation
//     }, 2500); // Adjust to MP4 duration
//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   return (
//     <View>
//       <Video
//         source={require("../../assets/animated_logo.mp4")}
//         style={styles.video}
//         isMuted={true}
//         isLooping={false}
//         resizeMode="cover"
//         shouldPlay
//         onPlaybackStatusUpdate={(status) => {
//           if (status.didJustFinish) {
//             onFinish();
//           }
//         }}
//       />
//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   video: {
//     width: "100%",
//     height: "100%",
//   },
// });
