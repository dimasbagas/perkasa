import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TambahWaktuPeminjaman = () => {
  const { id } = useLocalSearchParams(); // id_peminjaman
  const router = useRouter();

  // default 4 minggu (1 bulan)
  const [selectedWeek, setSelectedWeek] = useState(4);

  const options = [
    { label: "Satu Minggu", value: 1 },
    { label: "Dua Minggu", value: 2 },
    { label: "Tiga Minggu", value: 3 },
    { label: "Empat Minggu", value: 4 },
  ];

  /* =========================
     SIMULASI SUBMIT
     ========================= */
  const submitExtension = async () => {
    try {
      // ⛔ FE HANYA REQUEST
      const payload = {
        id_peminjaman: id,
        tambah_minggu: selectedWeek,
      };

      console.log("REQUEST PERPANJANG:", payload);

      // MOCK DELAY
      setTimeout(() => {
        Alert.alert(
          "Berhasil",
          `Peminjaman diperpanjang ${selectedWeek} minggu`,
          [
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ]
        );
      }, 800);
    } catch (_error) {
      Alert.alert("Gagal", "Terjadi kesalahan");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Waktu Peminjaman</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {options.map((item) => {
          const active = selectedWeek === item.value;
          return (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.option,
                active && styles.optionActive,
              ]}
              onPress={() => setSelectedWeek(item.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  active && styles.optionTextActive,
                ]}
              >
                {item.value}. {item.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={active ? "#fff" : "#0F612F"}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* SUBMIT */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={submitExtension}
      >
        <Text style={styles.submitText}>Konfirmasi Perpanjangan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TambahWaktuPeminjaman;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */
  header: {
    backgroundColor: "#0F612F",
    height: 160,
    borderBottomRightRadius: 100,
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
  },

  /* CONTENT */
  content: {
    padding: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#0F612F",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  optionActive: {
    backgroundColor: "#0F612F",
  },
  optionText: {
    fontSize: 16,
    color: "#0F612F",
    fontWeight: "500",
  },
  optionTextActive: {
    color: "#fff",
  },

  /* SUBMIT */
  submitBtn: {
    marginHorizontal: 20,
    marginTop: "auto",
    marginBottom: 30,
    backgroundColor: "#0F612F",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
