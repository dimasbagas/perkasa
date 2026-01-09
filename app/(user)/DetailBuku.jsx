import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const API_KEY = "AIzaSyAdkiRhqRdPGg4jym8ZrzzUhoHk33aBxZI";

const DetailBuku = () => {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchDetail();
    checkSaved();
  }, []);

  const fetchDetail = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
      );
      const json = await res.json();

      const mappedBook = mapGoogleBook(json);
      setBook(mappedBook);
    } catch (e) {
      console.log(e);
    }
  };

  const mapGoogleBook = (item) => ({
  id: item.id,
  title: item.volumeInfo.title,
  author: item.volumeInfo.authors?.join(", ") ?? "-",
  cover: item.volumeInfo.imageLinks?.thumbnail
    ?.replace("http://", "https://"),
  description: item.volumeInfo.description ?? "Tidak ada deskripsi",
  rating: item.volumeInfo.averageRating ?? null,
  pages: item.volumeInfo.pageCount ?? null,
});

  /* =========================
     CEK BUKU TERSIMPAN
     ========================= */
  const checkSaved = async () => {
    const data = await AsyncStorage.getItem("saved_books");
    const ids = data ? JSON.parse(data) : [];
    setSaved(ids.includes(id));
  };

  /* =========================
     SIMPAN / HAPUS FAVORIT
     ========================= */
  const toggleSave = async () => {
    const data = await AsyncStorage.getItem("saved_books");
    let ids = data ? JSON.parse(data) : [];

    if (ids.includes(id)) {
      ids = ids.filter((x) => x !== id);
      setSaved(false);
    } else {
      ids.push(id);
      setSaved(true);
    }

    await AsyncStorage.setItem("saved_books", JSON.stringify(ids));
  };

  if (!book) return null;

  return (
    <ScrollView style={styles.container}>
      {/* ICON SIMPAN */}
      <TouchableOpacity style={styles.saveBtn} onPress={toggleSave}>
        <Ionicons
          name={saved ? "bookmark" : "bookmark-outline"}
          size={26}
          color={saved ? "#f5a623" : "#333"}
        />
      </TouchableOpacity>

      {/* COVER */}
      <Image source={{ uri: book.cover }} style={styles.cover} />

      {/* JUDUL */}
      <Text style={styles.title}>{book.title}</Text>

      {/* PENULIS */}
      <Text style={styles.author}>Penulis buku: {book.author}</Text>

      {/* RATING + PAGE */}
      <View style={styles.meta}>
        <Text>⭐ {book.rating ?? "-"}</Text>
        <Text>📘 {book.pages ?? "-"} halaman</Text>
      </View>

      {/* SINOPSIS */}
      <Text style={styles.section}>Synopsis</Text>
      <Text style={styles.desc}>{book.description}</Text>
    </ScrollView>
  );
};

export default DetailBuku;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  saveBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  cover: {
    width: 180,
    height: 260,
    alignSelf: "center",
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    textAlign: "center",
    color: "#666",
    marginVertical: 6,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  section: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 6,
  },
  desc: {
    textAlign: "justify",
    lineHeight: 20,
  },
});
