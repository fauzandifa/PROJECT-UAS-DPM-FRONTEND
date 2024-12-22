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
      // Ball falling animation
      Animated.timing(ballY, {
        toValue: height / 2 - 30, // Adjusted to align with text
        duration: 1000,
        useNativeDriver: true,
      }),
      // Small bounce
      Animated.timing(ballY, {
        toValue: height / 2 - 40,
        duration: 300,
        useNativeDriver: true,
      }),
      // Final position
      Animated.timing(ballY, {
        toValue: height / 2 - 30,
        duration: 200,
        useNativeDriver: true,
      }),
      // Transform ball to letter T
      Animated.parallel([
        Animated.timing(ballOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(letterTOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // Reveal "iketKu"
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
      }, 1000);
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Animated ball that transforms into T */}
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
              },
            ]}
          />
          <Animated.Text
            style={[
              styles.letterT,
              {
                opacity: letterTOpacity,
                transform: [{ translateY: ballY }],
              },
            ]}>
            T
          </Animated.Text>
          
          {/* Animated iketKu text */}
          <Animated.Text
            style={[
              styles.additionalText,
              {
                transform: [
                  { translateY: ballY },
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
    width: 20,
    height: 20,
    backgroundColor: '#1e90ff',
    borderRadius: 10,
  },
  letterT: {
    fontSize: 48,
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  additionalText: {
    fontSize: 48,
    color: '#1e90ff',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  subtitle: {
    position: 'absolute',
    bottom: 100,
    fontSize: 16,
    color: '#666',
  },
});

export default SplashScreen;