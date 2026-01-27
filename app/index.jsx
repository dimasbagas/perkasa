import { Redirect } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export default function Index() {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) return null;

  return isSignedIn
    ? <Redirect href="/(user)/HomePage" />
    : <Redirect href="/(user)/FirstScreen" />;
}
