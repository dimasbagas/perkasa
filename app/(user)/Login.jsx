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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import tanjung from "../../assets/images/tanjung.png";
import { API } from "../../utils/api";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "NIK dan Password wajib diisi");
      return;
    }

    setLoading(true);

    try {
      console.log("LOGIN URL:", API.login);

      const response = await fetch(API.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        Alert.alert("Error", data.message || "Login gagal");
        return;
      }

      const token = data.access_token || data.token;
      if (!token) {
        Alert.alert("Error", "Token tidak ditemukan");
        return;
      }

      // SIMPAN SESSION
      await AsyncStorage.multiSet([
        ["token", token],
        ["username", username],
      ]);

      // AMBIL DATA USER
      try {
        const userRes = await fetch(API.users, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (userRes.ok) {
          const users = await userRes.json();
          const currentUser = users.find(
            (u) => String(u.username) === String(username)
          );

          if (currentUser?.realname) {
            await AsyncStorage.setItem("realname", currentUser.realname);
          }
        }
      } catch (err) {
        console.log("Fetch user error:", err);
      }

      Alert.alert("Success", "Login berhasil");
      router.replace("/(page)/HomePage");
    } catch (error) {
      console.log("NETWORK ERROR:", error);
      Alert.alert("Error", "Koneksi ke server gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={style.containerContent}>
          {/* ===== HEADER ===== */}
          <View style={{ width: "100%" }}>
            <View style={style.titleContainer}>
              <ImageBackground
                style={style.ImageBackground}
                source={tanjung}
                resizeMode="cover"
              />
              <Text style={style.title}>Welcome</Text>
              <Text style={style.subtitle}>Sign your account</Text>
            </View>
          </View>

          {/* ===== FORM ===== */}
          <View style={style.formContainer}>
            <View>
              <Text style={style.label}>NIK</Text>
              <TextInput
                placeholder="Masukkan NIK"
                value={username}
                onChangeText={setUsername}
                style={style.textInput}
              />
            </View>

            <View>
              <Text style={style.label}>Password</Text>
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

            <TouchableOpacity style={style.button} onPress={handleLogin}>
              <Text style={style.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const style = StyleSheet.create({
  containerContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffff0",
  },
  titleContainer: {
    backgroundColor: "#01931aff",
    height: 320,
    width: "100%",
    borderBottomRightRadius: 100,
    justifyContent: "center",
    paddingLeft: 20,
    overflow: "hidden",
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
  },
  formContainer: {
    marginTop: 40,
    gap: 16,
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    color: "#0F612F",
    marginBottom: 4,
    marginLeft: 5,
  },
  textInput: {
    height: 56,
    width: 330,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: "#01931aff",
  },
  button: {
    backgroundColor: "#01931aff",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
    width: 200,
  },
  buttonText: {
    color: "#f0f0f0",
    fontSize: 20,
    fontWeight: "bold",
  },
  icons: {
    position: "absolute",
    right: 20,
    top: 16,
  },
  ImageBackground: {
    width: 260,
    height: 260,
    position: "absolute",
    right: -40,
    top: -20,
    opacity: 0.7,
  },
});
