import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

const ComponentSejarahPeminjaman = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        "http://opac.pamekasankab.go.id:8000/api/biblio/"
      );
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
      setHistory([]);
    }
  };

  /* =========================
     RENDER ITEM
     ========================= */
  const renderHistoryItem = ({ item }) => (
    <View style={styles.card}>
      {/* COVER */}
      <Image
        source={{
          uri:
            item.image ||
            "https://via.placeholder.com/60x90?text=No+Cover",
        }}
        style={styles.cover}
      />

      {/* INFO */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.text}>
          ISBN/ISSN: {item.isbn_issn || "-"}
        </Text>

        <Text style={styles.text}>
          Tahun Terbit: {item.publish_year || "-"}
        </Text>

        <Text style={styles.note} numberOfLines={2}>
          {item.notes || "Tidak ada catatan"}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* JUDUL */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sejarah Peminjaman</Text>
        <Text style={styles.count}>{history.length} buku</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ComponentSejarahPeminjaman;

/* =========================
   STYLE
   ========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#16994aff",
  },
  count: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  list: {
    paddingTop: 12,
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#dbf5ddff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
  },
  cover: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#ddd",
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    color: "#444",
    marginBottom: 2,
  },
  note: {
    fontSize: 11,
    color: "#666",
    marginTop: 6,
    fontStyle: "italic",
  },
});
