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
  
  // Revised animated values for final transition
  const logoScale = new Animated.Value(1);
  const logoTranslateY = new Animated.Value(0);
  const screenOpacity = new Animated.Value(1);

  useEffect(() => {
    Animated.sequence([
      // Initial animations remain the same
      Animated.timing(ballY, {
        toValue: height / 2 - 200,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(ballY, {
        toValue: height - 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(ballY, {
        toValue: height / 8 - 100,
        duration: 300,
        useNativeDriver: true,
      }),
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
      Animated.timing(additionalTextWidth, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(poweredTextOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Pause before final transition
      new Animated.delay(1000),
      // Final transition animations
      Animated.parallel([
        // Scale down the logo
        Animated.timing(logoScale, {
          toValue: 0.7,
          duration: 500,
          useNativeDriver: true,
        }),
        // Move logo up
        Animated.timing(logoTranslateY, {
          toValue: -200,
          duration: 500,
          useNativeDriver: true,
        }),
        // Fade out the screen
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      navigation.replace('Login');
    });
  }, [navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <View style={styles.contentContainer}>
        <Animated.View style={[
          styles.logoContainer,
          {
            transform: [
              { scale: logoScale },
              { translateY: logoTranslateY }
            ],
          }
        ]}>
          <Animated.View
            style={[
              styles.ball,
              {
                transform: [
                  { translateY: ballY },
                  { scale: ballScale },
                ],
                opacity: ballOpacity,
                left: width / 2 - 100,
              },
            ]}
          />
          
          <View style={styles.textContainer}>
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
        </Animated.View>

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
    </Animated.View>
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
    position: 'relative',
  },
  logoContainer: {
    position: 'relative',
    height: 120,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    paddingHorizontal: 20,
  },
  ball: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#1e90ff',
    borderRadius: 25,
    zIndex: 1,
  },
  letterT: {
    fontSize: 80,
    color: '#1e90ff',
    fontWeight: 'bold',
    lineHeight: 100,
  },
  additionalText: {
    fontSize: 80,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 2,
    lineHeight: 100,
  },
  subtitle: {
    position: 'absolute',
    bottom: height * 0.4,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SplashScreen;