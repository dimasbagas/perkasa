import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { API } from "../../../utils/api";

const PencarianBuku = () => {
  const router = useRouter();
  const { q } = useLocalSearchParams();

  const [query, setQuery] = useState(q ?? "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  const searchBooks = (text) => {
    setQuery(text);

    if (text.length < 3) {
      setResults([]);
      return;
    }

    const filtered = allBooks.filter(book => book.title && book.title.toLowerCase().includes(text.toLowerCase()));
    setResults(filtered.map(mapBiblioBook));
  };

  // auto search saat datang dari search bar
  useEffect(() => {
    if (q) {
      searchBooks(q);
    }
  }, [q]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await fetch(API.biblioList);
        const data = await res.json();
        setAllBooks(data);
      } catch (e) {
        console.log(e);
        setAllBooks([]);
      }
    };
    fetchAllBooks();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/Detailbuku",
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

const mapBiblioBook = (item) => ({
  id: item.biblio_id,
  title: item.title || "-",
  author: "-",
  cover: "https://via.placeholder.com/150x220?text=No+Cover",
});

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
