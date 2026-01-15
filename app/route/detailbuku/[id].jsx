import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";
import { API } from "../../../utils/api";

export default function DetailBuku() {
  const { id } = useLocalSearchParams(); // ambil ID dari route
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const res = await fetch(API.biblioDetail(id));
        const json = await res.json();

        setBook({
          title: json.title || "-",
          author: json.authors || "-",
          description: json.notes || "Tidak ada deskripsi",
          cover: json.image ? `http://opac.pamekasankab.go.id:8000/images/${json.image}` : "https://via.placeholder.com/150x220?text=No+Cover",
          edition: json.edition || "-",
          isbn: json.isbn_issn || "-",
          publisher: json.publisher?.publisher_name || json.publisher || "-",
          year: json.publish_year || "-",
          collation: json.collation || "-",
          series: json.series_title || "-",
          callNumber: json.call_number || "-",
          language: json.language?.language_name || json.language || "-",
          classification: json.classification || "-",
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {book?.cover && (
        <Image source={{ uri: book.cover }} style={styles.cover} />
      )}
      <Text style={styles.title}>{book?.title}</Text>
      <Text style={styles.author}>{book?.author}</Text>

      <Text style={styles.section}>Deskripsi</Text>
      <Text style={styles.desc}>{book?.description}</Text>

      <Text style={styles.section}>Edisi</Text>
      <Text style={styles.info}>{book?.edition}</Text>

      <Text style={styles.section}>ISBN/ISSN</Text>
      <Text style={styles.info}>{book?.isbn}</Text>

      <Text style={styles.section}>Penerbit</Text>
      <Text style={styles.info}>{book?.publisher}</Text>

      <Text style={styles.section}>Tahun Terbit</Text>
      <Text style={styles.info}>{book?.year}</Text>

      <Text style={styles.section}>Kolasi</Text>
      <Text style={styles.info}>{book?.collation}</Text>

      <Text style={styles.section}>Seri</Text>
      <Text style={styles.info}>{book?.series}</Text>

      <Text style={styles.section}>Nomor Panggil</Text>
      <Text style={styles.info}>{book?.callNumber}</Text>

      <Text style={styles.section}>Bahasa</Text>
      <Text style={styles.info}>{book?.language}</Text>

      <Text style={styles.section}>Klasifikasi</Text>
      <Text style={styles.info}>{book?.classification}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  cover: {
    width: 150,
    height: 220,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 12,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  author: { fontSize: 14, color: "#666", marginVertical: 10 },
  desc: { fontSize: 14, textAlign: "justify" },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    marginBottom: 8,
  },
});