import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as Yup from 'yup';
import axios from 'axios';

import AppFormField from '../components/common/forms/AppFormField';
import SubmitButton from '../components/common/forms/SubmitButton';
import AppForm from '../components/common/forms/AppForm';
import authRoutes from '../api/authRoutes';
import storage from '../auth/storage';
import userAuth from './../auth/userAuth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const {width, height} = Dimensions.get('window');

function LoginScreen() {
  const {login} = userAuth();

  const onSunbmitfunction = async values => {
    // console.log(values);
    // console.log(authRoutes.login);
    await axios
      .post(authRoutes.login, values)
      .then(r => {
        const token = r.data.token;
    
        login(token);
        axios.defaults.headers.common['x-auth-token'] = token;
        storage.storeToken(token);
        // console.log('res', token);
      })
      .catch(e => {
        console.log('error', e);
      });
    // storage.getToken();
  };

  return (
    <View style={styles.Logincontainer}>
      <View style={styles.top}>
        <View style={styles.name}>
          <Image
            style={[styles.icon, {width: 220}, {height: 110}]}
            source={require('../assets/logo/studialLogo.png')}
          />
        </View>
        <View style={styles.name}>
          <Image
            style={styles.icon}
            source={require('../assets/logo/Login.png')}
          />
        </View>
      </View>
      {/* <ScrollView> */}
      <View style={styles.bottom}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              width: width * 0.98,
              marginBottom: 20,
              flex: 1,
              // backgroundColor: 'pink',
            }}>
            <AppForm
              initialValues={{email: '', password: ''}}
              onSubmit={values => {
                onSunbmitfunction(values);

                // navigation.navigate(RegisterScreen);
              }}
              validationSchema={validationSchema}>
              <>
                <View style={styles.email}>
                  <Text style={styles.label}>Email</Text>
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Email..."
                    name="email"
                    secureTextEntry={false}
                    height={53}
                  />

                  {/* <Text style={{ color: "red" }}>{errors.email}</Text> */}
                </View>

                <View style={styles.password}>
                  <Text style={styles.label}>Password</Text>
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Password..."
                    name="password"
                    secureTextEntry={true}
                    height={53}
                  />
                </View>
                <View style={styles.logButton}>
                  <SubmitButton
                    title="Login"
                    backgroundColor="#85be41"
                    padding="9%"
                  />
                </View>
              </>
            </AppForm>
          </View>
        </ScrollView>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  Logincontainer: {
    display: 'flex',
    height: height,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#051739',
    fontSize: 18,
    // marginBottom: 20,
  },
  top: {
    display: 'flex',
    height: height * 0.25,
    marginTop: 40,
    // justifyContent: "flex-start",
    // backgroundColor: 'red',
  },
  bottom: {
    height: '50%',
    width: width,
    marginTop: 40,
    // backgroundColor: 'green',
    // justifyContent: "center",
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#E5E5E5',
    marginLeft: 10,
    // backgroundColor:"pink",
  },
  name: {
    color: 'white',
    fontSize: 20,
    display: 'flex',
    // height: "30%",
    paddingLeft: 15,
    paddingBottom: 5,
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
  },
  icon: {
    // flex: 1,
    width: 220,
    height: 50,
    // height:"20%",
    resizeMode: 'contain',
    // backgroundColor: 'black',
  },

  email: {
    width: '85%',
    // backgroundColor: "red",
    fontSize: 18,
    marginBottom: 20,
    // alignItems:"center",
    justifyContent: 'center',
  },
  password: {
    width: '85%',
    // backgroundColor: "green",
    marginBottom: 20,
  },
  logButton: {
    width: '35%',
  },
});
export default LoginScreen;
