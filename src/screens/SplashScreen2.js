
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const SplashScreen2 = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnBoardingScreen'); // Replace 'Home' with your desired screen name
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/animated_logo.mp4')}
        style={styles.video}
        resizeMode="contain"
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#000', // Optional: Set a background color
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen2;