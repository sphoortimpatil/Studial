import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './navigaton/AuthNavigator';
import AppNavigator from './navigaton/AppNavigator';

import SplashScreen from './Screen/LoadingScreen';
import storage from './auth/storage';
import AuthContext from './auth/context';
import axios from 'axios';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const settingToken = async () => {
    const tokenfound = await storage.getToken();
    // console.log('dfsadfstoken', tokenfound);

    if (tokenfound) {
      axios.defaults.headers['x-auth-token'] = tokenfound;
      const retainedUser = await storage.getUser();
      setUser(retainedUser);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    settingToken();
  }, []);

  return (
    <>
      {loading && <SplashScreen />}
      {!loading && (
        <AuthContext.Provider value={{user, setUser}}>
          <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </AuthContext.Provider>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
