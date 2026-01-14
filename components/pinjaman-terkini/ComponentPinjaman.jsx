import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";

const API_KEY = "AIzaSyAdkiRhqRdPGg4jym8ZrzzUhoHk33aBxZI";

const ComponentPinjaman = () => {
  const [loans, setLoans] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchMockLoans();
  }, []);

  /* =========================
     FETCH GOOGLE BOOKS (MOCK)
     ========================= */
  const fetchMockLoans = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=novel&maxResults=5&key=${API_KEY}`
      );
      const json = await res.json();

      const today = new Date();

      const mapped =
        json.items?.map((item, index) => {
          const pinjam = new Date(today);
          pinjam.setDate(today.getDate() - index * 3);

          const kembali = new Date(pinjam);
          kembali.setDate(pinjam.getDate() + 14);

          return {
            id_peminjaman: item.id,
            kode_eksemplar: `EX-${index + 1}23`,
            judul: item.volumeInfo.title,
            cover:
              item.volumeInfo.imageLinks?.thumbnail?.replace(
                "http://",
                "https://"
              ) ??
              "https://via.placeholder.com/60x90",
            tanggal_pinjam: pinjam.toISOString().slice(0, 10),
            tanggal_kembali: kembali.toISOString().slice(0, 10),
            total_minggu: 2,
            status: "aktif",
            boleh_perpanjang: index % 2 === 0, // simulasi
          };
        }) || [];

      setLoans(mapped);
    } catch (error) {
      console.log("Mock loan error:", error);
      setLoans([]);
    }
  };

  /* =========================
     RENDER ITEM
     ========================= */
  const renderLoan = ({ item }) => (
    <View style={style.loanItem}>
      <Image source={{ uri: item.cover }} style={style.cover} />

      <View style={style.info}>
        <Text style={style.title}>{item.judul}</Text>
        <Text style={style.text}>
          Kode Eksemplar: {item.kode_eksemplar}
        </Text>
        <Text style={style.text}>
          Tanggal Pinjam: {item.tanggal_pinjam}
        </Text>
        <Text style={style.text}>
          Tanggal Kembali: {item.tanggal_kembali}
        </Text>

        <TouchableOpacity
          style={[
            style.extendBtn,
            !item.boleh_perpanjang && style.extendDisabled,
          ]}
          disabled={!item.boleh_perpanjang}
          onPress={() =>
            router.push({
              pathname: "/(user)/TambahWaktuPeminjaman",
              params: { id: item.id_peminjaman },
            })
          }
        >
          <Text style={style.extendText}>
            {item.boleh_perpanjang ? "Perpanjang" : "Tidak Bisa"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={style.containerContent}>
      <FlatList
        data={loans}
        keyExtractor={(item) => item.id_peminjaman}
        renderItem={renderLoan}
        contentContainerStyle={style.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ComponentPinjaman;
const style = StyleSheet.create({
  containerContent: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  loanItem: {
    flexDirection: "row",
    backgroundColor: "#CFF5DD",
    padding: 12,
    marginBottom: 14,
    borderRadius: 14,
  },
  cover: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#e0e0e0",
  },
  info: {
    flex: 1,
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
  extendBtn: {
    alignSelf: "flex-end",
    marginTop: 8,
    backgroundColor: "#0F612F",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  extendDisabled: {
    backgroundColor: "#999",
  },
  extendText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
