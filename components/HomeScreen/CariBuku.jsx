import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CariBuku = ({ value, onChangeText }) => {
  return (
    <View style={style.container}>
      <Ionicons name="search" size={20} color="#305763" />
      <TextInput
        placeholder="Cari buku...."
        value={value}
        onChangeText={onChangeText}
        style={style.input}
      />
    </View>
  );
};

export default CariBuku;

const style = StyleSheet.create({
  container: {
      display: 'flex',
      minHeight: 50, 
      width: '90%', 
      paddingHorizontal: 20,
      borderWidth:1.5,
      borderColor: "#16994aff",
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 50,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
});