import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const API_KEY = "AIzaSyAdkiRhqRdPGg4jym8ZrzzUhoHk33aBxZI";

const PencarianBuku = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (text) => {
    setQuery(text);

    if (text.length < 3) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          text
        )}&maxResults=20&key=${API_KEY}`
      );
      const json = await res.json();

      const mapped =
        json.items?.map((item) => mapGoogleBook(item)) || [];

      setResults(mapped);
    } catch (e) {
      console.log(e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
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
  );

  return (
    <View style={styles.container}>
      {/* INPUT SEARCH */}
      <TextInput
        placeholder="Cari judul atau penulis buku..."
        value={query}
        onChangeText={searchBooks}
        style={styles.searchInput}
        autoFocus
      />

      {loading && <Text style={styles.info}>Mencari...</Text>}
      {!loading && query.length > 2 && results.length === 0 && (
        <Text style={styles.info}>Buku tidak ditemukan</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PencarianBuku;

/* ===== MAPPER ===== */
const mapGoogleBook = (item) => ({
  id: item.id,
  title: item.volumeInfo.title,
  author: item.volumeInfo.authors?.join(", ") ?? "-",
  cover:
    item.volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") ??
    "https://via.placeholder.com/150x220?text=No+Cover",
});

/* ===== STYLE ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  searchInput: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#f1f1f1",
  },
  info: {
    textAlign: "center",
    marginVertical: 8,
    color: "#666",
  },
  list: {
    paddingHorizontal: 16,
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
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  author: {
    fontSize: 12,
    color: "#666",
  },
});
