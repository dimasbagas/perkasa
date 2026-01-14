import { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getCurrentUser } from "../../utils/getCurrentUser";

const ComponentAkunSaya = () => {
  const router = useRouter();

  const [membership, setMembership] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembership();
  }, []);

  const fetchMembership = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://opac.pamekasankab.go.id:8000/user/members/",
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );

      const text = await response.text();

      if (response.ok) {
        const data = JSON.parse(text);
        const currentUser = data.find(
          (member) => member.member_id === user.username
        );

        if (currentUser) {
          setMembership({
            namaAnggota: currentUser.member_name,
            surel: currentUser.member_email,
            tanggalRegistrasi: currentUser.register_date,
            institusi: currentUser.inst_name,
            idAnggota: currentUser.member_id,
            tipeKeanggotaan: currentUser.member_type_id,
            berlakuHingga: currentUser.expire_date,
          });
        }
      }
    } catch (err) {
      console.log("Error fetching membership:", err);
    } finally {
      setLoading(false);
    }
  };


  // LOGOUT
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Apakah kamu yakin ingin logout?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                "token",
                "refresh_token",
                "username",
                "user_id",
                "user_type",
                "realname",
              ]);

              router.replace("/Login");
            } catch (err) {
              Alert.alert("Error", "Gagal logout");
              console.log("Logout error:", err);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* NAMA */}
      <View style={styles.cardName}>
        <Text style={styles.nameText}>
          {membership.namaAnggota || "-"}
        </Text>
      </View>

      {/* DETAIL */}
      <View style={styles.cardDetail}>
        {loading ? (
          <Text>Memuat data...</Text>
        ) : (
          <>
            <Row title="Nama Anggota" value={membership.namaAnggota} />
            <Row title="ID Anggota" value={membership.idAnggota} />
            <Row title="Surel Anggota" value={membership.surel} />
            <Row title="Tipe Keanggotaan" value={membership.tipeKeanggotaan} />
            <Row
              title="Tanggal Registrasi"
              value={membership.tanggalRegistrasi}
            />
            <Row
              title="Berlaku Hingga"
              value={membership.berlakuHingga}
            />
            <Row title="Institusi" value={membership.institusi} />
          </>
        )}
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.btn} onPress={handleLogout}>
        <Image
          source={require("../../assets/icons/Time.png")}
          style={styles.btnIcon}
        />
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Row = ({ title, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowTitle}>{title} :</Text>
    <Text style={styles.rowValue}>{value || "-"}</Text>
  </View>
);

export default ComponentAkunSaya;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 90,
    marginBottom: 20,
    alignSelf: "center",
  },

  cardName: {
    backgroundColor: "#dbf5ddff",
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#158344ff",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 7,
    elevation: 4,
    marginBottom: 15,
  },

  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A3F87",
  },

  cardDetail: {
    backgroundColor: "#dbf5ddff",
    padding: 20,
    borderRadius: 18,
    shadowColor: "#158344ff",
    shadowOpacity: 0.15,
    elevation: 4,
    gap: 10,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowTitle: {
    width: "45%",
    fontWeight: "bold",
  },

  rowValue: {
    width: "55%",
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fe6464",
    padding: 15,
    borderRadius: 18,
    shadowColor: "#158344ff",
    shadowOpacity: 0.15,
    elevation: 4,
    justifyContent: "center",
  },

  btnIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#ffffffff",
    
  },

  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffffff",
  },
});