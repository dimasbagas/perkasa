import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { getCurrentUser } from "../utils/getCurrentUser";

const ComponentAkunSaya = () => {
  const [membership, setMembership] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembership();
  }, []);

  const fetchMembership = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return setLoading(false);

      const response = await fetch(
        "https://multispeed-formulaically-taunya.ngrok-free.dev/user/members/",
        {
          headers: { Authorization: `Token ${user.token}` },
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
      console.log("Error fetching membership", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.cardName}>
        <Text style={styles.nameText}>
          {membership.namaAnggota || "-"}
        </Text>
      </View>

      <View style={styles.cardDetail}>
        {loading ? (
          <Text>Memuat data...</Text>
        ) : (
          <>
            <Row title="Nama Anggota" value={membership.namaAnggota} />
            <Row title="ID Anggota" value={membership.idAnggota} />
            <Row title="Surel Anggota" value={membership.surel} />
            <Row title="Tipe Keanggotaan" value={membership.tipeKeanggotaan} />
            <Row title="Tanggal Registrasi" value={membership.tanggalRegistrasi} />
            <Row title="Berlaku hingga" value={membership.berlakuHingga} />
            <Row title="Institusi" value={membership.institusi} />
          </>
        )}
      </View>

      <TouchableOpacity style={styles.btn}>
        <Image
          source={require("../../assets/icons/Time.png")}
          style={styles.btnIcon}
        />
        <Text style={styles.btnText}>Log Out</Text>
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
    marginTop: 30,
    marginBottom: 20,
  },

  cardName: {
    backgroundColor: "#dbf5ddff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#158344ff",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 7,
    elevation: 1,
    margin: 10,
  },

  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
  },

  cardDetail: {
    marginTop: 5,
    backgroundColor: "#dbf5ddff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#158344ff",
    shadowOpacity: 0.15,
    elevation: 1,
    gap: 15,
    margin: 10,
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
    marginTop: 5,
    backgroundColor: "#fe5454ff",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#158344ff",
    shadowOpacity: 0.15,
    elevation: 1,
    justifyContent: "center",
    margin: 10,
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
