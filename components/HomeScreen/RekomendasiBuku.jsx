import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const API_KEY = "AIzaSyAdkiRhqRdPGg4jym8ZrzzUhoHk33aBxZI";

const Home = () => {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=40&key=${API_KEY}`
      );
      const json = await response.json();

      const filtered = (json.items || [])
        .filter((item) => item.volumeInfo?.imageLinks?.thumbnail)
        .slice(0, 10);

      setBooks(filtered);
    } catch (error) {
      console.log("Error fetch books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const info = item.volumeInfo;

const imageUrl =
  "http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=...&source=gbs_api"
    .replace("http://", "https://");


    return (
      <TouchableOpacity
        style={styles.bookItem}
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: "/(user)/DetailBuku",
            params: { id: item.id },
          })
        }
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Text style={styles.title} numberOfLines={2}>
          {info.title}
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
