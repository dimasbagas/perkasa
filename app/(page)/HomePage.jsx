import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import CariBuku from "../../components/HomeScreen/CariBuku";
import KategoriTema from "../../components/tema/KategoriTema";

const API_KEY = "5b382f23237d787c6e9c7b368ee29bcf";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function HomePage() {
  const router = useRouter();

  const [bukuFavorit, setBukuFavorit] = useState([]);
  const [novel, setNovel] = useState([]);
  const [selected, setSelected] = useState("matematika");

  const dataKategori = [
    { id: "matematika", name: "Matematika" },
    { id: "novel", name: "Novel" },
    { id: "komputer", name: "Komputer" },
    { id: "sejarah", name: "Sejarah" },
    { id: "hukum", name: "Hukum" },
  ];

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setBukuFavorit(data.results.slice(0, 5));
        setNovel(data.results.slice(5, 10));
      })
      .catch((error) => console.error(error));
  }, []);

  const renderPoster = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/DetailBukuPage",
          params: {
            poster: item.poster_path,
            title: item.title,
            overview: item.overview,
            rating: item.vote_average,
            release: item.release_date,
          },
        })
      }
    >
      <Image
        source={{ uri: IMAGE_BASE_URL + item.poster_path }}
        style={styles.poster}
      />
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* SEARCH */}
        <View style={styles.searchWrapper}>
          <CariBuku />
        </View>

        {/* KATEGORI */}
        <View style={styles.sectionHeader}>
          <KategoriTema
            data={dataKategori}
            selected={selected}
            onSelect={(id) => setSelected(id)}
          />
        </View>

        {/* REKOMENDASI */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rekomendasi Buku</Text>
          <FlatList
            data={bukuFavorit}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderPoster}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        {/* POPULER */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Buku Populer</Text>
          <FlatList
            data={novel}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderPoster}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 120,
  },
  searchWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  sectionHeader: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  card: {
    width: 130,
    marginRight: 15,
  },
  poster: {
    width: 130,
    height: 190,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
    fontWeight: "500",
  },
});