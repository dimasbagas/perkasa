import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { API } from "../../utils/api";

const Home = () => {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API.biblioList);
      const data = await response.json();

      const mapped = data.slice(0, 10).map(mapBiblioBook);
      setBooks(mapped);
    } catch (error) {
      console.log("Error fetch books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.bookItem}
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: "/Detailbuku",
            params: { id: item.id },
          })
        }
      >
        <Image
          source={{ uri: item.cover }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading buku...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Home;

const mapBiblioBook = (item) => ({
  id: item.biblio_id,
  title: item.title || "-",
  cover: item.image ? `http://opac.pamekasankab.go.id:8000/images/${item.image}` : "https://via.placeholder.com/150x220?text=No+Cover",
});

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
  },
  list: {
    paddingHorizontal: 16,
  },
  bookItem: {
    width: 120,
    marginRight: 12,
    alignItems: "center",
  },
  cover: {
    width: 120,
    height: 170,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  title: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  loading: {
    padding: 20,
    alignItems: "center",
  },
});
