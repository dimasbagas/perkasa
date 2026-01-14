import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CariBuku = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#16994aff" />

      <TextInput
        style={styles.input}
        placeholder="Cari buku..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        returnKeyType="search"
        onSubmitEditing={() => router.push("/page/CariJudulBuku")}
      />
    </View>
  );
};

export default CariBuku;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",      
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: width * 0.9,
    height: 49,
    borderColor: "#16994aff",
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginTop: 50,
  },
  input: {
    flex: 1,            
    marginLeft: 8,
    
  },
});
