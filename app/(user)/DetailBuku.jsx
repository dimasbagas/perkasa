import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const API_KEY = "AIzaSyAdkiRhqRdPGg4jym8ZrzzUhoHk33aBxZI";
const STORAGE_KEY = "saved_books";

const DetailBuku = () => {
  const params = useLocalSearchParams();

  // 🔐 NORMALISASI ID (INI KUNCI)
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const bookId = rawId ? String(rawId) : null;

  const [book, setBook] = useState(null);
  const [saved, setSaved] = useState(false);

  /* =========================
     FETCH DETAIL BUKU
     ========================= */
  const fetchDetail = useCallback(async () => {
    if (!bookId) return;
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`,
      );
      const json = await res.json();
      setBook(mapGoogleBook(json));
    } catch (error) {
      console.log("Error fetch detail:", error);
    }
  }, [bookId]);

  /* =========================
     CEK STATUS TERSIMPAN
     ========================= */
  const checkSaved = useCallback(async () => {
    if (!bookId) return;
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const ids = Array.isArray(JSON.parse(data))
        ? JSON.parse(data).filter((x) => typeof x === "string")
        : [];

      // console.log(`[DetailBuku] Checking ID: ${bookId}, Saved IDs:`, ids);
      const isSaved = ids.includes(bookId);
      setSaved(isSaved);
    } catch (error) {
      console.log("Error check saved:", error);
      setSaved(false);
    }
  }, [bookId]);

  /* =========================
     EFFECT
     ========================= */
  useEffect(() => {
    if (!bookId) return;
    fetchDetail();
    checkSaved();
  }, [fetchDetail, checkSaved, bookId]);

  /* =========================
     SIMPAN / HAPUS FAVORIT
     ========================= */
  const toggleSave = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      let ids = data ? JSON.parse(data) : [];

      // 🔒 PAKSA ARRAY STRING
      ids = Array.isArray(ids) ? ids.filter((x) => typeof x === "string") : [];

      if (ids.includes(bookId)) {
        ids = ids.filter((x) => x !== bookId);
        setSaved(false);
      } else {
        ids.push(bookId);
        setSaved(true);
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
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
    item.volumeInfo?.imageLinks?.thumbnail?.replace("http://", "https://") ??
    "https://via.placeholder.com/150x220?text=No+Cover",
  description: item.volumeInfo?.description ?? "Tidak ada deskripsi",
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
