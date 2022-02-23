import {useContext} from 'react';
import authContext from './context';
import authStorage from './storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import jwtDecode from 'jwt-decode';

const userAuth = () => {
  const {user, setUser} = useContext(authContext);

  const login = authToken => {
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = async () => {
    await EncryptedStorage.clear();
    setUser(null);
  };

  return {user, logOut, login};
};

export default userAuth;
