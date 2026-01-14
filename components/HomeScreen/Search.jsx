import { useRouter } from "expo-router";
import { TouchableOpacity, TextInput } from "react-native";

const HomeSearch = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push("/(page)/cari-judul-buku/PencarianBuku")}
    >
      <TextInput
        placeholder="Cari judul buku..."
        editable={false}   
        pointerEvents="none"
        style={{
          backgroundColor: "#f1f1f1",
          padding: 12,
          borderRadius: 12,
        }}
      />
    </TouchableOpacity>
  );
};

export default HomeSearch;
