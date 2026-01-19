export const BASE_URL = "http://103.189.104.53:8000/api";

export const API = {
  // AUTH
  login: `${BASE_URL}/auth/login/`,
  users: `${BASE_URL}/auth/users/`,

  // LOAN / PEMINJAMAN
  loansActive: `${BASE_URL}/peminjaman/aktif/`,
  loansHistory: `${BASE_URL}/peminjaman/riwayat/`,
  extendLoan: `${BASE_URL}/peminjaman/perpanjang/`,

  // BOOK
  books: `${BASE_URL}/buku/`,
};
