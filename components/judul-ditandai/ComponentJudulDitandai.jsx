import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const STORAGE_KEY = "saved_books";
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

const ComponentJudulDitandai = () => {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================
  // FETCH DATA GOOGLE BOOKS
  // =====================
  const fetchSavedBooks = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const ids = data ? JSON.parse(data) : [];

      // ⛔ jika kosong / bukan array
      if (!Array.isArray(ids) || ids.length === 0) {
        setBooks([]);
        return;
      }

      const results = [];

      for (const rawId of ids) {
        try {
          const id = String(rawId); // 🔒 paksa string

          const res = await fetch(`${GOOGLE_BOOKS_API}/${id}`);
          if (!res.ok) continue;

          const json = await res.json();
          if (!json?.id) continue;

          const info = json.volumeInfo ?? {};

          results.push({
            id: String(json.id),
            title: info.title ?? "-",
            author: info.authors?.join(", ") ?? "-",
            cover:
              info.imageLinks?.thumbnail?.replace(
                "http://",
                "https://"
              ) ??
              "https://placehold.co/150x220?text=No+Cover",
          });
        } catch {
          continue;
        }
      }

      setBooks(results);
    } catch (e) {
      console.log("Error load saved books:", e);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchSavedBooks();
    }, [])
  );

  // =====================
  // HAPUS BUKU
  // =====================
  const removeBook = async (rawId) => {
    const id = String(rawId);

    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const ids = data ? JSON.parse(data) : [];

    const newIds = ids.filter((x) => String(x) !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));

    setBooks((prev) =>
      prev.filter((b) => String(b.id) !== id)
    );
  };

  const confirmRemove = (id, title) => {
    Alert.alert(
      "Hapus Buku",
      `Hapus "${title}" dari Judul Ditandai?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => removeBook(id),
        },
      ]
    );
  };

  // =====================
  // DATA + DUMMY (BIAR GRID TIDAK MENGECIL)
  // =====================
  const dataWithDummy =
    books.length === 1
      ? [...books, { id: "__dummy__" }]
      : books;

  // =====================
  // RENDER ITEM
  // =====================
  const renderItem = ({ item }) => {
    if (item.id === "__dummy__") {
      return <View style={styles.dummy} />;
    }

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => confirmRemove(item.id, item.title)}
        >
          <Ionicons name="close-circle" size={22} color="#e53935" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/DetailBuku",
              params: { id: item.id },
            })
          }
        >
          <Image source={{ uri: item.cover }} style={styles.cover} />

          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.author} numberOfLines={1}>
            {item.author}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return <Text style={{ textAlign: "center" }}>Loading...</Text>;
  }

  if (books.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>Belum ada buku yang ditandai</Text>
      </View>
    );
  }

  // =====================
  // FLATLIST
  // =====================
  return (
    <FlatList
      data={dataWithDummy}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ComponentJudulDitandai;

/* =========================
   STYLE
   ========================= */
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
  },
  dummy: {
    width: "48%", // ⬅️ pengisi kolom kanan (ANTI MENGECIL)
  },
  cover: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 14,
    backgroundColor: "#e0e0e0",
  },
  removeBtn: {
    position: "absolute",
    top: -8,
    right: -8,
    zIndex: 10,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  author: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  empty: {
    marginTop: 60,
    alignItems: "center",
  },
});
