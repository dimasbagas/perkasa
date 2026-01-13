import React, { useEffect, useState, useCallback } from "react";
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

  /* =========================
     FETCH DETAIL BUKU
     ========================= */
  const fetchDetail = useCallback(async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
      );
      const json = await res.json();
      setBook(mapGoogleBook(json));
    } catch (error) {
      console.log("Error fetch detail:", error);
    }
  }, [id]);

  /* =========================
     CEK STATUS TERSIMPAN
     ========================= */
  const checkSaved = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("saved_books");
      const ids = data ? JSON.parse(data) : [];
      setSaved(ids.includes(id));
    } catch (error) {
      console.log("Error check saved:", error);
    }
  }, [id]);

  /* =========================
     EFFECT
     ========================= */
  useEffect(() => {
    fetchDetail();
    checkSaved();
  }, [fetchDetail, checkSaved]);

  /* =========================
     SIMPAN / HAPUS FAVORIT
     ========================= */
  const toggleSave = async () => {
    try {
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
    } catch (error) {
      console.log("Error toggle save:", error);
    }
  };

  if (!book) return null;

  return (
    <ScrollView style={styles.container}>
      {/* ICON SIMPAN */}
      <TouchableOpacity style={styles.saveBtn} onPress={toggleSave}>
        <Ionicons
          name={saved ? "bookmark" : "bookmark-outline"}
          size={38}
          color={saved ? "#F5A623" : "#333"}
        />
      </TouchableOpacity>

      {/* COVER */}
      <Image source={{ uri: book.cover }} style={styles.cover} />

      {/* JUDUL */}
      <Text style={styles.title}>{book.title}</Text>

      {/* PENULIS */}
      <Text style={styles.author}>Penulis: {book.author}</Text>

      {/* META */}
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

/* =========================
   MAPPER GOOGLE BOOKS
   ========================= */
const mapGoogleBook = (item) => ({
  id: item.id,
  title: item.volumeInfo?.title ?? "-",
  author: item.volumeInfo?.authors?.join(", ") ?? "-",
  cover:
    item.volumeInfo?.imageLinks?.thumbnail?.replace(
      "http://",
      "https://"
    ) ??
    "https://via.placeholder.com/150x220?text=No+Cover",
  description:
    item.volumeInfo?.description ?? "Tidak ada deskripsi",
  rating: item.volumeInfo?.averageRating ?? null,
  pages: item.volumeInfo?.pageCount ?? null,
});

/* =========================
   STYLE
   ========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    marginTop: 40,
  },
  saveBtn: {
    position: "absolute",
    top: 1,
    right: 20,
    zIndex: 10,
  },
  cover: {
    width: 180,
    height: 260,
    alignSelf: "center",
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
  },
  author: {
    textAlign: "center",
    color: "#666",
    marginVertical: 6,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 14,
  },
  section: {
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 6,
    fontSize: 16,
  },
  desc: {
    textAlign: "justify",
    lineHeight: 20,
    color: "#333",
  },
});
