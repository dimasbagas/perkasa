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
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <ImageBackground source={tanjung} style={styles.bg} />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign your account</Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.label}>NIK</Text>
        <TextInput
          placeholder="Masukkan NIK"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <View style={{ position: "relative" }}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.eye}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#0F612F"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/user/LupaSandiScreen")}
          style={{ alignSelf: "flex-end", marginBottom: 20 }}
        >
          <Text style={{ color: "#0F612F" }}>Lupa Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#0F612F",
    height: 320,
    justifyContent: "center",
    borderBottomRightRadius: 100,
    overflow: "hidden",
  },
  bg: {
    position: "absolute",
    width: 460,
    height: 280,
    top: -10,
    left: 190,
    opacity: 0.7,
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 20,
  },
  form: {
    padding: 20,
    marginTop: 40,
  },
  label: {
    color: "#0F612F",
    marginBottom: 6,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#0F612F",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 16,
  },
  eye: {
    position: "absolute",
    right: 15,
    top: 16,
  },
  button: {
    backgroundColor: "#0F612F",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
