import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';

const ComponentPinjaman = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);


  const fetchLoans = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/biblio/');
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error('Error fetching loans:', error);
      setLoans([]);
    }
  };

  const renderLoan = ({ item }) => (
    <View style={style.loanItem}>
      <Text style={style.loanText}>Judul: {item.title}</Text>
      <Text style={style.loanText}>ISBN/ISSN: {item.isbn_issn}</Text>
      <Text style={style.loanText}>Tahun Terbit: {item.publish_year}</Text>
      <Text style={style.loanText}>Jumlah Halaman: {item.collation}</Text>
      <Text style={style.loanText}>Catatan: {item.notes}</Text>
    </View>
  );

  return (
    <View style={style.containerContent}>
      <View style={style.listContainer}>
        <FlatList
          data={loans}
          keyExtractor={(item) => item.biblio_id.toString()}
          renderItem={renderLoan}
          contentContainerStyle={style.list}
        />
      </View>
    </View>
  );
};

export default ComponentPinjaman;

const style = StyleSheet.create({
  containerContent: {
    alignItems: "center",
    width: 352,
    flex: 1,
  },
  titleContainer: {
    backgroundColor: "#5D7BF4",
    width: "100%",
    borderBottomRightRadius: 100,
    elevation: 10,
    height: 930,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 50,
    position: "relative",
  },
  title: {
    color: "#344175",
    fontSize: 30,
    fontWeight: "bold",
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 16,
    flex: 1,
  },
  list: {
    paddingTop: 16,
  },
  loanItem: {
    backgroundColor: "#D9D9D9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  loanText: {
    fontSize: 16,
    marginBottom: 4,
  },
});