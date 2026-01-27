import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

const FirstScreen = () => {
  const router = useRouter();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/(page)/HomePage");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageWrapper,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
      <View style={{ display: 'flex', flexDirection: 'row', width: 300, marginBottom: 20, justifyContent: 'center', top: -80, gap: 20 }}>
        <Image source={require("../../assets/images/uim.png")}/>
        <Image source={require("../../assets/images/pemda.png")}/>
      </View>
        <Image
          source={require("../../assets/images/monumen.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.label}>PERPUSDA M.TAMBRANI</Text>
        <Text style={styles.label}>PAMEKASAN</Text>
        <View style={{ position: 'absolute', bottom: -70,  }}>
          <Text style={{color: "#0F612F",}}>Suport by: Fakultas Teknik Univertas Islamm Madura</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 320,
    height: 500,
  },
  label: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#0F612F",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
