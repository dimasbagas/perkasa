import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FirstScreen = () => {
  const router = useRouter();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const logoReveal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(logoReveal, {
        toValue: 300,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/(user)/Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.wrapper,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        {/* 1️⃣ LOGO REVEAL */}
        <Animated.View style={[styles.logoReveal, { width: logoReveal }]}>
          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/images/uim.png')} />
            <Image source={require('../../assets/images/pemda.png')} />
          </View>
        </Animated.View>

        {/* 2️⃣ MONUMEN */}
        <View style={styles.monumenWrapper}>
          <Image
            source={require('../../assets/images/monumen.png')}
            style={styles.monumen}
            resizeMode="contain"
          />
        </View>

        {/* 3️⃣ TITLE */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>PERPUSDA M.TAMBRANI</Text>
          <Text style={styles.subtitle}>PAMEKASAN</Text>
        </View>

        {/* 4️⃣ FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Support by: Fakultas Teknik Universitas Islam Madura
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default FirstScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
  },

  wrapper: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingVertical: 40,
  },

  /* LOGO */
  logoReveal: {
    overflow: 'hidden',
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    width: 300,
  },
  
  /* MONUMEN */
  monumenWrapper: {
    alignItems: 'center',
    marginBottom: '1',
    marginTop: 100
  },
  monumen: {
    width: 120,
    height: 220,
  },

  /* TITLE */
  titleWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#0F612F',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F612F',
    marginBottom: 150
  },

  /* FOOTER */
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#000',
    opacity: 0.7,

  },
});
