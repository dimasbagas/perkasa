import { ImageBackground, StyleSheet, Text, View } from "react-native";
import tanjung from "../../assets/images/tanjung.png";
import ComponentSejarahPeminjaman from "../../components/sejarah-peminjaman/ComponentSejarahPeminjaman";

const PinjamanTerkini = () => {
  return (
    <View style={style.containerContent}>
      <View style={{ justifyContent: "flex-start", width: "100%" }}>
        <View style={style.titleContainer}>
          <ImageBackground
            source={tanjung}
            style={style.bg}
            imageStyle={style.bgImage}
          >
            <Text style={style.title}>History</Text>
          </ImageBackground>
        </View>
      </View>

      <ComponentSejarahPeminjaman />
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
    backgroundColor: "#0F612F",
    width: "100%",
    borderBottomRightRadius: 100,
    elevation: 10,
    height: 180,
    overflow: "hidden",
  },

  bg: {
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 50,
    justifyContent: "flex-end",
  },

  bgImage: {
    resizeMode: "cover",
    width: "460",
    height: "280",
    position: "absolute",
    top: -60,
    left: 170,
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "flex-start",
    opacity: 0.7,
  },

  title: {
    color: "#ffffffff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
