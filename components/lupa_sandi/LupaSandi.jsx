import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const LupaSandiScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSendOtp = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Error", "Semua field wajib diisi");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password minimal 8 karakter");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Error", "Password tidak cocok");
      return;
    }

    try {
      const response = await fetch(
        "https://your-api-url.com/auth/request-reset/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        Alert.alert("Error", "Email tidak ditemukan");
        return;
      }

      await AsyncStorage.setItem("resetEmail", email);
      await AsyncStorage.setItem("newPassword", password);

      Alert.alert("Berhasil", "OTP dikirim ke email");
      router.push("/user/Otp?mode=reset");
    } catch {
      Alert.alert("Error", "Terjadi kesalahan jaringan");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/tanjung2.png")}
        style={styles.ornamentTop}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Reset Password</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <Text style={styles.label}>Create Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            secureTextEntry={!showPass}
            style={styles.flexInput}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons
              name={showPass ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#664BD1"
            />
          </TouchableOpacity>
        </View>

        {/* RETYPE */}
        <Text style={styles.label}>Retype Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            secureTextEntry={!showConfirm}
            style={styles.flexInput}
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#664BD1"
            />
          </TouchableOpacity>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../../assets/images/tanjung2.png")}
        style={styles.ornamentBottom}
      />
    </View>
  );
};

export default LupaSandiScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  ornamentTop: {
    position: "absolute",
    top: -40,
    width: "100%",
    height: 220,
    opacity: 0.6,
  },

  ornamentBottom: {
    position: "absolute",
    bottom: -40,
    width: "100%",
    height: 220,
    opacity: 0.6,
    transform: [{ rotate: "180deg" }],
  },

  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    elevation: 11,
  },

  title: {
    fontSize: 35,
    fontWeight: "700",
    color: "#664BD1",
    marginBottom: 30,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    color: "#664BD1",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: "#664BD1",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#664BD1",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  flexInput: {
    flex: 1,
    height: 48,
  },

  button: {
    marginTop: 8,
    backgroundColor: "#664BD1",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    width: 167,
    alignSelf: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
