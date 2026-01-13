import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TabBar = ({ state, navigation }) => {
  const activeColor = '#124f29ff';
  const inactiveColor = '#ffffffff';

  const icons = {
    HomePage: require('../../assets/icons/Home.png'),
    JudulDitandai: require('../../assets/icons/Bookmark.png'),
    PinjamanTerkini: require('../../assets/icons/Alarm.png'),
    SejarahPeminjaman: require('../../assets/icons/Time.png'),
    AkunSaya: require('../../assets/icons/Account.png'),
  };

  const labels = {
    HomePage: 'Home',
    JudulDitandai: 'Ditandai',
    PinjamanTerkini: 'Pinjaman',
    SejarahPeminjaman: 'History',
    AkunSaya: 'Akun',
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Image
              source={icons[route.name]}
              style={{
                width: 30,
                height: 30,
                tintColor: isFocused ? activeColor : inactiveColor,
              }}
            />

            <Text
              style={{
                marginTop: 4,
                fontSize: 12,
                fontWeight: isFocused ? '600' : '400',
                color: isFocused ? activeColor : inactiveColor,
              }}
            >
              {labels[route.name]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 19,
    right: 19,
    flexDirection: 'row',
    backgroundColor: '#16994aff',
    paddingVertical: 5,
    borderRadius: 20,
    borderCurve: 'continuous',
    shadowColor: '#86f08fff',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },

  tabItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
});

export default TabBar;
