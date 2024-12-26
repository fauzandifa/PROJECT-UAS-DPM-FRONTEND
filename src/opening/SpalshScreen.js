import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const ballY = new Animated.Value(-100);
  const ballScale = new Animated.Value(1);
  const ballOpacity = new Animated.Value(1);
  const letterTOpacity = new Animated.Value(0);
  const additionalTextWidth = new Animated.Value(0);
  const poweredTextOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      // Ball falling to the middle of the screen
      Animated.timing(ballY, {
        toValue: height / 2 - 200, // Mid-screen bounce height
        duration: 1000,
        useNativeDriver: true,
      }),
      // Bounce towards the bottom edge
      Animated.timing(ballY, {
        toValue: height - 100, // Adjusted to stay visible at the bottom
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(ballY, {
        toValue: height / 8 - 100, // Bounce back to middle
        duration: 300,
        useNativeDriver: true,
      }),
      // Ball "explodes" into T with better animation
      Animated.parallel([
        Animated.timing(ballOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(letterTOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(ballScale, {
          toValue: 2,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
      // Expand "iketKu" text
      Animated.timing(additionalTextWidth, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Show "Powered by" text
      Animated.timing(poweredTextOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('Login');
      }, 2000); // 2-second delay before navigating
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Animated ball */}
        <View style={styles.textContainer}>
          <Animated.View
            style={[
              styles.ball,
              {
                transform: [
                  { translateY: ballY },
                  { scale: ballScale },
                ],
                opacity: ballOpacity,
                left: width / 5 - 25, // Adjusted to center the ball
              },
            ]}
          />
          <Animated.Text
            style={[
              styles.letterT,
              {
                opacity: letterTOpacity,
              },
            ]}>
            T
          </Animated.Text>
          <Animated.Text
            style={[
              styles.additionalText,
              {
                transform: [
                  { scaleX: additionalTextWidth },
                ],
                opacity: additionalTextWidth,
              },
            ]}>
            iketKu
          </Animated.Text>
        </View>
        {/* Powered by text */}
        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: poweredTextOpacity,
            },
          ]}>
          Powered by Kelompok 7
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  ball: {
    position: 'absolute',
    width: 50, // Enlarged ball size
    height: 50, // Enlarged ball size
    backgroundColor: '#1e90ff',
    borderRadius: 25, // Rounded for larger ball
  },
  letterT: {
    fontSize: 100,
    color: '#1e90ff',
    fontWeight: 'bold',
    opacity: 100, // Initially hidden
  },
  additionalText: {
    fontSize: 60,
    color: '#000', // Black color for "iketKu"
    fontWeight: 'bold',
    marginLeft: 2,
    transform: [{ scaleX: 0 }], // Initially hidden
  },
  subtitle: {
    position: 'absolute',
    bottom: 280,
    fontSize: 16,
    color: '#666',
  },
});

export default SplashScreen;
