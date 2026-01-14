import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tanjung from "../../assets/images/tanjung.png";
import ComponentJudulDitandai from "../../components/judul-ditandai/ComponentJudulDitandai";

const PinjamanTerkini = () => {
  return (
    <SafeAreaView style={style.containerContent}>
      <View style={{ justifyContent: "flex-start", width: "100%" }}>
        <View style={style.titleContainer}>
          <ImageBackground
            source={tanjung}
            resizeMode="cover"
            style={{
              width: 460,
              height: 280,
              position: "absolute",
              top: -60,
              left: 170,
              opacity: 0.7,
            }}
          />
          <Text style={style.title}>Buku Ditandai</Text>
        </View>
      </View>

      {/* Bawah */}
      <ComponentJudulDitandai />
    </SafeAreaView>
  );
};

export default PinjamanTerkini;

const style = StyleSheet.create({
  containerContent: {
    flex: 1,
    backgroundColor: "#fffffff0",
    // alignItems: "center", ❌ HAPUS
  },
  titleContainer: {
    backgroundColor: "#16994aff",
    width: "100%",
    borderBottomRightRadius: 100,
    justifyContent: "flex-end",
    elevation: 10,
    height: 180,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 50,
    position: "relative",
    overflow: "hidden",
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
