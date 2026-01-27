import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const API_KEY = "AIzaSyAdkiRhqRdPGg4jym8ZrzzUhoHk33aBxZI";

const kategoriLabel = {
  matematika: "Matematika",
  novel: "Novel",
  komputer: "Komputer",
  sejarah: "Sejarah",
  hukum: "Hukum",
};

const kategoriQuery = {
  matematika: "mathematics",
  novel: "novel",
  komputer: "computer programming",
  sejarah: "history",
  hukum: "law",
};

const KategoriTemaPage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchByKategori = async () => {
      try {
        setLoading(true);
        const q = kategoriQuery[id];

        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${q}&maxResults=40&key=${API_KEY}`,
        );
        const json = await res.json();

        const data =
          json.items?.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.join(", ") ?? "-",
            cover:
              item.volumeInfo.imageLinks?.thumbnail?.replace(
                "http://",
                "https://",
              ) ?? "https://via.placeholder.com/150x220?text=No+Cover",
          })) || [];

        setBooks(data);
      } catch (e) {
        console.log(e);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchByKategori();
    }
  }, [id]);

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
      <Text style={styles.author}>{item.author}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kategori {kategoriLabel[id]}</Text>

      {loading && <Text style={styles.info}>Memuat buku...</Text>}

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default KategoriTemaPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#305763",
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 50,
  },

  info: {
    textAlign: "center",
    color: "#777",
    marginVertical: 12,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 24,
  },

  card: {
    width: "48%",
  },

  cover: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    backgroundColor: "#e5e5e5",
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
});
