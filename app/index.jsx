// import { Redirect } from "expo-router";
// import { useAuth } from "../hooks/useAuth";

// export default function Index() {
//   const { isSignedIn, isLoading } = useAuth();

//   if (isLoading) return null;

//   return isSignedIn
//     ? <Redirect href="/(user)/HomePage" />
//     : <Redirect href="/(user)/FirstScreen" />;
// }

// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(user)/FirstScreen" />;
}