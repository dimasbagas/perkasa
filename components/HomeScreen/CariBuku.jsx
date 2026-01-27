import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CariBuku = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push("/(user)/PencarianBuku")
      }
    >
      <View style={styles.container} pointerEvents="none">
        <Ionicons name="search" size={20} color="#16994aff" />

        <TextInput
          style={styles.input}
          placeholder="Cari buku..."
          editable={false}  
        />
      </View>
    </TouchableOpacity>
  );
};

export default CariBuku;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: width * 0.9,
    height: 49,
    borderColor: "#16994aff",
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
});
