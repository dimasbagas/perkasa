import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';

const ComponentSejarahPeminjaman = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('https://multispeed-formulaically-taunya.ngrok-free.dev/api/biblio/');
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching loan history:', error);
      setHistory([]);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>Judul: {item.title}</Text>
      <Text style={styles.historyText}>ISBN/ISSN: {item.isbn_issn}</Text>
      <Text style={styles.historyText}>Tahun Terbit: {item.publish_year}</Text>
      <Text style={styles.historyText}>Jumlah Halaman: {item.collation}</Text>
      <Text style={styles.historyText}>Catatan: {item.notes}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sejarah Peminjaman</Text>
      </View>
      <View style={styles.countContainer}>
        <Text>{history.length} buku ditemukan</Text>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

export default ComponentSejarahPeminjaman;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  titleContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F612F",
  },
  countContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    marginBottom: 4,
  },
});