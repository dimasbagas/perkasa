// export const BASE_URL = "http://103.189.104.53:8000/api";

// export const API = {
//   // AUTH
//   login: `${BASE_URL}/auth/login/`,
//   users: `${BASE_URL}/auth/users/`,

//   // LOAN / PEMINJAMAN
//   loansActive: `${BASE_URL}/peminjaman/aktif/`,
//   loansHistory: `${BASE_URL}/peminjaman/riwayat/`,
//   extendLoan: `${BASE_URL}/peminjaman/perpanjang/`,

//   // BOOK
//   books: `${BASE_URL}/buku/`,
// };

// export const BASE_URL = "http://10.0.2.2:8000";
// export const BASE_URL = "https://multispeed-formulaically-taunya.ngrok-free.dev";
// export const BASE_URL = "http://103.189.104.53:8000";
export const BASE_URL = "http://opac.pamekasankab.go.id:8000/";

export const BIBLIO_BASE_URL = "http://opac.pamekasankab.go.id:8000";

export const API = {
  login: `${BASE_URL}/auth/login/`,
  users: `${BASE_URL}/auth/users/`,
  biblioList: `${BIBLIO_BASE_URL}/api/biblio/`,
  biblioDetail: (id) => `${BIBLIO_BASE_URL}/api/biblio/${id}`,
};
