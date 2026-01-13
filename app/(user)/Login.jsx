import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,

} from "react-native";
import tanjung from "../../assets/images/tanjung.png";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      console.log(
        "Attempting login with NIK:",
        username,
        "Password:",
        password
      );
      const response = await fetch(
        "https://multispeed-formulaically-taunya.ngrok-free.dev/auth/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        const token = data.access_token || data.token;
        if (token) {
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("username", username);

          try {
            const memberResponse = await fetch(
              "https://multispeed-formulaically-taunya.ngrok-free.dev/auth/users/",
              {
                method: "GET",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("Member API response status:", memberResponse.status);
            const memberData = await memberResponse.json();
            console.log("Member API response JSON:", memberData);

            const currentUser = memberData.find(
              (m) => String(m.username) === String(username)
            );

            if (currentUser?.realname) {
              await AsyncStorage.setItem("realname", currentUser.realname);
              console.log("Stored realname:", currentUser.realname);
            } else {
              console.warn("Nama user tidak ditemukan dalam response");
            }
          } catch (error) {
            console.log("Error fetching member data:", error);
          }
        }

        Alert.alert("Success", "Login successful");
        router.push("/(page)/HomePage");
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      console.log("Network error:", error);
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <View style={style.containerContent}>
      <View style={{ justifyContent: "flex-start", width: "100%" }}>
        <View style={style.titleContainer}>
          <ImageBackground
            style={style.ImageBackground}
            source={tanjung}
            resizeMode="cover"
          ></ImageBackground>
          <Text style={style.title}>Welcome</Text>
          <Text style={{ marginLeft: 20, color: "#ffffffff", fontSize: 16 }}>
           Sign your account
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, gap: 10 }}>
        <View style={{ marginTop: 90 }}>
          <Text style={{ fontSize: 15, color: "#0F612F", right: -20 }}>
            NIK
          </Text>
          <TextInput
            placeholder="Masukkan NIK"
            value={username}
            onChangeText={setUsername}
            style={style.textInput}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, color: "#0F612F", right: -20 }}>
            Password
          </Text>
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={style.textInput}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={style.icons}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#0F612F"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => router.push("/user/LupaSandiScreen")}
          >
            <Text style={{ color: "#0F612F" }}>Lupa Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={style.button} onPress={handleLogin}>
            <Text
              style={{ color: "#f0f0f0", fontSize: 20, fontWeight: "bold" }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const style = StyleSheet.create({
  containerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffffff0",
  },
  titleContainer: {
    backgroundColor: "#0F612F",
    height: 328,
    width: "100%",
    borderBottomRightRadius: 100,
    justifyContent: "center",
    elevation: 10,
    overflow: "hidden",
  },
  title: {
    color: "#ffffffff",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
  },
  textInput: {
    height: 56,
    width: 330,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: "#0F612F",
    placeholderTextColor: "#0F612F",
  },
  button: {
    backgroundColor: "#0F612F",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
    width: 200,
  },
  icons: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  ImageBackground: {
    width: "460",
    height: "280",
    position: "absolute",
    top: -10,
    left: 190,
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "flex-start",
    opacity: 0.7,
  },
});