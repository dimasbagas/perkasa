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

const API_KEY = "AIzaSyAdkiRhqRdPGg4jym8ZrzzUhoHk33aBxZI";
const STORAGE_KEY = "saved_books";

const ComponentJudulDitandai = () => {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedBooks = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const ids = data ? JSON.parse(data) : [];

      if (ids.length === 0) {
        setBooks([]);
        return;
      }

      const results = [];

      for (const id of ids) {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
        );
        const json = await res.json();

        results.push({
          id: json.id,
          title: json.volumeInfo.title,
          author: json.volumeInfo.authors?.join(", ") ?? "-",
          cover: json.volumeInfo.imageLinks?.thumbnail
            ?.replace("http://", "https://"),
        });
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

    //  HAPUS BUKU DARI DITANDAI
  const removeBook = async (id) => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      let ids = data ? JSON.parse(data) : [];

      ids = ids.filter((x) => x !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));

      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (e) {
      console.log("Error remove book:", e);
    }
  };

  const confirmRemove = (id, title) => {
    Alert.alert(
      "Hapus Buku",
      `Hapus "${title}" dari Judul Ditandai?`,
      [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: () => removeBook(id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* ICON HAPUS */}
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => confirmRemove(item.id, item.title)}
      >
        <Ionicons name="close-circle" size={22} color="#e53935" />
      </TouchableOpacity>

      {/* KE DETAIL */}
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

  return (
    <FlatList
      data={books}
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
