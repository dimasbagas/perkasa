import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CariJudulBuku = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (term) => {
    if (!term.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.example.com/books/search?q=${encodeURIComponent(term)}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error searching books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const renderBook = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>by {item.author}</Text>
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
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBook}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    width: '100%',
    height: 49,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 20,
    paddingLeft: 20,
  },
  list: {
    flex: 1,
  },
  bookItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
});

export default CariJudulBuku;