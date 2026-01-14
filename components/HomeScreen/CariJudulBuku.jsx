import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const API_URL = "https://www.sankavollerei.com/anime/search/boruto";

const CariJudulBuku = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (term) => {
    if (!term.trim()) {
      setBooks([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(term)}`
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }

      const data = await response.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error searching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const renderBook = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.title}>{item.title ?? "-"}</Text>
      <Text style={styles.author}>
        {item.author ? `by ${item.author}` : "Unknown author"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cari buku..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={() => searchBooks(searchTerm)}
        returnKeyType="search"
      />

      {loading && (
        <ActivityIndicator size="large" color="#5D7BF4" />
      )}

      <FlatList
        data={books}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={renderBook}
        style={styles.list}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.empty}>
              Tidak ada buku ditemukan
            </Text>
          )
        }
      />
    </View>
  );
};

export default CariJudulBuku;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 49,
    borderColor: "#16994aff",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: "#16994aff",
  },
  list: {
    flex: 1,
  },
  bookItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});
