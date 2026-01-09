import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Otp = () => {
  const router = useRouter();

  const [step, setStep] = useState("email"); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async () => {
    if (!email) {
      Alert.alert("Error", "Email wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://9dec003548aa.ngrok-free.app/auth/request-reset/",
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

      Alert.alert("Berhasil", "OTP telah dikirim ke email");
      setStep("otp"); 
    } catch (_error) {
      Alert.alert("Error", "Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // STEP 2 — VERIFIKASI OTP
  // ============================
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "OTP harus 6 digit");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://9dec003548aa.ngrok-free.app/auth/verify-token/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            token: otp,
          }),
        }
      );

      if (!response.ok) {
        Alert.alert("Error", "OTP salah atau kadaluarsa");
        return;
      }

      Alert.alert("Berhasil", "OTP berhasil diverifikasi");

      // ➜ LANJUT KE RESET PASSWORD
      router.replace("/user/LupaSandiScreen");
    } catch (_error) {
      Alert.alert("Error", "Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ORNAMEN ATAS */}
      <Image
        source={require("../../assets/images/tanjung2.png")}
        style={styles.ornamentTop}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Verifikasi OTP</Text>

        {/* EMAIL (SELALU DI ATAS) */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={step === "email"}
        />

        {/* OTP MUNCUL SETELAH EMAIL VALID */}
        {step === "otp" && (
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
            secureTextEntry
            placeholder="******"
          />
        )}

        <View style={{ alignItems: "center" }}>
          {step === "email" ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleVerifyEmail}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Mengirim..." : "Kirim OTP"}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleVerifyOtp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Memverifikasi..." : "Verifikasi"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ORNAMEN BAWAH */}
      <Image
        source={require("../../assets/images/tanjung2.png")}
        style={styles.ornamentBottom}
      />
    </View>
  );
};

export default Otp;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffffff0",
    justifyContent: "center",
    alignItems: "center",
  },

  ornamentTop: {
    position: "absolute",
    top: -60,
    width: 500,
    height: 300,
    opacity: 0.6,
  },

  ornamentBottom: {
    position: "absolute",
    bottom: -60,
    width: 500,
    height: 300,
    transform: [{ rotate: "180deg" }],
  },

  title: {
    fontSize: 20,
    color: "#6B5CF6",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
  },

  input: {
    // width: "70%",
    height: 50,
    borderWidth: 1.5,
    borderColor: "#6B5CF6",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#6B5CF6",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
    width: 167,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    elevation: 11,
  },
});
