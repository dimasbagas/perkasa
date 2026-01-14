import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TabBar = ({ state, navigation }) => {
  const activeColor = '#0F612F';
  const inactiveColor = '#5a5860ff';

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
      {state.routes
        .filter(route => icons[route.name] && labels[route.name])
        .map((route, index) => {
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
              activeOpacity={0.75}
            >
              <Image
                source={icons[route.name]}
                style={[
                  styles.icon,
                  { tintColor: isFocused ? activeColor : inactiveColor },
                ]}
              />

              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused ? activeColor : inactiveColor,
                    fontWeight: isFocused ? '600' : '400',
                  },
                ]}
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
    bottom: 25,
    left: 20,
    right: 20,

    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',

    backgroundColor: '#70A284',
    paddingVertical: 12,
    borderRadius: 28,
    borderCurve: 'continuous',
    

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 5,
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 36,
    height: 36,
  },

  label: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default TabBar;
