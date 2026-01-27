import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tanjung from "../../assets/images/tanjung.png";
import ComponentJudulDitandai from "../../components/judul-ditandai/ComponentJudulDitandai";

const PinjamanTerkini = () => {
  return (
    <View style={style.containerContent}>
      <View style={{ justifyContent: "flex-start", width: "100%" }}>
        <View style={style.titleContainer}>
          <ImageBackground
            source={tanjung}
            resizeMode="cover"
            style={{
              width: "460",
              height: "280",
              position: "absolute",
              top: -60,
              left: 170,
              color: "#ffffff",
              justifyContent: "center",
              alignItems: "flex-start",
              opacity: 0.7,
            }}
          />
          <Text style={style.title}>Buku Ditandai</Text>
        </View>
      </View>
      {/* Bawah */}
      <ComponentJudulDitandai />
    </View>
  );
};
export default PinjamanTerkini;

const style = StyleSheet.create({
  containerContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffff0",
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
    color: "#ffffffff",
    fontSize: 30,
    fontWeight: "bold",

  },
});
