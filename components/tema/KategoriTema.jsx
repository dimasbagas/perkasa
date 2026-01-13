import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function KategoriTema({
  data = [],
  selected,
  onSelect = () => {},
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Kategori</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {data.map((item) => {
          const active = selected === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onSelect(item.id)}
              style={[styles.pill, active && styles.pillActive]}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 5,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    // marginLeft: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  pill: {
    borderWidth: 2,
    borderColor: "#16994aff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  pillActive: {
    backgroundColor: "#16994aff",
  },
  pillText: {
    fontSize: 14,
    color: "#16994aff",
    fontWeight: "500",
  },
  pillTextActive: {
    color: "white",
  },
});