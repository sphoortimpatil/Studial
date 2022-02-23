import apiUrl from './client';
const auth = apiUrl + 'user/';
const login = auth + 'login';

const register = auth + 'register';

export default {login, register};
