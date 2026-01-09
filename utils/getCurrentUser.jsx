// utils/getCurrentUser.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    const realname = await AsyncStorage.getItem('realname'); // opsional

    if (!token || !username) {
      console.warn('Token atau username tidak ditemukan');
      return null;
    }

    return {
      token,
      username,
      realname,
    };
  } catch (error) {
    console.error('Gagal mengambil data user dari AsyncStorage:', error);
    return null;
  }
};