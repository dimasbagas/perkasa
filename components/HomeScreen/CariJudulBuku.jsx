// import React, { useEffect, useState } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";

// const CariJudulBuku = () => {
//   const { q } = useLocalSearchParams();

//   const [searchTerm, setSearchTerm] = useState(q ?? "");
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const searchBooks = async (term) => {
//     if (!term.trim()) {
//       setBooks([]);
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://www.sankavollerei.com/anime/search/${encodeURIComponent(
//           term
//         )}`
//       );

//       if (!response.ok) {
//         throw new Error("Gagal mengambil data");
//       }

//       const data = await response.json();
//       setBooks(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error searching books:", error);
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // otomatis search saat screen dibuka
//   useEffect(() => {
//     if (q) {
//       searchBooks(q);
//     }
//   }, [q]);

//   const renderBook = ({ item }) => (
//     <View style={styles.bookItem}>
//       <Text style={styles.title}>{item.title ?? "-"}</Text>
//       <Text style={styles.author}>
//         {item.author ? `by ${item.author}` : "Unknown author"}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Cari buku..."
//         value={searchTerm}
//         onChangeText={setSearchTerm}
//         onSubmitEditing={() => searchBooks(searchTerm)}
//         returnKeyType="search"
//       />

//       {loading && <ActivityIndicator size="large" />}

//       <FlatList
//         data={books}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderBook}
//         ListEmptyComponent={
//           !loading && (
//             <Text style={styles.empty}>Tidak ada buku ditemukan</Text>
//           )
//         }
//       />
//     </View>
//   );
// };

// export default CariJudulBuku;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   input: {
//     width: "100%",
//     height: 49,
//     borderColor: "#16994aff",
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 16,
//     borderRadius: 25,
//   },
//   bookItem: {
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   author: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 4,
//   },
//   empty: {
//     textAlign: "center",
//     marginTop: 20,
//     color: "#999",
//   },
// });
