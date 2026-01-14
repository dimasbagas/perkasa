import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import KategoriTema from "../../components/tema/KategoriTema";
import RekomendasiBuku from "../../components/HomeScreen/RekomendasiBuku";
import BukuPopuler from "../../components/HomeScreen/BukuPopuler";
import CariBuku from "../../components/HomeScreen/CariBuku";

const HomePage = () => {
  const dataKategori = [
    { id: "matematika", name: "Matematika" },
    { id: "novel", name: "Novel" },
    { id: "komputer", name: "Komputer" },
    { id: "sejarah", name: "Sejarah" },
    { id: "hukum", name: "Hukum" },
  ];

  const DATA = [
    { key: "kategori" },
    { key: "rekomendasi" },
    { key: "populer" },
  ];

  const renderItem = ({ item }) => {
    switch (item.key) {
      case "kategori":
        return (
          <View style={{ paddingVertical: 16 }}>
            <KategoriTema data={dataKategori} />
          </View>
        );

      case "rekomendasi":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rekomendasi Buku</Text>
            <RekomendasiBuku />
          </View>
        );

      case "populer":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Buku Populer</Text>
            <BukuPopuler />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* SEARCH — TANPA JARAK ATAS */}
      <CariBuku />

      {/* KONTEN SCROLL */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#305763",
    marginBottom: 10,
  },
});
