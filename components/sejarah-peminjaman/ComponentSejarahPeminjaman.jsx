import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

const API_KEY = "AIzaSyAdkiRhqRdPGg4jym8ZrzzUhoHk33aBxZI";

const ComponentSejarahPeminjaman = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistoryMock();
  }, []);

  /* =========================
     MOCK SEJARAH PEMINJAMAN
     ========================= */
  const fetchHistoryMock = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=sejarah&maxResults=5&key=${API_KEY}`
      );
      const json = await res.json();

      const mapped =
        json.items?.map((item) => ({
          id: item.id,
          judul: item.volumeInfo.title,
          isbn:
            item.volumeInfo.industryIdentifiers?.[0]?.identifier ??
            "-",
          tahun: item.volumeInfo.publishedDate ?? "-",
          halaman: item.volumeInfo.pageCount ?? "-",
          catatan: "Menceritakan catatan politik",
          penulis:
            item.volumeInfo.authors?.join(", ") ?? "-",
          cover:
            item.volumeInfo.imageLinks?.thumbnail?.replace(
              "http://",
              "https://"
            ) ??
            "https://via.placeholder.com/80x110",
        })) || [];

      setHistory(mapped);
    } catch (error) {
      console.log("Error history mock:", error);
      setHistory([]);
    }
  };

  /* =========================
     RENDER ITEM
     ========================= */
  const renderHistoryItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.cover }} style={styles.cover} />

      <View style={styles.info}>
        <Text style={styles.label}>
          Judul <Text style={styles.value}>: {item.judul}</Text>
        </Text>
        <Text style={styles.label}>
          ISBN/ISSN <Text style={styles.value}>: {item.isbn}</Text>
        </Text>
        <Text style={styles.label}>
          Tahun Terbit <Text style={styles.value}>: {item.tahun}</Text>
        </Text>
        <Text style={styles.label}>
          Jumlah Halaman{" "}
          <Text style={styles.value}>: {item.halaman}</Text>
        </Text>
        <Text style={styles.label}>
          Catatan <Text style={styles.value}>: {item.catatan}</Text>
        </Text>
        <Text style={styles.label}>
          Penulis <Text style={styles.value}>: {item.penulis}</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* COUNTER */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {history.length} Sejarah Peminjaman Eksemplar
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ComponentSejarahPeminjaman;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },

  /* BADGE */
  badge: {
    backgroundColor: "#0F612F",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  /* LIST */
  list: {
    paddingBottom: 100,
  },

  /* CARD */
  card: {
    flexDirection: "row",
    backgroundColor: "#CFF5DD",
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
  },
  cover: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#e0e0e0",
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  value: {
    fontWeight: "400",
    color: "#374151",
  },
});
