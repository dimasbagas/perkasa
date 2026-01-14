import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import RekomendasiBuku from "../../components/HomeScreen/RekomendasiBuku";
import Search from "../../components/HomeScreen/Search";
import KategoriTema from "../../components/tema/KategoriTema";
import BukuPopuler from "../../components/HomeScreen/BukuPopuler";

const HomePage = () => {
  const dataKategori = [
    { id: "matematika", name: "Matematika" },
    { id: "novel", name: "Novel" },
    { id: "komputer", name: "Komputer" },
    { id: "sejarah", name: "Sejarah" },
    { id: "hukum", name: "Hukum" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: "content" }]}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            <Search />

            <View style={{ paddingVertical: 16 }}>
              <KategoriTema data={dataKategori} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rekomendasi Buku</Text>
              <RekomendasiBuku />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Buku Populer</Text>
              <BukuPopuler />
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0f0",
    paddingTop: 40,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#305763",
    paddingLeft: 20,
    marginBottom: 10,
  },
});
