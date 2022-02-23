import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';

import Screen from '../components/common/Screen';
import ReadingAnimation from '../components/animations/ReadingAnimation';
import AppButton from '../components/common/Appbutton';
import routes from '../navigaton/routes';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

function WelcomeScreen({navigation}) {
  return (
    <Screen>
      <View style={styles.Welcomecontainer}>
        <View style={styles.top}>
          <View style={styles.name}>
            <Image
              style={styles.icon}
              source={require('../assets/logo/studialLogo.png')}
            />
          </View>

          <View style={styles.animation}>
            <ReadingAnimation />
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.login}>
            <AppButton
              title="Login"
              backgroundColor="#C03F5A"
              onPress={() => navigation.navigate(routes.LOGIN)}
            />
          </View>
          <View style={styles.register}>
            <AppButton
              title="Register"
              backgroundColor="#91b33b"
              onPress={() => navigation.navigate(routes.REGISTER)}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  Welcomecontainer: {
    flex: 1,
    backgroundColor: '#051739',
    // marginTop: StatusBar.currentHeight,
  },
  top: {
    display: 'flex',
    height: '70%',
    justifyContent: 'flex-start',
    // backgroundColor:"red",
  },
  name: {
    color: 'white',
    fontSize: 20,
    display: 'flex',
    height: '30%',
    paddingLeft: 15,
    // backgroundColor: "red",
  },
  icon: {
    // flex: 1,
    width: 180,
    height: 180,
    // height:"20%",
    resizeMode: 'contain',
    // backgroundColor: "black",
  },
  animation: {
    display: 'flex',
    height: '83%',
    marginBottom: 3,
    // backgroundColor: "pink",
  },
  bottom: {
    height: '32%',
    // backgroundColor: "green",
    // justifyContent: "center",
    alignItems: 'center',
  },
  login: {width: '80%', paddingTop: '8%', paddingBottom: 20},
  register: {width: '80%', paddingBottom: '3%'},
});
