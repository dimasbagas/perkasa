import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth"; // Pastikan path import benar

const FirstScreen = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Ambil status login

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // 1. Jalankan Animasi
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

    // 2. Timer Transisi
    const timer = setTimeout(() => {
      // 3. Cek Status Login SETELAH animasi selesai (5 detik)
      if (isSignedIn) {
        router.replace("/(page)/HomePage"); // Ke Home jika sudah login
      } else {
        // Jika belum login, Anda bisa arahkan ke Login Page, 
        // atau tetap di sini jika FirstScreen ini memang halaman landing awal.
        // Contoh: router.replace("/(user)/LoginScreen");
        console.log("User belum login, tetap di landing page");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [router, opacity, scale, isSignedIn]);

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
        <View style={styles.logoContainer}>
          {/* Pastikan path assets benar */}
          <Image source={require("../../assets/images/uim.png")} style={styles.logoSmall} resizeMode="contain"/>
          <Image source={require("../../assets/images/pemda.png")} style={styles.logoSmall} resizeMode="contain"/>
        </View>
        
        <Image
          source={require("../../assets/images/monumen.png")}
          style={styles.image}
          resizeMode="contain"
        />
        
        <Text style={styles.label}>PERPUSDA M.TAMBRANI</Text>
        <Text style={styles.label}>PAMEKASAN</Text>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Suport by: Fakultas Teknik Univertas Islam Madura</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Background putih ini harus sama dengan background di app.json
    // Agar transisi dari native splash tidak terlihat patah
    backgroundColor: "#ffffff", 
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    width: 300, 
    marginBottom: 20, 
    justifyContent: 'center', 
    top: -80, 
    gap: 20 
  },
  logoSmall: {
    width: 60, // Tambahkan ukuran agar gambar muncul
    height: 60,
  },
  image: {
    width: 320,
    height: 350, // Sesuaikan tinggi agar proporsional
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#0F612F",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute', 
    bottom: 30, // Ubah bottom agar tidak terlalu bawah di layar poni (notch)
  },
  footerText: {
    color: "#0F612F",
    fontSize: 12,
  }
});