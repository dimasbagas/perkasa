import { StyleSheet, View, ImageBackground,  } from "react-native";
import ComponentAkunSaya from "../../components/akun-saya/ComponentAkunSaya";
import tanjung from "../../assets/images/tanjung.png";

const AkunSaya = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerImage}
          source={tanjung}
          resizeMode="cover"
        />
      </View>
      <ComponentAkunSaya />
    </View>
  );
};

export default AkunSaya;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  headerContainer: {
    width: "100%",
    height: 230,
    backgroundColor: "#16994aff",
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  headerImage: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },

  profileCircle: {
    width: 150,
    height: 150,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    position: "absolute",
    top: 150,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
});
