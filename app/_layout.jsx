import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

// 1. Tahan Native Splash (Layar Putih) agar tidak auto-hide
// sampai app benar-benar siap
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load fonts jika ada (opsional, tapi disarankan agar text tidak lompat)
  const [loaded] = useFonts({
    // 'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // 2. Jika aset sudah siap, sembunyikan Native Splash
    // Transisi akan langsung masuk ke halaman pertama (FirstScreen)
    if (loaded || true) { // "|| true" hanya fallback jika tidak pakai font
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Set FirstScreen sebagai halaman awal yang muncul */}
      <Stack.Screen name="(user)/FirstScreen" />
      <Stack.Screen name="(user)" />
      <Stack.Screen name="(page)" />
    </Stack>
  );
}