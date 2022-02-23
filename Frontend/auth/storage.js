import EncryptedStorage from 'react-native-encrypted-storage';
import jwtDecode from 'jwt-decode';

const key = 'authToken';

//storing
const storeToken = async ACCESS_TOKEN => {
  try {
    await EncryptedStorage.setItem(key, ACCESS_TOKEN);
  } catch (error) {
    console.log('error token not stored', error);
  }
};

//get user
const getUser = async () => {
  try {
    const token = await getToken();
    if (token) return jwtDecode(token);
    return null;
  } catch (error) {
    console.log(error);
  }
};

//retriving
async function getToken() {
  try {
    const token = await EncryptedStorage.getItem(key);
    console.log('token', token);
    if (token !== undefined) {
      return token;
      //   // Congrats! You've just retrieved your first value!
    } else {
      return false;
    }
  } catch (error) {
    console.log('error deletimg token', error);
    // There was an error on the native side
  }
}

export default {storeToken, getToken, getUser};
