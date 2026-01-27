import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { API } from "../../utils/api";

const PencarianBuku = () => {
  const router = useRouter();
  const { q } = useLocalSearchParams();

  const [query, setQuery] = useState(q ?? "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  /* =========================
     FETCH SEMUA BUKU
     ========================= */
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(API.biblioList);
        const data = await res.json();
        setAllBooks(Array.isArray(data) ? data : []);
      } catch (_e) {
        setAllBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBooks();
  }, []);

  /* =========================
     SEARCH
     ========================= */
  const searchBooks = useCallback(
    (text) => {
      setQuery(text);

      if (text.length < 3) {
        setResults([]);
        return;
      }

      const filtered = allBooks.filter(
        (book) =>
          book.title && book.title.toLowerCase().includes(text.toLowerCase()),
      );

      setResults(filtered.map(mapBiblioBook));
    },
    [allBooks],
  );

  useEffect(() => {
    if (q && allBooks.length > 0) {
      searchBooks(q);
    }
  }, [q, allBooks, searchBooks]);

  /* =========================
     RENDER ITEM
     ========================= */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
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
      {/* HEADER */}
      <Text style={styles.pageTitle}>Pencarian Buku</Text>

      {/* SEARCH BAR */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#666" />
        <TextInput
          placeholder="Cari judul atau penulis buku..."
          value={query}
          onChangeText={searchBooks}
          style={styles.searchInput}
          autoFocus
        />
      </View>

      {/* INFO */}
      {loading && <Text style={styles.info}>Mencari buku...</Text>}
      {!loading && query.length > 2 && results.length === 0 && (
        <Text style={styles.info}>Buku tidak ditemukan</Text>
      )}

      {/* LIST */}
      <FlatList
        data={results}
        keyExtractor={(item, index) =>
          item.id ? String(item.id) : `book-${index}`
        }
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

/* =========================
   MAPPING DATA
   ========================= */
const mapBiblioBook = (item) => ({
  id: item.biblio_id,
  title: item.title || "-",
  author: "-",
  cover: "https://via.placeholder.com/150x220?text=No+Cover",
});

/* =========================
   STYLE – MODERN
   ========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 62,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#f1f1f1",
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },

  info: {
    textAlign: "center",
    marginVertical: 8,
    color: "#666",
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 120,
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
    backgroundColor: "#eaeaea",
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
