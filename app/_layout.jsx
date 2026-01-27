import { Stack, useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const { isSignedIn, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isSignedIn) {
      router.replace("/(user)/FirstScreen");
    } else { 
      router.replace("/(user)/HomePage");
    }
  }, [isLoading, isSignedIn, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>  
      <Stack.Screen name="(user)" />
      <Stack.Screen name="(page)" />
    </Stack>
  );
}
